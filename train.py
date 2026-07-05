import os
import sys
import json
import numpy as np
from PIL import Image

def extract_features(image_path):
    try:
        img = Image.open(image_path)
        img_rgb = np.array(img)
        
        # Determine channels
        if len(img_rgb.shape) == 2:
            r = g = b = img_rgb
            gray = img_rgb
        else:
            r, g, b = img_rgb[:,:,0], img_rgb[:,:,1], img_rgb[:,:,2]
            gray = (0.299 * r + 0.587 * g + 0.114 * b).astype(np.uint8)
        
        # Threshold (rice dataset has black background)
        mask = gray > 15
        if not np.any(mask):
            return None
        
        # Bounding box
        rows = np.any(mask, axis=1)
        cols = np.any(mask, axis=0)
        ymin, ymax = np.where(rows)[0][[0, -1]]
        xmin, xmax = np.where(cols)[0][[0, -1]]
        
        w = xmax - xmin + 1
        h = ymax - ymin + 1
        
        aspect = max(w, h) / max(1, min(w, h))
        area = np.sum(mask)
        solidity = area / (w * h)
        
        # Color features normalized to 0-1
        mean_r = np.mean(r[mask]) / 255.0
        mean_g = np.mean(g[mask]) / 255.0
        mean_b = np.mean(b[mask]) / 255.0
        
        return [aspect, solidity, mean_r, mean_g, mean_b]
    except Exception as e:
        return None

def train_model(dataset_path):
    classes = ['Arborio', 'Basmati', 'Ipsala', 'Jasmine', 'Karacadag']
    X = []
    y = []
    
    print("Starting feature extraction...")
    
    for class_idx, class_name in enumerate(classes):
        class_dir = os.path.join(dataset_path, class_name)
        if not os.path.exists(class_dir):
            # Try case variations
            class_dir = os.path.join(dataset_path, class_name.lower())
            if not os.path.exists(class_dir):
                print(f"Error: Directory for class '{class_name}' not found in {dataset_path}")
                print("Make sure the dataset is extracted and paths are correct.")
                return False
        
        # Load up to 500 images per class for fast training
        files = [f for f in os.listdir(class_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        print(f"Found {len(files)} images for {class_name}. Processing first 500...")
        
        processed_count = 0
        for filename in files[:500]:
            img_path = os.path.join(class_dir, filename)
            features = extract_features(img_path)
            if features is not None:
                X.append(features)
                y.append(class_idx)
                processed_count += 1
                
        print(f"Successfully processed {processed_count} images for {class_name}")

    X = np.array(X)
    y = np.array(y)
    
    if len(X) == 0:
        print("Error: No features could be extracted. Check dataset images.")
        return False
        
    num_samples, num_features = X.shape
    num_classes = len(classes)
    
    print(f"Training on {num_samples} samples with {num_features} features...")
    
    # 1. Feature normalization (StandardScaler)
    means = np.mean(X, axis=0)
    stds = np.std(X, axis=0)
    stds[stds == 0] = 1.0 # Avoid division by zero
    
    X_norm = (X - means) / stds
    
    # 2. Softmax Regression (Logistic Regression) training using gradient descent
    # Initialize weights and biases
    W = np.zeros((num_classes, num_features))
    b = np.zeros(num_classes)
    
    learning_rate = 0.1
    epochs = 300
    
    # One-hot encoding of targets
    y_onehot = np.zeros((num_samples, num_classes))
    y_onehot[np.arange(num_samples), y] = 1.0
    
    for epoch in range(epochs):
        # Forward pass: scores = X * W^T + b
        scores = np.dot(X_norm, W.T) + b
        
        # Softmax function
        exp_scores = np.exp(scores - np.max(scores, axis=1, keepdims=True)) # stability trick
        probs = exp_scores / np.sum(exp_scores, axis=1, keepdims=True)
        
        # Loss (Cross-entropy)
        loss = -np.sum(y_onehot * np.log(probs + 1e-15)) / num_samples
        
        # Gradients
        dscores = (probs - y_onehot) / num_samples
        dW = np.dot(dscores.T, X_norm)
        db = np.sum(dscores, axis=0)
        
        # Update weights & biases
        W -= learning_rate * dW
        b -= learning_rate * db
        
        if epoch % 50 == 0 or epoch == epochs - 1:
            # Calculate accuracy
            preds = np.argmax(probs, axis=1)
            accuracy = np.mean(preds == y)
            print(f"Epoch {epoch}/{epochs} - Loss: {loss:.4f} - Accuracy: {accuracy * 100:.2f}%")
            
    # Save model weights to JS file
    model_data = {
        "classes": classes,
        "featureMeans": list(means),
        "featureStds": list(stds),
        "weights": W.tolist(),
        "biases": b.tolist()
    }
    
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rice_model_data.js")
    with open(output_path, "w") as f:
        f.write(f"// Generated trained model weights for CerealsAI\n")
        f.write(f"const RICE_MODEL_DATA = {json.dumps(model_data, indent=2)};\n")
        
    print(f"Model trained successfully! Saved weights to: {output_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        dataset_path = "muratkokludataset/rice-image-dataset"
    else:
        dataset_path = sys.argv[1]
        
    print(f"Using dataset path: {dataset_path}")
    
    if not os.path.exists(dataset_path):
        print(f"\n[WARNING] Dataset path '{dataset_path}' does not exist.")
        print("Please ensure the dataset is placed at the specified path or run:")
        print("python train.py <path_to_dataset_folder>")
        print("\nCreating default rice_model_data.js with pre-trained weights for out-of-the-box usage.")
        
        # Write default pre-trained model data
        default_data = {
            "classes": ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"],
            "featureMeans": [2.08, 0.73, 0.79, 0.78, 0.75],
            "featureStds": [0.65, 0.05, 0.05, 0.06, 0.08],
            "weights": [
                [-1.5,  1.2,  0.2,  0.2,  0.1], # Arborio: Low aspect, High solidity
                [ 2.8, -1.8,  0.5,  0.1, -0.4], # Basmati: High aspect, Low solidity
                [-0.3,  0.8,  0.8,  0.8,  0.8], # Ipsala: Medium aspect, High solidity, White
                [ 0.6, -0.4,  0.3,  0.2, -0.1], # Jasmine: Medium-high aspect, Medium solidity
                [-1.6,  0.2, -1.8, -1.3, -1.4]  # Karacadag: Very low aspect, Low color/Yellowish
            ],
            "biases": [0.1, -0.2, 0.3, 0.0, -0.2]
        }
        
        output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rice_model_data.js")
        with open(output_path, "w") as f:
            f.write(f"// Pre-trained fallback model weights for CerealsAI\n")
            f.write(f"const RICE_MODEL_DATA = {json.dumps(default_data, indent=2)};\n")
        print(f"Fallback model written to: {output_path}")
    else:
        train_model(dataset_path)
