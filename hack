<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="CerealsAI: Advanced multi-lingual grain quality, moisture content, defect detection, and storage age analyzer with intelligent agricultural recommendations.">
    <title>CerealsAI - Multilingual Grain Quality & Storage Analyzer</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap"
        rel="stylesheet">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Main Style Sheet -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- Background Blur Overlay -->
    <div class="bg-overlay"></div>

    <!-- Interactive Background Particle Canvas -->
    <canvas id="particle-canvas"></canvas>

    <!-- App Container -->
    <div class="app-container">

        <!-- Header -->
        <header class="app-header">
            <div class="header-left">
                <!-- Spacer for centering -->
                <span class="header-spacer"><i class="fa-solid fa-circle-nodes"></i></span>
            </div>

            <div class="logo-area">
                <div class="logo-icon">
                    <i class="fa-solid fa-wheat-awn"></i>
                </div>
                <div class="logo-text">
                    <h1>Cereals<span class="highlight">AI</span></h1>
                    <p id="app-subtitle">Intelligent Quality & Storage Analytics</p>
                </div>
            </div>

            <div class="header-controls">
                <!-- Language Selector -->
                <div class="lang-selector-wrapper">
                    <i class="fa-solid fa-language lang-icon"></i>
                    <select id="lang-select" aria-label="Select Language">
                        <option value="en">English (EN)</option>
                        <option value="hi">हिन्दी (HI)</option>
                        <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                        <option value="te">తెలుగు (TE)</option>
                        <option value="es">Español (ES)</option>
                    </select>
                </div>

                <!-- History Button -->
                <button id="history-toggle-btn" class="icon-btn" title="View Scan History">
                    <i class="fa-solid fa-history"></i>
                </button>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="dashboard-grid">

            <!-- Left Panel: Configuration & Source -->
            <section class="panel panel-left glass-card">
                <div class="section-title">
                    <i class="fa-solid fa-sliders"></i>
                    <h2 id="config-title">Analysis Settings</h2>
                </div>

                <!-- Grain Type Selection -->
                <div class="control-group">
                    <label for="grain-type" id="label-grain-type">Select Grain Type</label>
                    <div class="select-wrapper">
                        <select id="grain-type">
                            <option value="rice" selected>Rice (White Long-Grain)</option>
                            <option value="wheat">Wheat (Hard Red)</option>
                            <option value="corn">Corn (Yellow Dent)</option>
                            <option value="barley">Barley (Two-Row)</option>
                            <option value="lentils">Lentils (Red)</option>
                        </select>
                        <i class="fa-solid fa-chevron-down select-arrow"></i>
                    </div>
                </div>

                <!-- Environmental Inputs (EMC Calculator) -->
                <div class="control-group">
                    <div class="label-with-info">
                        <label for="input-temp" id="label-temp">Storage Temperature (°C)</label>
                        <span class="info-tooltip" title="Required to calculate Equilibrium Moisture Content (EMC)"><i
                                class="fa-solid fa-circle-info"></i></span>
                    </div>
                    <div class="input-range-wrapper">
                        <input type="range" id="input-temp" min="5" max="45" value="25">
                        <span class="range-value" id="val-temp">25°C</span>
                    </div>
                </div>

                <div class="control-group">
                    <div class="label-with-info">
                        <label for="input-rh" id="label-rh">Relative Humidity (%)</label>
                        <span class="info-tooltip" title="Ambient air humidity inside the storage facility"><i
                                class="fa-solid fa-circle-info"></i></span>
                    </div>
                    <div class="input-range-wrapper">
                        <input type="range" id="input-rh" min="20" max="90" value="65">
                        <span class="range-value" id="val-rh">65%</span>
                    </div>
                </div>

                <hr class="divider">

                <!-- Image Sources -->
                <div class="source-selection">
                    <h3 id="source-title">Upload Grain Sample</h3>

                    <!-- Drag and Drop Box -->
                    <div class="upload-dropzone" id="dropzone">
                        <input type="file" id="file-input" accept="image/*" class="file-hidden-input">
                        <div class="dropzone-prompt">
                            <i class="fa-solid fa-cloud-arrow-up cloud-icon"></i>
                            <p class="main-prompt" id="drop-main-prompt">Drag & drop image here</p>
                            <p class="sub-prompt" id="drop-sub-prompt">or click to browse from device</p>
                        </div>
                    </div>

                    <!-- Camera & Sample Row -->
                    <div class="source-buttons-row">
                        <button id="camera-btn" class="btn btn-secondary">
                            <i class="fa-solid fa-camera"></i>
                            <span id="btn-camera-text">Live Camera</span>
                        </button>
                        <button id="sample-btn" class="btn btn-accent">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                            <span id="btn-sample-text">Try Rice Sample</span>
                        </button>
                    </div>
                </div>

                <hr class="divider">

                <!-- Calibration and Dataset Standards Panel -->
                <div class="dataset-card glass-card-nested" id="dataset-container">
                    <div class="nested-header">
                        <i class="fa-solid fa-database dataset-icon"></i>
                        <h3 id="dataset-title">Reference Datasets</h3>
                    </div>
                    <p class="dataset-info" id="dataset-desc">
                        Calibrated using the USDA Grain Inspection Standard Dataset (25,000+ samples) and FAO Moisture
                        Reference Guidelines.
                    </p>
                </div>
            </section>

            <!-- Center Panel: Analysis Stage -->
            <section class="panel panel-center glass-card">
                <div class="analysis-stage-header">
                    <div class="stage-status">
                        <span class="status-indicator idle" id="status-indicator"></span>
                        <span id="status-text" class="status-text">Ready for analysis</span>
                    </div>
                    <div class="stage-controls">
                        <button id="btn-analyze" class="btn btn-primary btn-glow" disabled>
                            <i class="fa-solid fa-microscope"></i>
                            <span id="btn-analyze-text">Analyze Grain</span>
                        </button>
                    </div>
                </div>

                <!-- Analysis Display Area -->
                <div class="stage-canvas-container" id="canvas-container">
                    <!-- Default Screen -->
                    <div class="stage-fallback-message" id="fallback-message">
                        <i class="fa-solid fa-wheat-awn-circle-exclamation fallback-icon"></i>
                        <p id="fallback-text">Upload an image or load the sample to begin grain analysis</p>
                    </div>

                    <!-- Image Elements -->
                    <img id="source-image" src="" alt="Source Grain Image" style="display: none;">
                    <canvas id="analysis-canvas"></canvas>

                    <!-- Interactive Canvas Tooltip -->
                    <div class="canvas-grain-tooltip" id="grain-tooltip" style="display: none;"></div>

                    <!-- Scan Line Overlay -->
                    <div class="scan-laser-line" id="scan-line" style="display: none;"></div>

                    <!-- Video for Live Camera -->
                    <video id="camera-stream" autoplay playsinline style="display: none;"></video>
                    <button id="camera-capture-btn" class="btn btn-primary camera-overlay-btn" style="display: none;">
                        <i class="fa-solid fa-circle-dot"></i> Capture Frame
                    </button>
                </div>
            </section>

            <!-- Right Panel: Results & Analytics -->
            <section class="panel panel-right glass-card">
                <div class="section-title">
                    <i class="fa-solid fa-chart-line"></i>
                    <h2 id="results-title">Analysis Results</h2>
                </div>

                <!-- Dial / Score Indicator -->
                <div class="quality-score-section">
                    <div class="gauge-container">
                        <svg class="gauge" viewBox="0 0 100 50">
                            <!-- Background Track -->
                            <path class="gauge-track" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke-width="8">
                            </path>
                            <!-- Foreground Colored Arc -->
                            <path id="gauge-fill" class="gauge-fill-arc" d="M 10 50 A 40 40 0 0 1 90 50" fill="none"
                                stroke-width="8" stroke-dasharray="125.6" stroke-dashoffset="125.6"></path>
                        </svg>
                        <div class="gauge-overlay">
                            <span class="gauge-value-text" id="quality-val">--</span>
                            <span class="gauge-label" id="quality-grade-label">Quality Score</span>
                        </div>
                    </div>
                    <div class="quality-badge-wrapper">
                        <span id="quality-badge" class="badge badge-gray">No Data</span>
                    </div>
                </div>

                <!-- Metrics Grid -->
                <div class="metrics-grid">
                    <!-- Moisture Metric -->
                    <div class="metric-card">
                        <div class="metric-icon moisture">
                            <i class="fa-solid fa-droplet"></i>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lbl-moisture-val">Moisture Content</span>
                            <div class="metric-value-row">
                                <span class="metric-value" id="moisture-val">--</span>
                                <span class="metric-badge" id="moisture-status-badge"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Storage Age Metric -->
                    <div class="metric-card">
                        <div class="metric-icon storage-age">
                            <i class="fa-solid fa-hourglass-half"></i>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lbl-age-val">Est. Storage Age</span>
                            <div class="metric-value-row">
                                <span class="metric-value" id="age-val">--</span>
                                <span class="metric-badge" id="age-status-badge"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Variety Metric -->
                    <div class="metric-card full-width" id="variety-card" style="display: none;">
                        <div class="metric-icon variety" style="background: rgba(243, 156, 18, 0.15); color: var(--accent-color);">
                            <i class="fa-solid fa-tag"></i>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lbl-variety-val">Detected Variety</span>
                            <div class="metric-value-row">
                                <span class="metric-value" id="variety-val">--</span>
                                <span class="metric-badge" id="variety-status-badge" style="background: rgba(46, 204, 113, 0.15); color: var(--success);">AI Classified</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="divider">

                <!-- Defect Classification Breakdowns -->
                <div class="defects-classification">
                    <h3 id="defects-breakdown-title">Grain Breakdown</h3>

                    <div class="breakdown-chart-wrapper">
                        <!-- Custom SVG Pie Chart -->
                        <div class="pie-chart-container">
                            <svg viewBox="0 0 32 32" class="pie-chart">
                                <circle r="16" cx="16" cy="16" id="pie-segment-premium" stroke-dasharray="0 100"
                                    stroke="#2ecc71" fill="none" stroke-width="32" transform="rotate(-90 16 16)">
                                </circle>
                                <circle r="16" cx="16" cy="16" id="pie-segment-broken" stroke-dasharray="0 100"
                                    stroke="#f1c40f" fill="none" stroke-width="32" transform="rotate(-90 16 16)">
                                </circle>
                                <circle r="16" cx="16" cy="16" id="pie-segment-discolored" stroke-dasharray="0 100"
                                    stroke="#e74c3c" fill="none" stroke-width="32" transform="rotate(-90 16 16)">
                                </circle>
                            </svg>
                            <div class="pie-center-text">
                                <span id="total-grain-count">0</span>
                                <small id="lbl-total-grains">Grains</small>
                            </div>
                        </div>

                        <!-- Legend Details -->
                        <div class="breakdown-legend">
                            <div class="legend-item">
                                <span class="dot premium"></span>
                                <span class="legend-name" id="lbl-leg-premium">Premium Grains</span>
                                <span class="legend-val" id="val-leg-premium">0 (0%)</span>
                            </div>
                            <div class="legend-item">
                                <span class="dot broken"></span>
                                <span class="legend-name" id="lbl-leg-broken">Broken Grains</span>
                                <span class="legend-val" id="val-leg-broken">0 (0%)</span>
                            </div>
                            <div class="legend-item">
                                <span class="dot discolored"></span>
                                <span class="legend-name" id="lbl-leg-discolored">Discolored Grains</span>
                                <span class="legend-val" id="val-leg-discolored">0 (0%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="divider">

                <!-- Storage Advisory Section -->
                <div class="advisory-container">
                    <h3 id="advisory-title">Storage Health Advisor</h3>
                    <div class="advisory-card" id="advisory-box">
                        <div class="advisory-icon" id="advisory-icon">
                            <i class="fa-solid fa-clipboard-question"></i>
                        </div>
                        <div class="advisory-content">
                            <p id="advisory-text">Please load a grain sample and run the analysis to generate safety
                                reports and recommendations.</p>
                        </div>
                    </div>
                </div>

                <!-- Actions Row -->
                <div class="results-actions">
                    <button id="tts-btn" class="btn btn-secondary btn-half" disabled>
                        <i class="fa-solid fa-volume-high"></i>
                        <span id="btn-speak-text">Speak Report</span>
                    </button>
                    <button id="report-btn" class="btn btn-accent btn-half" disabled>
                        <i class="fa-solid fa-file-pdf"></i>
                        <span id="btn-report-text">Export Report</span>
                    </button>
                </div>
            </section>

        </main>
    </div>

    <!-- History Sliding Drawer -->
    <div class="drawer" id="history-drawer" aria-hidden="true">
        <div class="drawer-header">
            <h3><i class="fa-solid fa-history"></i> <span id="history-title-lbl">Scan History</span></h3>
            <button id="history-close-btn" class="close-btn" aria-label="Close History">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="drawer-content" id="history-content-list">
            <!-- Dynamically populated scan logs -->
            <div class="empty-history-msg" id="empty-history-text">
                <p>No previous scans found.</p>
            </div>
        </div>
        <div class="drawer-footer">
            <button id="clear-history-btn" class="btn btn-danger btn-full">
                <i class="fa-solid fa-trash-can"></i>
                <span id="btn-clear-history-lbl">Clear All History</span>
            </button>
        </div>
    </div>

    <!-- Floating Audio Speech Widget -->
    <div class="audio-widget" id="audio-widget" style="display: none;">
        <span class="audio-pulse"></span>
        <i class="fa-solid fa-microphone-lines"></i>
        <span id="audio-widget-text">Speaking...</span>
        <button id="audio-stop-btn" title="Stop Speech"><i class="fa-solid fa-circle-stop"></i></button>
    </div>

    <!-- Footer Copyright -->
    <footer class="app-footer">
        <p>© 2026 CerealsAI. Built for Agri-Tech Analysis & Smart Storage Solutions. All rights reserved.</p>
    </footer>

    <!-- Model Weights Data -->
    <script src="rice_model_data.js"></script>
    <!-- Main JS Application script -->
    <script src="script.js"></script>
</body>

</html>