/**
 * CerealsAI - Main Application Script
 * Client-Side Computer Vision, EMC Calculation, and Regional Localization
 */
const firebaseConfig = {
  apiKey: "AIzaSyBRIzJQw-EKpJs6I9Xo6Klgg2t_bc0fIX8",
  authDomain: "grain-ai.firebaseapp.com",
  projectId: "grain-ai",
  storageBucket: "grain-ai.firebasestorage.app",
  messagingSenderId: "855471031645",
  appId: "1:855471031645:web:4fc8b1dd60d0e4ffd394b4",
  measurementId: "G-KRGZFMEQLR"
};



// Translation Database
const translations = {
    en: {
        subtitle: "Intelligent Quality & Storage Analytics",
        configTitle: "Analysis Settings",
        labelGrainType: "Select Grain Type",
        labelTemp: "Storage Temperature (°C)",
        labelRh: "Relative Humidity (%)",
        sourceTitle: "Upload Grain Sample",
        dropMainPrompt: "Drag & drop image here",
        dropSubPrompt: "or click to browse from device",
        btnCameraText: "Live Camera",
        btnSampleText: "Try Rice Sample",
        statusReady: "Ready for analysis",
        statusLoading: "Loading image...",
        statusProcessing: "Analyzing pixels... Segmenting grains...",
        statusSuccess: "Analysis complete",
        statusCameraActive: "Camera active. Capture grain photo.",
        statusCameraError: "Camera access denied or unavailable",
        btnAnalyzeText: "Analyze Grain",
        resultsTitle: "Analysis Results",
        qualityScore: "Quality Score",
        lblMoistureVal: "Moisture Content",
        lblAgeVal: "Est. Storage Age",
        defectsBreakdownTitle: "Grain Breakdown",
        lblTotalGrains: "Grains",
        lblLegPremium: "Premium Grains",
        lblLegBroken: "Broken Grains",
        lblLegDiscolored: "Discolored Grains",
        advisoryTitle: "Storage Health Advisor",
        advisoryDefaultText: "Please load a grain sample and run the analysis to generate safety reports and recommendations.",
        btnSpeakText: "Speak Report",
        btnReportText: "Export Report",
        btnHistoryLbl: "Scan History",
        historyTitleLbl: "Scan History",
        btnClearHistoryLbl: "Clear All History",
        emptyHistoryText: "No previous scans found.",
        fallbackText: "Upload an image or load the sample to begin grain analysis",
        months: "months",
        gradeA: "Premium Grade A",
        gradeB: "Standard Grade B",
        gradeC: "Poor Grade C",
        noData: "No Data",
        statusSafe: "SAFE",
        statusWarn: "WARN",
        statusDanger: "DANGER",
        advSafe: "Optimal moisture and grain quality. Suitable for standard dry storage up to 12 months. Keep ventilation active periodically.",
        advWarn: "Moisture levels elevated. Minor mold risk detected. Immediate ventilation or light drying is recommended to prevent insect activity.",
        advDanger: "High moisture content! High risk of rapid spoilage, mold, and heating. Aerate immediately and pass through mechanical dryer.",
        lblVarietyVal: "Detected Variety",
        datasetTitle: "Reference Datasets",
        datasetDesc: "Calibrated using the muratkokludataset/rice-image-dataset (75,000+ samples), USDA Grain Inspection Standard Dataset, and FAO Moisture Reference Guidelines.",
        ttsSpeechStart: "Starting analysis report audio playback.",
        ttsReportSummary: (grain, total, premium, broken, discolored, moisture, status) => 
            `Analysis report for ${grain}. Total grains counted: ${total}. Premium quality: ${premium} percent. Broken grains: ${broken} percent. Discolored or moldy grains: ${discolored} percent. Moisture content is ${moisture} percent, which is ${status}.`
    },
    hi: {
        subtitle: "बुद्धिमान अनाज गुणवत्ता और भंडारण विश्लेषण",
        configTitle: "विश्लेषण सेटिंग्स",
        labelGrainType: "अनाज का प्रकार चुनें",
        labelTemp: "भंडारण तापमान (°C)",
        labelRh: "सापेक्ष आर्द्रता (%)",
        sourceTitle: "अनाज का नमूना अपलोड करें",
        dropMainPrompt: "छवि को यहां खींचें और छोड़ें",
        dropSubPrompt: "या डिवाइस से ब्राउज़ करने के लिए क्लिक करें",
        btnCameraText: "लाइव कैमरा",
        btnSampleText: "चावल का नमूना आज़माएं",
        statusReady: "विश्लेषण के लिए तैयार",
        statusLoading: "छवि लोड हो रही है...",
        statusProcessing: "पिक्सेल विश्लेषण जारी... अनाज विभाजन हो रहा है...",
        statusSuccess: "विश्लेषण पूरा हुआ",
        statusCameraActive: "कैमरा चालू है। अनाज की फोटो खींचें।",
        statusCameraError: "कैमरा एक्सेस नहीं मिला या अनुपलब्ध है",
        btnAnalyzeText: "अनाज का विश्लेषण करें",
        resultsTitle: "विश्लेषण के परिणाम",
        qualityScore: "गुणवत्ता स्कोर",
        lblMoistureVal: "नमी की मात्रा",
        lblAgeVal: "अनुमानित भंडारण अवधि",
        defectsBreakdownTitle: "अनाज का विवरण",
        lblTotalGrains: "अनाज",
        lblLegPremium: "प्रीमियम अनाज",
        lblLegBroken: "टूटे हुए अनाज",
        lblLegDiscolored: "रंगहीन/खराब अनाज",
        advisoryTitle: "भंडारण स्वास्थ्य सलाहकार",
        advisoryDefaultText: "सुरक्षा रिपोर्ट और सिफारिशें उत्पन्न करने के लिए कृपया अनाज का नमूना लोड करें और विश्लेषण चलाएं।",
        btnSpeakText: "रिपोर्ट सुनें",
        btnReportText: "रिपोर्ट एक्सपोर्ट करें",
        btnHistoryLbl: "इतिहास देखें",
        historyTitleLbl: "स्कैन इतिहास",
        btnClearHistoryLbl: "सारा इतिहास मिटाएं",
        emptyHistoryText: "कोई पिछला स्कैन नहीं मिला।",
        fallbackText: "अनाज विश्लेषण शुरू करने के लिए एक छवि अपलोड करें या नमूना लोड करें",
        months: "महीने",
        gradeA: "प्रीमियम ग्रेड A",
        gradeB: "मानक ग्रेड B",
        gradeC: "खराब ग्रेड C",
        noData: "डेटा नहीं",
        statusSafe: "सुरक्षित",
        statusWarn: "चेतावनी",
        statusDanger: "खतरनाक",
        advSafe: "इष्टतम नमी और अनाज की गुणवत्ता। 12 महीने तक मानक सूखे भंडारण के लिए उपयुक्त है। समय-समय पर वेंटिलेशन चालू रखें।",
        advWarn: "नमी का स्तर बढ़ा हुआ है। हल्का कवक (फंगस) का खतरा। कीड़ों की गतिविधि को रोकने के लिए तत्काल वेंटिलेशन या सुखाने की सिफारिश की जाती है।",
        advDanger: "उच्च नमी की मात्रा! तेजी से खराब होने, कवक और गर्मी का उच्च जोखिम। तुरंत वेंटिलेशन करें और मैकेनिकल ड्रायर से सुखाएं।",
        lblVarietyVal: "अनाज की विविधता",
        datasetTitle: "संदर्भ डेटासेट",
        datasetDesc: "muratkokludataset/rice-image-dataset (75,000+ नमूने), USDA अनाज निरीक्षण मानक डेटासेट और FAO नमी संदर्भ दिशानिर्देशों का उपयोग करके कैलिब्रेट किया गया।",
        ttsSpeechStart: "विश्लेषण रिपोर्ट का ऑडियो शुरू हो रहा है।",
        ttsReportSummary: (grain, total, premium, broken, discolored, moisture, status) => 
            `${grain} की विश्लेषण रिपोर्ट। कुल अनाज की संख्या: ${total}। प्रीमियम गुणवत्ता: ${premium} प्रतिशत। टूटे अनाज: ${broken} प्रतिशत। खराब या बदरंग अनाज: ${discolored} प्रतिशत। नमी की मात्रा ${moisture} प्रतिशत है, जो कि ${status} है।`
    },
    pa: {
        subtitle: "ਸਮਾਰਟ ਅਨਾਜ ਗੁਣਵੱਤਾ ਅਤੇ ਸਟੋਰੇਜ ਵਿਸ਼ਲੇਸ਼ਣ",
        configTitle: "ਵਿਸ਼ਲੇਸ਼ਣ ਸੈਟਿੰਗਾਂ",
        labelGrainType: "ਅਨਾਜ ਦੀ ਕਿਸਮ ਚੁਣੋ",
        labelTemp: "ਸਟੋਰੇਜ ਤਾਪਮਾਨ (°C)",
        labelRh: "ਨਮੀ ਦੀ ਮਾਤਰਾ (%)",
        sourceTitle: "ਅਨਾਜ ਦਾ ਨਮੂਨਾ ਅਪਲੋਡ ਕਰੋ",
        dropMainPrompt: "ਫੋਟੋ ਨੂੰ ਇੱਥੇ ਖਿੱਚੋ ਅਤੇ ਛੱਡੋ",
        dropSubPrompt: "ਜਾਂ ਫੋਟੋ ਲੱਭਣ ਲਈ ਕਲਿੱਕ ਕਰੋ",
        btnCameraText: "ਲਾਈਵ ਕੈਮਰਾ",
        btnSampleText: "ਚਾਵਲ ਦਾ ਨਮੂਨਾ ਪਰਖੋ",
        statusReady: "ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਤਿਆਰ",
        statusLoading: "ਫੋਟੋ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
        statusProcessing: "ਪਿਕਸਲ ਜਾਂਚ ਜਾਰੀ... ਅਨਾਜ ਵੰਡਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
        statusSuccess: "ਵਿਸ਼ਲੇਸ਼ਣ ਮੁਕੰਮਲ",
        statusCameraActive: "ਕੈਮਰਾ ਚਾਲੂ ਹੈ। ਫੋਟੋ ਖਿੱਚੋ।",
        statusCameraError: "ਕੈਮਰਾ ਚਾਲੂ ਨਹੀਂ ਹੋ ਸਕਿਆ",
        btnAnalyzeText: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
        resultsTitle: "ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਤੀਜੇ",
        qualityScore: "ਗੁਣਵੱਤਾ ਸਕੋਰ",
        lblMoistureVal: "ਨਮੀ ਦੀ ਮਾਤਰਾ",
        lblAgeVal: "ਸਟੋਰੇਜ ਉਮਰ",
        defectsBreakdownTitle: "ਅਨਾਜ ਦੀ ਵੰਡ",
        lblTotalGrains: "ਦਾਣੇ",
        lblLegPremium: "ਵਧੀਆ ਦਾਣੇ",
        lblLegBroken: "ਟੁੱਟੇ ਦਾਣੇ",
        lblLegDiscolored: "ਖਰਾਬ/ਰੰਗ ਬਦਲੇ ਦਾਣੇ",
        advisoryTitle: "ਸਟੋਰੇਜ ਸਿਹਤ ਸਲਾਹਕਾਰ",
        advisoryDefaultText: "ਸੁਰੱਖਿਆ ਰਿਪੋਰਟਾਂ ਅਤੇ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਅਨਾਜ ਦਾ ਨਮੂਨਾ ਲੋਡ ਕਰੋ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਚਲਾਓ।",
        btnSpeakText: "ਰਿਪੋਰਟ ਸੁਣੋ",
        btnReportText: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",
        btnHistoryLbl: "ਇਤਿਹਾਸ",
        historyTitleLbl: "ਸਕੈਨ ਇਤਿਹਾਸ",
        btnClearHistoryLbl: "ਸਾਰਾ ਇਤਿਹਾਸ ਸਾਫ਼ ਕਰੋ",
        emptyHistoryText: "ਕੋਈ ਪੁਰਾਣਾ ਸਕੈਨ ਨਹੀਂ ਮਿਲਿਆ।",
        fallbackText: "ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਜਾਂ ਨਮੂਨਾ ਲੋਡ ਕਰੋ",
        months: "ਮਹੀਨੇ",
        gradeA: "ਪ੍ਰੀਮੀਅਮ ਗ੍ਰੇਡ A",
        gradeB: "ਸਟੈਂਡਰਡ ਗ੍ਰੇਡ B",
        gradeC: "ਖ਼ਰਾਬ ਗ੍ਰੇਡ C",
        noData: "ਕੋਈ ਡਾਟਾ ਨਹੀਂ",
        statusSafe: "ਸੁਰੱਖਿਅਤ",
        statusWarn: "ਚੇਤਾਵਨੀ",
        statusDanger: "ਖ਼ਤਰਾ",
        advSafe: "ਅਨੁਕੂਲ ਨਮੀ ਅਤੇ ਅਨਾਜ ਦੀ ਗੁਣਵੱਤਾ। 12 ਮਹੀਨਿਆਂ ਤੱਕ ਸੁੱਕੇ ਸਟੋਰੇਜ ਲਈ ਢੁਕਵਾਂ ਹੈ। ਹਵਾਦਾਰੀ ਚਾਲੂ ਰੱਖੋ।",
        advWarn: "ਨਮੀ ਦੀ ਮਾਤਰਾ ਵੱਧ ਹੈ। ਉੱਲੀ ਲੱਗਣ ਦਾ ਹਲਕਾ ਖਤਰਾ। ਕੀੜਿਆਂ ਤੋਂ ਬਚਾਅ ਲਈ ਹਵਾਦਾਰੀ ਜਾਂ ਹਲਕੀ ਸੁਕਾਈ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
        advDanger: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਨਮੀ! ਅਨਾਜ ਖਰਾਬ ਹੋਣ ਅਤੇ ਉੱਲੀ ਲੱਗਣ ਦਾ ਵੱਡਾ ਖਤਰਾ। ਤੁਰੰਤ ਹਵਾ ਲਗਵਾਓ ਅਤੇ ਮਸ਼ੀਨ ਨਾਲ ਸੁਕਾਓ।",
        lblVarietyVal: "ਅਨਾਜ ਦੀ ਕਿਸਮ",
        datasetTitle: "ਹਵਾਲਾ ਡਾਟਾਸੇਟ",
        datasetDesc: "muratkokludataset/rice-image-dataset (75,000+ ਨਮੂਨੇ), USDA ਅਨਾਜ ਨਿਰੀਖਣ ਮਿਆਰੀ ਡਾਟਾਸੇਟ ਅਤੇ FAO ਨਮੀ ਹਵਾਲਾ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੈਲੀਬਰੇਟ ਕੀਤਾ ਗਿਆ।",
        ttsSpeechStart: "ਵਿਸ਼ਲੇਸ਼ਣ ਰਿਪੋਰਟ ਸੁਣਾਈ ਜਾ ਰਹੀ ਹੈ।",
        ttsReportSummary: (grain, total, premium, broken, discolored, moisture, status) => 
            `${grain} ਦੀ ਵਿਸ਼ਲੇਸ਼ਣ ਰਿਪੋਰਟ। ਕੁਲ ਦਾਣੇ: ${total}। ਪ੍ਰੀਮੀਅਮ ਗੁਣਵੱਤਾ: ${premium} ਫੀਸਦੀ। ਟੁੱਟੇ ਦਾਣੇ: ${broken} ਫੀਸਦੀ। ਖਰਾਬ ਦਾਣੇ: ${discolored} ਫੀਸਦੀ। ਨਮੀ ਦੀ ਮਾਤਰਾ ${moisture} ਫੀਸਦੀ ਹੈ, ਜੋ ਕਿ ${status} ਹੈ।`
    },
    te: {
        subtitle: "నిల్వ నాణ్యత మరియు తేమ విశ్లేషణ వ్యవస్థ",
        configTitle: "విశ్లేషణ సెట్టింగులు",
        labelGrainType: "ధాన్యపు రకం ఎంచుకోండి",
        labelTemp: "నిల్వ ఉష్ణోగ్రత (°C)",
        labelRh: "తేమ శాతం (%)",
        sourceTitle: "ధాన్యం నమూనాను అప్‌లోడ్ చేయండి",
        dropMainPrompt: "చిత్రాన్ని ఇక్కడ డ్రాగ్ చేసి వదలండి",
        dropSubPrompt: "లేదా మీ పరికరం నుండి ఎంచుకోండి",
        btnCameraText: "లైవ్ కెమెరా",
        btnSampleText: "బియ్యం శాంపిల్ ప్రయత్నించండి",
        statusReady: "విశ్లేషణకు సిద్ధంగా ఉంది",
        statusLoading: "చిత్రం లోడ్ అవుతోంది...",
        statusProcessing: "పిక్సెల్‌లను విశ్లేషిస్తోంది... ధాన్యాలను వేరు చేస్తోంది...",
        statusSuccess: "విశ్లేషణ పూర్తయింది",
        statusCameraActive: "కెమెరా ఆన్ చేయబడింది. ఫోటో తీయండి.",
        statusCameraError: "కెమెరా యాక్సెస్ తిరస్కరించబడింది లేదా అందుబాటులో లేదు",
        btnAnalyzeText: "ధాన్యం విశ్లేషించు",
        resultsTitle: "విశ్లేషణ ఫలితాలు",
        qualityScore: "నాణ్యత స్కోరు",
        lblMoistureVal: "తేమ శాతం",
        lblAgeVal: "నిల్వ కాలం",
        defectsBreakdownTitle: "ధాన్యం వివరాలు",
        lblTotalGrains: "ధాన్యాలు",
        lblLegPremium: "ప్రీమియం ధాన్యాలు",
        lblLegBroken: "విరిగిన ధాన్యాలు",
        lblLegDiscolored: "రంగు మారిన ధాన్యాలు",
        advisoryTitle: "నిల్వ ఆరోగ్య సలహాదారు",
        advisoryDefaultText: "భద్రతా నివేదికలు మరియు సిఫార్సులను పొందడానికి దయచేసి ధాన్యం నమూనాను లోడ్ చేసి విశ్లేషణను రన్ చేయండి.",
        btnSpeakText: "రిపోర్ట్ వినండి",
        btnReportText: "రిపోర్ట్ డౌన్‌లోడ్",
        btnHistoryLbl: "చరిత్ర",
        historyTitleLbl: "స్కాన్ చరిత్ర",
        btnClearHistoryLbl: "చరిత్రను క్లియర్ చేయి",
        emptyHistoryText: "గత స్కాన్‌లు ఏవీ లేవు.",
        fallbackText: "ధాన్యం విశ్లేషణను ప్రారంభించడానికి చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా నమూనాను లోడ్ చేయండి",
        months: "నెలలు",
        gradeA: "ప్రీమియం గ్రేడ్ A",
        gradeB: "స్టాండర్డ్ గ్రేడ్ B",
        gradeC: "తక్కువ నాణ్యత గ్రేడ్ C",
        noData: "సమాచారం లేదు",
        statusSafe: "సురక్షితం",
        statusWarn: "హెచ్చరిక",
        statusDanger: "ప్రమాదం",
        advSafe: "ఆప్టిమల్ తేమ మరియు ధాన్యం నాణ్యత. 12 నెలల వరకు ప్రామాణిక పొడి నిల్వకు అనుకూలం. వెంటిలేషన్ ఆన్ లో ఉంచండి.",
        advWarn: "తేమ స్థాయిలు పెరిగాయి. బూజు పట్టే చిన్న ప్రమాదం ఉంది. పురుగులు పట్టకుండా ఉండటానికి వెంటనే వెంటిలేషన్ లేదా ఎండబెట్టడం సిఫార్సు చేయబడింది.",
        advDanger: "అధిక తేమ శాతం! ధాన్యం త్వరగా పాడయ్యే, బూజు పట్టే ప్రమాదం ఉంది. వెంటనే ఎండబెట్టి, వెంటిలేషన్ మెరుగుపరచండి.",
        lblVarietyVal: "ధాన్యపు రకం",
        datasetTitle: "సూచన డేటాసెట్‌లు",
        datasetDesc: "muratkokludataset/rice-image-dataset (75,000+ నమూనాలు), USDA గ్రెయిన్ ఇన్స్పెక్షన్ స్టాండర్డ్ డేటాసెట్ మరియు FAO తేమ సూచన మార్గదర్శకాలను ఉపయోగించి క్రమాంకనం చేయబడింది.",
        ttsSpeechStart: "విశ్లేషణ నివేదిక ఆడియో వినబడుతోంది.",
        ttsReportSummary: (grain, total, premium, broken, discolored, moisture, status) => 
            `${grain} విశ్లేషణ నివేదిక. మొత్తం గింజల సంఖ్య: ${total}. ప్రీమియం నాణ్యత: ${premium} శాతం. విరిగిన గింజలు: ${broken} శాతం. రంగు మారిన గింజలు: ${discolored} శాతం. తేమ శాతం ${moisture} శాతం, ఇది చాలా ${status}.`
    },
    es: {
        subtitle: "Análisis Inteligente de Calidad y Almacenamiento de Granos",
        configTitle: "Ajustes de Análisis",
        labelGrainType: "Seleccione Tipo de Grano",
        labelTemp: "Temperatura de Almacén (°C)",
        labelRh: "Humedad Relativa (%)",
        sourceTitle: "Subir Muestra de Grano",
        dropMainPrompt: "Arrastre y suelte la imagen aquí",
        dropSubPrompt: "o haga clic para buscar en su dispositivo",
        btnCameraText: "Cámara en Vivo",
        btnSampleText: "Probar Muestra de Arroz",
        statusReady: "Listo para el análisis",
        statusLoading: "Cargando imagen...",
        statusProcessing: "Analizando píxeles... Segmentando granos...",
        statusSuccess: "Análisis completado",
        statusCameraActive: "Cámara activa. Capture una foto del grano.",
        statusCameraError: "Acceso a la cámara denegado o no disponible",
        btnAnalyzeText: "Analizar Grano",
        resultsTitle: "Resultados del Análisis",
        qualityScore: "Puntaje de Calidad",
        lblMoistureVal: "Contenido de Humedad",
        lblAgeVal: "Tiempo de Almacenamiento",
        defectsBreakdownTitle: "Desglose de Granos",
        lblTotalGrains: "Granos",
        lblLegPremium: "Granos Premium",
        lblLegBroken: "Granos Quebrados",
        lblLegDiscolored: "Granos Decolorados",
        advisoryTitle: "Asesor de Almacenamiento",
        advisoryDefaultText: "Por favor cargue una muestra y ejecute el análisis para generar recomendaciones de seguridad.",
        btnSpeakText: "Escuchar Reporte",
        btnReportText: "Exportar Reporte",
        btnHistoryLbl: "Historial",
        historyTitleLbl: "Historial de Escaneos",
        btnClearHistoryLbl: "Borrar Historial",
        emptyHistoryText: "No se encontraron escaneos anteriores.",
        fallbackText: "Suba una imagen o cargue la muestra para comenzar el análisis",
        months: "meses",
        gradeA: "Premium Grado A",
        gradeB: "Estándar Grado B",
        gradeC: "Deficiente Grado C",
        noData: "Sin Datos",
        statusSafe: "SEGURO",
        statusWarn: "ALERTA",
        statusDanger: "PELIGRO",
        advSafe: "Humedad y calidad óptimas. Apto para almacenamiento seco estándar hasta por 12 meses. Mantenga la ventilación activa periódicamente.",
        advWarn: "Niveles de humedad elevados. Riesgo menor de moho. Se recomienda ventilación inmediata o secado ligero para evitar insectos.",
        advDanger: "¡Contenido de humedad crítico! Alto riesgo de descomposición, moho y calentamiento. Airee inmediatamente y pase por un secador mecánico.",
        lblVarietyVal: "Variedad Detectada",
        datasetTitle: "Conjuntos de Datos",
        datasetDesc: "Calibrado utilizando muratkokludataset/rice-image-dataset (75,000+ muestras), el Conjunto de Datos de Inspección de Granos del USDA y las Directrices de Humedad de la FAO.",
        ttsSpeechStart: "Iniciando la lectura del reporte de análisis.",
        ttsReportSummary: (grain, total, premium, broken, discolored, moisture, status) => 
            `Reporte de análisis para ${grain}. Total de granos contados: ${total}. Calidad premium: ${premium} por ciento. Granos rotos: ${broken} por ciento. Granos decolorados o con moho: ${discolored} por ciento. El contenido de humedad es del ${moisture} por ciento, lo cual es de nivel ${status}.`
    }
};

// Global App State
let appState = {
    currentLanguage: 'en',
    selectedGrain: 'rice',
    temperature: 25,
    humidity: 65,
    sourceImageLoaded: false,
    analysisCompleted: false,
    cameraStream: null,
    detectedGrains: [], 
    history: [],
    currentSpeech: null
};

// DOM Elements
const elements = {
    langSelect: document.getElementById('lang-select'),
    appSubtitle: document.getElementById('app-subtitle'),
    configTitle: document.getElementById('config-title'),
    labelGrainType: document.getElementById('label-grain-type'),
    grainTypeSelect: document.getElementById('grain-type'),
    labelTemp: document.getElementById('label-temp'),
    inputTemp: document.getElementById('input-temp'),
    valTemp: document.getElementById('val-temp'),
    labelRh: document.getElementById('label-rh'),
    inputRh: document.getElementById('input-rh'),
    valRh: document.getElementById('val-rh'),
    sourceTitle: document.getElementById('source-title'),
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('file-input'),
    dropMainPrompt: document.getElementById('drop-main-prompt'),
    dropSubPrompt: document.getElementById('drop-sub-prompt'),
    cameraBtn: document.getElementById('camera-btn'),
    btnCameraText: document.getElementById('btn-camera-text'),
    sampleBtn: document.getElementById('sample-btn'),
    btnSampleText: document.getElementById('btn-sample-text'),
    statusIndicator: document.getElementById('status-indicator'),
    statusText: document.getElementById('status-text'),
    btnAnalyze: document.getElementById('btn-analyze'),
    btnAnalyzeText: document.getElementById('btn-analyze-text'),
    canvasContainer: document.getElementById('canvas-container'),
    fallbackMessage: document.getElementById('fallback-message'),
    fallbackText: document.getElementById('fallback-text'),
    sourceImage: document.getElementById('source-image'),
    analysisCanvas: document.getElementById('analysis-canvas'),
    grainTooltip: document.getElementById('grain-tooltip'),
    scanLine: document.getElementById('scan-line'),
    cameraStream: document.getElementById('camera-stream'),
    cameraCaptureBtn: document.getElementById('camera-capture-btn'),
    resultsTitle: document.getElementById('results-title'),
    qualityVal: document.getElementById('quality-val'),
    qualityGradeLabel: document.getElementById('quality-grade-label'),
    qualityBadge: document.getElementById('quality-badge'),
    gaugeFill: document.getElementById('gauge-fill'),
    lblMoistureVal: document.getElementById('lbl-moisture-val'),
    moistureVal: document.getElementById('moisture-val'),
    moistureStatusBadge: document.getElementById('moisture-status-badge'),
    lblAgeVal: document.getElementById('lbl-age-val'),
    ageVal: document.getElementById('age-val'),
    ageStatusBadge: document.getElementById('age-status-badge'),
    defectsBreakdownTitle: document.getElementById('defects-breakdown-title'),
    totalGrainCount: document.getElementById('total-grain-count'),
    lblTotalGrains: document.getElementById('lbl-total-grains'),
    pieSegmentPremium: document.getElementById('pie-segment-premium'),
    pieSegmentBroken: document.getElementById('pie-segment-broken'),
    pieSegmentDiscolored: document.getElementById('pie-segment-discolored'),
    lblLegPremium: document.getElementById('lbl-leg-premium'),
    valLegPremium: document.getElementById('val-leg-premium'),
    lblLegBroken: document.getElementById('lbl-leg-broken'),
    valLegBroken: document.getElementById('val-leg-broken'),
    lblLegDiscolored: document.getElementById('lbl-leg-discolored'),
    valLegDiscolored: document.getElementById('val-leg-discolored'),
    advisoryTitle: document.getElementById('advisory-title'),
    advisoryBox: document.getElementById('advisory-box'),
    advisoryIcon: document.getElementById('advisory-icon'),
    advisoryText: document.getElementById('advisory-text'),
    ttsBtn: document.getElementById('tts-btn'),
    btnSpeakText: document.getElementById('btn-speak-text'),
    reportBtn: document.getElementById('report-btn'),
    btnReportText: document.getElementById('btn-report-text'),
    historyToggleBtn: document.getElementById('history-toggle-btn'),
    historyDrawer: document.getElementById('history-drawer'),
    historyCloseBtn: document.getElementById('history-close-btn'),
    historyContentList: document.getElementById('history-content-list'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    historyTitleLbl: document.getElementById('history-title-lbl'),
    btnClearHistoryLbl: document.getElementById('btn-clear-history-lbl'),
    emptyHistoryText: document.getElementById('empty-history-text'),
    audioWidget: document.getElementById('audio-widget'),
    audioWidgetText: document.getElementById('audio-widget-text'),
    audioStopBtn: document.getElementById('audio-stop-btn'),
    
    // New dataset card bindings
    datasetTitle: document.getElementById('dataset-title'),
    datasetDesc: document.getElementById('dataset-desc'),
    
    // Variety card bindings
    varietyCard: document.getElementById('variety-card'),
    varietyVal: document.getElementById('variety-val'),
    varietyStatusBadge: document.getElementById('variety-status-badge')
};

// --- Language Switching Engine ---
function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    appState.currentLanguage = lang;
    elements.langSelect.value = lang;
    
    const t = translations[lang];
    
    // Update simple text elements
    elements.appSubtitle.innerText = t.subtitle;
    elements.configTitle.innerText = t.configTitle;
    elements.labelGrainType.innerText = t.labelGrainType;
    elements.labelTemp.innerText = t.labelTemp;
    elements.labelRh.innerText = t.labelRh;
    elements.sourceTitle.innerText = t.sourceTitle;
    elements.dropMainPrompt.innerText = t.dropMainPrompt;
    elements.dropSubPrompt.innerText = t.dropSubPrompt;
    elements.btnCameraText.innerText = t.btnCameraText;
    elements.resultsTitle.innerText = t.resultsTitle;
    elements.qualityGradeLabel.innerText = t.qualityScore;
    elements.lblMoistureVal.innerText = t.lblMoistureVal;
    elements.lblAgeVal.innerText = t.lblAgeVal;
    elements.varietyCard.querySelector('.metric-label').innerText = t.lblVarietyVal;
    elements.defectsBreakdownTitle.innerText = t.defectsBreakdownTitle;
    elements.lblTotalGrains.innerText = t.lblTotalGrains;
    elements.lblLegPremium.innerText = t.lblLegPremium;
    elements.lblLegBroken.innerText = t.lblLegBroken;
    elements.lblLegDiscolored.innerText = t.lblLegDiscolored;
    elements.advisoryTitle.innerText = t.advisoryTitle;
    elements.btnSpeakText.innerText = t.btnSpeakText;
    elements.btnReportText.innerText = t.btnReportText;
    elements.historyTitleLbl.innerText = t.historyTitleLbl;
    elements.btnClearHistoryLbl.innerText = t.btnClearHistoryLbl;
    
    // Update dataset reference card texts
    elements.datasetTitle.innerText = t.datasetTitle;
    elements.datasetDesc.innerHTML = t.datasetDesc;

    // Update active grain select options
    const grainOptions = elements.grainTypeSelect.options;
    const grainNames = {
        en: ["Rice (White Long-Grain)", "Wheat (Hard Red)", "Corn (Yellow Dent)", "Barley (Two-Row)", "Lentils (Red)"],
        hi: ["चावल (सफेद लंबे दाने)", "गेहूं (कठोर लाल)", "मक्का (पीला)", "जौ (दो-पंक्ति)", "दालें (लाल)"],
        pa: ["ਚਾਵਲ (ਲੰਬੇ ਦਾਣੇ)", "ਕਣਕ (ਲਾਲ ਕਣਕ)", "ਮੱਕੀ (ਪੀਲੀ ਮੱਕੀ)", "ਜੌਂ (ਦੋ-ਪੰਕਤੀ)", "ਦਾਲਾਂ (ਲਾਲ)"],
        te: ["బియ్యం (పొడుగాటి రకం)", "గోధుమలు (హార్డ్ రెడ్)", "మొక్కజొన్న (ఎల్లో డెంట్)", "బార్లీ (టూ-రో)", "పప్పుధాన్యాలు (ఎర్ర పప్పు)"],
        es: ["Arroz (Grano Largo)", "Trigo (Rojo Duro)", "Maíz (Dentado Amarillo)", "Cebada (Dos Filas)", "Lentejas (Rojas)"]
    };
    for (let i = 0; i < grainOptions.length; i++) {
        grainOptions[i].text = grainNames[lang][i];
    }
    
    // Set Sample Button Text relative to selection
    updateSampleBtnText();

    // Update status text based on current state
    if (appState.analysisCompleted) {
        setStatus('success', t.statusSuccess);
        updateUIWithResults(); 
    } else if (appState.sourceImageLoaded) {
        setStatus('idle', t.statusReady);
        elements.fallbackText.innerText = t.fallbackText;
    } else {
        setStatus('idle', t.statusReady);
        elements.fallbackText.innerText = t.fallbackText;
    }

    // Refresh history drawer labels
    renderHistory();
}

function updateSampleBtnText() {
    const sampleBtnNames = {
        en: ["Try Rice Sample", "Try Wheat Sample", "Try Corn Sample", "Try Barley Sample", "Try Lentils Sample"],
        hi: ["चावल का नमूना आजमाएं", "गेहूं का नमूना आजमाएं", "मक्का का नमूना आजमाएं", "जौ का नमूना आजमाएं", "दालों का नमूना आजमाएं"],
        pa: ["ਚਾਵਲ ਦਾ ਨਮੂਨਾ ਪਰਖੋ", "ਕਣਕ ਦਾ ਨਮੂਨਾ ਪਰਖੋ", "ਮੱਕੀ ਦਾ ਨਮੂਨਾ ਪਰਖੋ", "ਜੌਂ ਦਾ ਨਮੂਨਾ ਪਰਖੋ", "ਦਾਲਾਂ ਦਾ ਨਮੂਨਾ ਪਰਖੋ"],
        te: ["బియ్యం శాంపిల్", "గోధుమల శాంపిల్", "మొక్కజొన్న శాంపిల్", "బార్లీ శాంపిల్", "పప్పుధాన్యాల శాంపిల్"],
        es: ["Probar Muestra de Arroz", "Probar Muestra de Trigo", "Probar Muestra de Maíz", "Probar Muestra de Cebada", "Probar Muestra de Lentejas"]
    };
    const activeIdx = elements.grainTypeSelect.selectedIndex;
    elements.btnSampleText.innerText = sampleBtnNames[appState.currentLanguage][activeIdx];
}

// --- Scientific Equilibrium Moisture Content (EMC) Calculations ---
function calculateEMC(grainType, tempCelsius, rhPercentage) {
    const rh = Math.max(0.05, Math.min(0.95, rhPercentage / 100));
    
    let K, N, C;
    switch(grainType) {
        case 'rice':    K = 1.9187e-5; N = 2.4485; C = 51.161; break;
        case 'wheat':   K = 2.3e-5;    N = 2.23;   C = 35.6;    break;
        case 'corn':    K = 1.1e-5;    N = 2.63;   C = 43.6;    break;
        case 'barley':  K = 2.0e-5;    N = 2.35;   C = 40.0;    break;
        case 'lentils': K = 1.5e-5;    N = 2.50;   C = 45.0;    break;
        default:        K = 1.9e-5;    N = 2.40;   C = 45.0;
    }
    
    const numerator = -Math.log(1.0 - rh);
    const denominator = K * (tempCelsius + C);
    const emcPercent = Math.pow(numerator / denominator, 1 / N);
    
    return parseFloat(emcPercent.toFixed(1));
}

// --- Dynamic Color Shift Storage Age Calculation ---
function estimateStorageAge(grainType, averageColor) {
    const { r, g, b } = averageColor;
    let ageMonths = 2; // Default starting age for a standard sample
    
    // Calculate basic properties
    const brightness = (r + g + b) / 3;
    
    switch(grainType) {
        case 'rice':
            // Rice yellowing index (lower b relative to r/g indicates yellowing)
            const yellowShift = (r + g) / (2 * Math.max(1, b));
            if (yellowShift > 1.28) {
                ageMonths = 18;
            } else if (yellowShift > 1.15) {
                ageMonths = 10;
            } else if (yellowShift > 1.08) {
                ageMonths = 5;
            } else {
                // If it is very white and bright, it's fresh
                ageMonths = brightness > 175 ? 1 : 2;
            }
            break;
            
        case 'wheat':
            // Fresh wheat is amber and bright (around 120-140 brightness)
            // As it ages, it darkens due to oxidation (brightness drops)
            if (brightness < 85) {
                ageMonths = 16;
            } else if (brightness < 105) {
                ageMonths = 8;
            } else if (brightness < 120) {
                ageMonths = 4;
            } else {
                ageMonths = 2;
            }
            break;
            
        case 'corn':
            // Fresh corn is bright yellow (high saturation and brightness)
            // Saturation = r / b. Fresh corn typically has r/b > 3.0.
            const cornSat = r / Math.max(1, b);
            if (brightness < 90 || cornSat < 1.9) {
                ageMonths = 14;
            } else if (brightness < 120 || cornSat < 2.8) {
                ageMonths = 6;
            } else {
                ageMonths = 2;
            }
            break;
            
        case 'barley':
            // Barley darkens with age
            if (brightness < 90) {
                ageMonths = 15;
            } else if (brightness < 115) {
                ageMonths = 7;
            } else {
                ageMonths = 2;
            }
            break;
            
        case 'lentils':
            // Red lentils are naturally darker and red-orange (r/g is high).
            // As they age, they lose their bright orange color, turning dark brown/grey.
            const redRatio = r / Math.max(1, g);
            if (brightness < 80 || redRatio < 1.3) {
                ageMonths = 12;
            } else if (brightness < 100 || redRatio < 1.5) {
                ageMonths = 6;
            } else {
                ageMonths = 2;
            }
            break;
            
        default:
            if (brightness < 100) {
                ageMonths = 12;
            } else if (brightness < 130) {
                ageMonths = 5;
            } else {
                ageMonths = 2;
            }
    }
    
    // Now, incorporate moisture and temperature as modifiers, because poor storage conditions
    // cause accelerated physical aging which reflects on the quality and estimated storage age.
    // If the sample is stored under high moisture (EMC > 14%) and high temperature (>28°C),
    // it will simulate a higher apparent age or quality degradation.
    const moisture = calculateEMC(grainType, appState.temperature, appState.humidity);
    if (moisture > 16.0 && appState.temperature > 30) {
        // High risk environment adds to estimated age
        ageMonths = Math.min(24, Math.round(ageMonths * 1.5));
    } else if (moisture > 14.0 && appState.temperature > 25) {
        ageMonths = Math.min(24, Math.round(ageMonths * 1.25));
    }
    
    // If there is significant discoloration, it indicates old age
    if (appState.detectedGrains.length > 0) {
        const total = appState.detectedGrains.length;
        const discolored = appState.detectedGrains.filter(g => g.status === 'discolored').length;
        const discoloredRatio = discolored / total;
        if (discoloredRatio > 0.15) {
            ageMonths = Math.max(ageMonths, 18);
        } else if (discoloredRatio > 0.05) {
            ageMonths = Math.max(ageMonths, 10);
        } else if (discoloredRatio > 0.02) {
            ageMonths = Math.max(ageMonths, 5);
        }
    }
    
    return ageMonths;
}


// --- Rice Variety Classification Neural Net/Softmax Forward Pass ---
function classifyRiceVariety(aspect, solidity, r, g, b) {
    if (typeof RICE_MODEL_DATA === 'undefined') {
        // Fallback heuristic if the model weights file isn't loaded
        if (aspect > 2.8) return 'Basmati';
        if (aspect > 2.1) return 'Jasmine';
        if (aspect > 1.7) return 'Ipsala';
        if (solidity > 0.77 && b < 0.7) return 'Karacadag';
        return 'Arborio';
    }
    
    const classes = RICE_MODEL_DATA.classes;
    const means = RICE_MODEL_DATA.featureMeans;
    const stds = RICE_MODEL_DATA.featureStds;
    const weights = RICE_MODEL_DATA.weights;
    const biases = RICE_MODEL_DATA.biases;
    
    // Normalize features
    const features = [aspect, solidity, r, g, b];
    const normalized = features.map((val, idx) => (val - means[idx]) / stds[idx]);
    
    // Compute scores for each class: score = bias + sum(w_i * x_i)
    const scores = [];
    for (let c = 0; c < classes.length; c++) {
        let score = biases[c];
        for (let f = 0; f < normalized.length; f++) {
            score += normalized[f] * weights[c][f];
        }
        scores.push(score);
    }
    
    // Find index of maximum score
    let maxIdx = 0;
    let maxScore = scores[0];
    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > maxScore) {
            maxScore = scores[i];
            maxIdx = i;
        }
    }
    
    return classes[maxIdx];
}

// --- Computer Vision: BFS Connected Component Grain Segmentation ---
function performImageAnalysis() {
    return new Promise((resolve) => {
        const sourceImg = elements.sourceImage;
        const displayCanvas = elements.analysisCanvas;
        const ctx = displayCanvas.getContext('2d');
        
        displayCanvas.width = sourceImg.naturalWidth;
        displayCanvas.height = sourceImg.naturalHeight;
        ctx.drawImage(sourceImg, 0, 0);
        
        // Scale down canvas for quick processing
        const maxAnalysisDim = 450;
        let scale = 1;
        if (sourceImg.naturalWidth > maxAnalysisDim || sourceImg.naturalHeight > maxAnalysisDim) {
            scale = maxAnalysisDim / Math.max(sourceImg.naturalWidth, sourceImg.naturalHeight);
        }
        
        const offCanvas = document.createElement('canvas');
        offCanvas.width = Math.round(sourceImg.naturalWidth * scale);
        offCanvas.height = Math.round(sourceImg.naturalHeight * scale);
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(sourceImg, 0, 0, offCanvas.width, offCanvas.height);
        
        const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
        const data = imgData.data;
        const width = offCanvas.width;
        const height = offCanvas.height;
        
        // 1. Threshold settings calibrated dynamically per crop
        let thresholdFactor = 1.15;
        let minArea = 15;
        let maxArea = Math.round((width * height) * 0.15);
        
        switch(appState.selectedGrain) {
            case 'rice':    thresholdFactor = 1.22; minArea = 12; break;
            case 'wheat':   thresholdFactor = 1.12; minArea = 15; break;
            case 'corn':    thresholdFactor = 1.15; minArea = 25; break;
            case 'barley':  thresholdFactor = 1.14; minArea = 14; break;
            case 'lentils': thresholdFactor = 1.10; minArea = 10; break;
        }
        
        // Grayscale conversion
        const grayData = new Uint8Array(width * height);
        let sumGray = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            grayData[i / 4] = gray;
            sumGray += gray;
        }
        
        const avgGray = sumGray / (width * height);
        const threshold = Math.max(50, avgGray * thresholdFactor);
        
        // 2. BFS component detection
        const visited = new Uint8Array(width * height);
        const grains = [];
        const queue = new Int32Array(width * height);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = y * width + x;
                
                if (visited[idx] || grayData[idx] < threshold) continue;
                
                let qHead = 0;
                let qTail = 0;
                queue[qTail++] = idx;
                visited[idx] = 1;
                
                let minX = x, maxX = x;
                let minY = y, maxY = y;
                let grainPixels = [];
                
                while (qHead < qTail) {
                    const currIdx = queue[qHead++];
                    const cy = Math.floor(currIdx / width);
                    const cx = currIdx % width;
                    
                    if (cx < minX) minX = cx;
                    if (cx > maxX) maxX = cx;
                    if (cy < minY) minY = cy;
                    if (cy > maxY) maxY = cy;
                    
                    const pixelPos = currIdx * 4;
                    grainPixels.push({
                        r: data[pixelPos],
                        g: data[pixelPos+1],
                        b: data[pixelPos+2]
                    });
                    
                    const neighbors = [
                        currIdx - 1,
                        currIdx + 1,
                        currIdx - width,
                        currIdx + width
                    ];
                    
                    for (let n = 0; n < neighbors.length; n++) {
                        const nIdx = neighbors[n];
                        if (nIdx >= 0 && nIdx < visited.length && !visited[nIdx] && grayData[nIdx] >= threshold) {
                            visited[nIdx] = 1;
                            queue[qTail++] = nIdx;
                        }
                    }
                }
                
                const area = qTail;
                if (area >= minArea && area <= maxArea) {
                    let rSum = 0, gSum = 0, bSum = 0;
                    for (let p = 0; p < grainPixels.length; p++) {
                        rSum += grainPixels[p].r;
                        gSum += grainPixels[p].g;
                        bSum += grainPixels[p].b;
                    }
                    const avgR = Math.round(rSum / area);
                    const avgG = Math.round(gSum / area);
                    const avgB = Math.round(bSum / area);
                    
                    grains.push({
                        area: area,
                        minX: Math.round(minX / scale),
                        maxX: Math.round(maxX / scale),
                        minY: Math.round(minY / scale),
                        maxY: Math.round(maxY / scale),
                        cx: Math.round(((minX + maxX) / 2) / scale),
                        cy: Math.round(((minY + maxY) / 2) / scale),
                        avgColor: { r: avgR, g: avgG, b: avgB }
                    });
                }
            }
        }
        
        if (grains.length === 0) {
            resolve([]);
            return;
        }
        
        // Calculate average grain area
        const sortedAreas = grains.map(g => g.area).sort((a,b) => a - b);
        const trimCount = Math.floor(sortedAreas.length * 0.15);
        const trimmedAreas = sortedAreas.slice(trimCount, sortedAreas.length - trimCount);
        const avgWholeArea = trimmedAreas.length > 0 
            ? trimmedAreas.reduce((sum, val) => sum + val, 0) / trimmedAreas.length 
            : sortedAreas[Math.floor(sortedAreas.length / 2)];
            
        const processedGrains = grains.map(grain => {
            const w = grain.maxX - grain.minX;
            const h = grain.maxY - grain.minY;
            const aspect = Math.max(w, h) / Math.max(1, Math.min(w, h));
            const areaRatio = grain.area / avgWholeArea;
            
            let status = 'premium';
            
            // Defect thresholds calibrated for multigrains
            const { r, g, b } = grain.avgColor;
            
            if (appState.selectedGrain === 'rice') {
                if (areaRatio < 0.58 || (grain.area < avgWholeArea * 0.65 && aspect > 2.0)) {
                    status = 'broken';
                }
                const blueLacking = (r + g) / (2 * Math.max(1, b));
                const tooDark = (r + g + b) / 3 < 100;
                if (blueLacking > 1.25 || tooDark) {
                    status = 'discolored';
                }
            } else if (appState.selectedGrain === 'wheat') {
                if (areaRatio < 0.55 || aspect > 2.2) {
                    status = 'broken';
                }
                const brightness = (r + g + b) / 3;
                if (brightness < 75 || r < 80) { // smut, heat damage, mold
                    status = 'discolored';
                }
            } else if (appState.selectedGrain === 'corn') {
                if (areaRatio < 0.52 || aspect > 1.6) {
                    status = 'broken';
                }
                const blueGreenRatio = b / Math.max(1, g);
                const brightness = (r + g + b) / 3;
                if (brightness < 90 || blueGreenRatio > 1.1) {
                    status = 'discolored';
                }
            } else if (appState.selectedGrain === 'barley') {
                if (areaRatio < 0.56 || aspect > 2.4) {
                    status = 'broken';
                }
                const brightness = (r + g + b) / 3;
                if (brightness < 85) {
                    status = 'discolored';
                }
            } else if (appState.selectedGrain === 'lentils') {
                if (areaRatio < 0.60 || aspect > 1.4) { // Lentils should be circular
                    status = 'broken';
                }
                const brightness = (r + g + b) / 3;
                if (brightness < 80 || r < 90) { // brown spots or discolored
                    status = 'discolored';
                }
            }
            
            const solidity = grain.area / (w * h);
            let variety = 'Standard';
            if (appState.selectedGrain === 'rice') {
                variety = classifyRiceVariety(aspect, solidity, r / 255.0, g / 255.0, b / 255.0);
            }
            
            return {
                ...grain,
                width: w,
                height: h,
                aspect: parseFloat(aspect.toFixed(2)),
                solidity: parseFloat(solidity.toFixed(2)),
                status: status,
                variety: variety
            };
        });
        
        // Render highlights on screen canvas
        ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        ctx.drawImage(sourceImg, 0, 0); 
        
        processedGrains.forEach(g => {
            let color = '#2ecc71'; 
            if (g.status === 'broken') color = '#f1c40f'; 
            else if (g.status === 'discolored') color = '#e74c3c'; 
            
            ctx.beginPath();
            const radius = Math.max(15, (Math.max(g.width, g.height) / 2) + 4);
            ctx.arc(g.cx, g.cy, radius, 0, 2 * Math.PI);
            ctx.lineWidth = Math.max(3, Math.round(displayCanvas.width * 0.005));
            ctx.strokeStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0; 
        });
        
        resolve(processedGrains);
    });
}

// --- Update UI Dashboards ---
function setStatus(indicatorClass, text) {
    elements.statusIndicator.className = `status-indicator ${indicatorClass}`;
    elements.statusText.innerText = text;
}

function updateUIWithResults() {
    const t = translations[appState.currentLanguage];
    
    const premium = appState.detectedGrains.filter(g => g.status === 'premium').length;
    const broken = appState.detectedGrains.filter(g => g.status === 'broken').length;
    const discolored = appState.detectedGrains.filter(g => g.status === 'discolored').length;
    const total = appState.detectedGrains.length;
    
    // Moisture Content
    const moisture = calculateEMC(appState.selectedGrain, appState.temperature, appState.humidity);
    elements.moistureVal.innerText = `${moisture}%`;
    
    let mStatusClass = 'safe';
    let mStatusText = t.statusSafe;
    if (moisture > 16.0) {
        mStatusClass = 'danger';
        mStatusText = t.statusDanger;
    } else if (moisture > 14.0) {
        mStatusClass = 'warn';
        mStatusText = t.statusWarn;
    }
    elements.moistureStatusBadge.innerText = mStatusText;
    elements.moistureStatusBadge.className = `metric-badge ${mStatusClass}`;
    
    // Estimated Storage Age
    let avgColor = { r: 180, g: 170, b: 150 };
    if (total > 0) {
        const rSum = appState.detectedGrains.reduce((s, g) => s + g.avgColor.r, 0);
        const gSum = appState.detectedGrains.reduce((s, g) => s + g.avgColor.g, 0);
        const bSum = appState.detectedGrains.reduce((s, g) => s + g.avgColor.b, 0);
        avgColor = { r: rSum/total, g: gSum/total, b: bSum/total };
    }
    const age = estimateStorageAge(appState.selectedGrain, avgColor);
    elements.ageVal.innerText = `${age} ${t.months}`;
    
    let aStatusClass = 'safe';
    let aStatusText = t.statusSafe;
    if (age >= 12) {
        aStatusClass = 'warn';
        aStatusText = t.statusWarn;
    }
    elements.ageStatusBadge.innerText = aStatusText;
    elements.ageStatusBadge.className = `metric-badge ${aStatusClass}`;
    
    // Quality Score
    let score = 100;
    if (total > 0) {
        const brokenPercent = broken / total;
        const discoloredPercent = discolored / total;
        score = 100 - (brokenPercent * 30) - (discoloredPercent * 80);
        
        if (moisture > 16) score -= 15;
        else if (moisture > 14) score -= 5;
        
        score = Math.max(0, Math.min(100, Math.round(score)));
    }
    elements.qualityVal.innerText = score;
    
    const offset = 125.6 * (1 - (score / 100));
    elements.gaugeFill.style.strokeDashoffset = offset;
    
    let qClass = 'badge-success';
    let qText = t.gradeA;
    let gaugeColor = '#2ecc71';
    
    if (score < 55) {
        qClass = 'badge-danger';
        qText = t.gradeC;
        gaugeColor = '#e74c3c';
    } else if (score < 80) {
        qClass = 'badge-warning';
        qText = t.gradeB;
        gaugeColor = '#f1c40f';
    }
    elements.qualityBadge.className = `badge ${qClass}`;
    elements.qualityBadge.innerText = qText;
    elements.gaugeFill.style.stroke = gaugeColor;
    
    // Breakdown Details
    elements.totalGrainCount.innerText = total;
    
    const premPct = total > 0 ? Math.round((premium / total) * 100) : 0;
    const brokPct = total > 0 ? Math.round((broken / total) * 100) : 0;
    const discPct = total > 0 ? Math.round((discolored / total) * 100) : 0;
    
    elements.valLegPremium.innerText = `${premium} (${premPct}%)`;
    elements.valLegBroken.innerText = `${broken} (${brokPct}%)`;
    elements.valLegDiscolored.innerText = `${discolored} (${discPct}%)`;
    
    elements.pieSegmentPremium.setAttribute('stroke-dasharray', `${premPct} 100`);
    elements.pieSegmentBroken.setAttribute('stroke-dasharray', `${brokPct} 100`);
    elements.pieSegmentBroken.setAttribute('stroke-dashoffset', `-${premPct}`);
    elements.pieSegmentDiscolored.setAttribute('stroke-dasharray', `${discPct} 100`);
    elements.pieSegmentDiscolored.setAttribute('stroke-dashoffset', `-${premPct + brokPct}`);
    
    // Storage Safety Advisory
    let advClass = 'safe';
    let advText = t.advSafe;
    let advIconHtml = '<i class="fa-solid fa-square-check"></i>';
    
    if (moisture > 16.0 || (total > 0 && (discolored / total) > 0.08)) {
        advClass = 'danger';
        advText = t.advDanger;
        advIconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
    } else if (moisture > 14.0 || (total > 0 && (broken / total) > 0.15) || (total > 0 && (discolored / total) > 0.02)) {
        advClass = 'warning';
        advText = t.advWarn;
        advIconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';
    }
    
    elements.advisoryBox.className = `advisory-card ${advClass}`;
    elements.advisoryIcon.innerHTML = advIconHtml;
    elements.advisoryText.innerText = advText;
    
    // Update Variety Card
    elements.varietyCard.style.display = 'flex';
    let detectedVariety = 'Standard';
    
    if (appState.selectedGrain === 'rice' && total > 0) {
        const counts = {};
        let maxCount = 0;
        let majorityVariety = 'Standard';
        
        appState.detectedGrains.forEach(g => {
            const v = g.variety || 'Standard';
            counts[v] = (counts[v] || 0) + 1;
            if (counts[v] > maxCount) {
                maxCount = counts[v];
                majorityVariety = v;
            }
        });
        
        detectedVariety = majorityVariety;
        elements.varietyStatusBadge.innerText = "AI Classified";
        elements.varietyStatusBadge.style.background = "rgba(46, 204, 113, 0.15)";
        elements.varietyStatusBadge.style.color = "var(--success)";
    } else {
        if (appState.selectedGrain === 'wheat') detectedVariety = 'Hard Red';
        else if (appState.selectedGrain === 'corn') detectedVariety = 'Yellow Dent';
        else if (appState.selectedGrain === 'barley') detectedVariety = 'Two-Row';
        else if (appState.selectedGrain === 'lentils') detectedVariety = 'Red';
        
        elements.varietyStatusBadge.innerText = "Reference Std";
        elements.varietyStatusBadge.style.background = "rgba(255, 255, 255, 0.08)";
        elements.varietyStatusBadge.style.color = "var(--text-secondary)";
    }
    
    elements.varietyVal.innerText = detectedVariety;
    
    elements.ttsBtn.disabled = false;
    elements.reportBtn.disabled = false;
}

// --- Voice Synthesis (Regional TTS Reader) ---
function speakReport() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const t = translations[appState.currentLanguage];
        const premium = appState.detectedGrains.filter(g => g.status === 'premium').length;
        const broken = appState.detectedGrains.filter(g => g.status === 'broken').length;
        const discolored = appState.detectedGrains.filter(g => g.status === 'discolored').length;
        const total = appState.detectedGrains.length;
        const moisture = calculateEMC(appState.selectedGrain, appState.temperature, appState.humidity);
        
        let moistureStatus = t.statusSafe;
        if (moisture > 16.0) moistureStatus = t.statusDanger;
        else if (moisture > 14.0) moistureStatus = t.statusWarn;
        
        const grainName = elements.grainTypeSelect.options[elements.grainTypeSelect.selectedIndex].text;
        
        const textToSpeak = t.ttsReportSummary(
            grainName,
            total,
            total > 0 ? Math.round((premium / total) * 100) : 0,
            total > 0 ? Math.round((broken / total) * 100) : 0,
            total > 0 ? Math.round((discolored / total) * 100) : 0,
            moisture,
            moistureStatus
        ) + " " + elements.advisoryText.innerText;
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        const langMap = {
            en: 'en-US',
            hi: 'hi-IN',
            pa: 'hi-IN', 
            te: 'te-IN',
            es: 'es-ES'
        };
        utterance.lang = langMap[appState.currentLanguage] || 'en-US';
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith(utterance.lang));
        if (preferredVoice) utterance.voice = preferredVoice;
        
        utterance.onstart = () => {
            elements.audioWidgetText.innerText = t.ttsSpeechStart;
            elements.audioWidget.style.display = 'flex';
            setTimeout(() => {
                elements.audioWidgetText.innerText = appState.currentLanguage === 'en' ? "Speaking Report..." : "रिपोर्ट सुनाई जा रही है...";
            }, 2000);
        };
        
        utterance.onend = () => {
            elements.audioWidget.style.display = 'none';
        };
        
        utterance.onerror = () => {
            elements.audioWidget.style.display = 'none';
        };
        
        appState.currentSpeech = utterance;
        window.speechSynthesis.speak(utterance);
    }
}

// --- History Storage & Logging ---
function saveScanToHistory() {
    if (!appState.analysisCompleted) return;
    
    const premium = appState.detectedGrains.filter(g => g.status === 'premium').length;
    const broken = appState.detectedGrains.filter(g => g.status === 'broken').length;
    const discolored = appState.detectedGrains.filter(g => g.status === 'discolored').length;
    const total = appState.detectedGrains.length;
    const score = parseInt(elements.qualityVal.innerText);
    const moisture = calculateEMC(appState.selectedGrain, appState.temperature, appState.humidity);
    const grainName = elements.grainTypeSelect.options[elements.grainTypeSelect.selectedIndex].text;
    
    const newRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(appState.currentLanguage === 'en' ? 'en-US' : 'en-IN', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        grainType: appState.selectedGrain,
        grainName: grainName,
        total: total,
        premium: premium,
        broken: broken,
        discolored: discolored,
        moisture: moisture,
        score: score
    };
    
    appState.history.unshift(newRecord); 
    if (appState.history.length > 15) appState.history.pop();
    
    localStorage.setItem('cerealsai_scans', JSON.stringify(appState.history));
    renderHistory();
}

function loadHistory() {
    const raw = localStorage.getItem('cerealsai_scans');
    if (raw) {
        try {
            appState.history = JSON.parse(raw);
        } catch(e) {
            appState.history = [];
        }
    }
    renderHistory();
}

function renderHistory() {
    elements.historyContentList.innerHTML = '';
    const t = translations[appState.currentLanguage];
    
    if (appState.history.length === 0) {
        elements.emptyHistoryText.style.display = 'block';
        elements.historyContentList.appendChild(elements.emptyHistoryText);
        return;
    }
    
    elements.emptyHistoryText.style.display = 'none';
    
    appState.history.forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.setAttribute('data-id', item.id);
        
        card.innerHTML = `
            <div class="history-card-header">
                <span class="history-grain-type">${item.grainName}</span>
                <span class="history-date">${item.date}</span>
            </div>
            <div class="history-metrics-row">
                <div class="history-metric">
                    <span class="history-metric-lbl">${t.qualityScore}</span>
                    <span class="history-metric-val">${item.score}%</span>
                </div>
                <div class="history-metric">
                    <span class="history-metric-lbl">${t.lblMoistureVal}</span>
                    <span class="history-metric-val">${item.moisture}%</span>
                </div>
                <div class="history-metric">
                    <span class="history-metric-lbl">${t.lblTotalGrains}</span>
                    <span class="history-metric-val">${item.total}</span>
                </div>
            </div>
            <button class="history-delete-btn" title="Delete record">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        
        card.addEventListener('click', (e) => {
            if (e.target.closest('.history-delete-btn')) {
                e.stopPropagation();
                deleteHistoryItem(item.id);
                return;
            }
            elements.grainTypeSelect.value = item.grainType;
            appState.selectedGrain = item.grainType;
            
            elements.qualityVal.innerText = item.score;
            elements.moistureVal.innerText = `${item.moisture}%`;
            elements.totalGrainCount.innerText = item.total;
            
            const offset = 125.6 * (1 - (item.score / 100));
            elements.gaugeFill.style.strokeDashoffset = offset;
            
            let qClass = 'badge-success';
            let qText = t.gradeA;
            let gaugeColor = '#2ecc71';
            
            if (item.score < 55) {
                qClass = 'badge-danger';
                qText = t.gradeC;
                gaugeColor = '#e74c3c';
            } else if (item.score < 80) {
                qClass = 'badge-warning';
                qText = t.gradeB;
                gaugeColor = '#f1c40f';
            }
            elements.qualityBadge.className = `badge ${qClass}`;
            elements.qualityBadge.innerText = qText;
            elements.gaugeFill.style.stroke = gaugeColor;
            
            const premPct = item.total > 0 ? Math.round((item.premium / item.total) * 100) : 0;
            const brokPct = item.total > 0 ? Math.round((item.broken / item.total) * 100) : 0;
            const discPct = item.total > 0 ? Math.round((item.discolored / item.total) * 100) : 0;
            
            elements.valLegPremium.innerText = `${item.premium} (${premPct}%)`;
            elements.valLegBroken.innerText = `${item.broken} (${brokPct}%)`;
            elements.valLegDiscolored.innerText = `${item.discolored} (${discPct}%)`;
            
            elements.pieSegmentPremium.setAttribute('stroke-dasharray', `${premPct} 100`);
            elements.pieSegmentBroken.setAttribute('stroke-dasharray', `${brokPct} 100`);
            elements.pieSegmentBroken.setAttribute('stroke-dashoffset', `-${premPct}`);
            elements.pieSegmentDiscolored.setAttribute('stroke-dasharray', `${discPct} 100`);
            elements.pieSegmentDiscolored.setAttribute('stroke-dashoffset', `-${premPct + brokPct}`);
            
            let advClass = 'safe';
            let advText = t.advSafe;
            let advIconHtml = '<i class="fa-solid fa-square-check"></i>';
            if (item.moisture > 16.0 || (discPct/100) > 0.08) {
                advClass = 'danger';
                advText = t.advDanger;
                advIconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
            } else if (item.moisture > 14.0 || (brokPct/100) > 0.15 || (discPct/100) > 0.02) {
                advClass = 'warning';
                advText = t.advWarn;
                advIconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';
            }
            
            elements.advisoryBox.className = `advisory-card ${advClass}`;
            elements.advisoryIcon.innerHTML = advIconHtml;
            elements.advisoryText.innerText = advText;
            
            elements.ttsBtn.disabled = false;
            elements.reportBtn.disabled = false;
            
            elements.historyDrawer.classList.remove('open');
            elements.historyDrawer.setAttribute('aria-hidden', 'true');
        });
        
        elements.historyContentList.appendChild(card);
    });
}

function deleteHistoryItem(id) {
    appState.history = appState.history.filter(item => item.id !== id);
    localStorage.setItem('cerealsai_scans', JSON.stringify(appState.history));
    renderHistory();
}

function clearAllHistory() {
    appState.history = [];
    localStorage.removeItem('cerealsai_scans');
    renderHistory();
}

// --- Live Camera Management ---
async function startCamera() {
    const t = translations[appState.currentLanguage];
    try {
        stopCamera();
        
        appState.cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }, 
            audio: false
        });
        
        elements.cameraStream.srcObject = appState.cameraStream;
        
        elements.fallbackMessage.style.display = 'none';
        elements.analysisCanvas.style.display = 'none';
        elements.cameraStream.style.display = 'block';
        elements.cameraCaptureBtn.style.display = 'block';
        
        setStatus('idle', t.statusCameraActive);
    } catch(err) {
        console.error("Camera error: ", err);
        setStatus('danger', t.statusCameraError);
    }
}

function stopCamera() {
    if (appState.cameraStream) {
        appState.cameraStream.getTracks().forEach(track => track.stop());
        appState.cameraStream = null;
    }
    elements.cameraStream.style.display = 'none';
    elements.cameraCaptureBtn.style.display = 'none';
}

function captureCameraFrame() {
    const t = translations[appState.currentLanguage];
    const video = elements.cameraStream;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    elements.sourceImage.src = canvas.toDataURL('image/png');
    elements.sourceImage.onload = () => {
        stopCamera();
        elements.cameraStream.style.display = 'none';
        elements.cameraCaptureBtn.style.display = 'none';
        
        elements.analysisCanvas.style.display = 'block';
        const dispCtx = elements.analysisCanvas.getContext('2d');
        elements.analysisCanvas.width = elements.sourceImage.naturalWidth;
        elements.analysisCanvas.height = elements.sourceImage.naturalHeight;
        dispCtx.drawImage(elements.sourceImage, 0, 0);
        
        appState.sourceImageLoaded = true;
        appState.analysisCompleted = false;
        elements.btnAnalyze.disabled = false;
        setStatus('idle', t.statusReady);
    };
}

// --- Interactive Tooltip Coordinates Hover Check ---
function handleCanvasMouseMove(e) {
    if (!appState.analysisCompleted || appState.detectedGrains.length === 0) return;
    
    const canvas = elements.analysisCanvas;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    const maxRadius = Math.max(30, canvas.width * 0.05); 
    let closestGrain = null;
    let minDist = maxRadius;
    
    appState.detectedGrains.forEach(g => {
        const dx = g.cx - mouseX;
        const dy = g.cy - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < minDist) {
            minDist = dist;
            closestGrain = g;
        }
    });
    
    const tooltip = elements.grainTooltip;
    if (closestGrain) {
        const t = translations[appState.currentLanguage];
        let statusText = t.lblLegPremium;
        let colorHex = '#2ecc71';
        if (closestGrain.status === 'broken') {
            statusText = t.lblLegBroken;
            colorHex = '#f1c40f';
        } else if (closestGrain.status === 'discolored') {
            statusText = t.lblLegDiscolored;
            colorHex = '#e74c3c';
        }
        
        tooltip.innerHTML = `
            <div style="font-weight: 700; color: ${colorHex}; text-transform: uppercase; margin-bottom: 4px;">${statusText}</div>
            <div>Area: ${closestGrain.area} px</div>
            <div>Aspect Ratio: ${closestGrain.aspect}</div>
            <div style="display:flex; align-items:center; gap: 4px; margin-top:2px;">
                Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:rgb(${closestGrain.avgColor.r},${closestGrain.avgColor.g},${closestGrain.avgColor.b})"></span> 
                (${closestGrain.avgColor.r}, ${closestGrain.avgColor.g}, ${closestGrain.avgColor.b})
            </div>
        `;
        
        const containerRect = elements.canvasContainer.getBoundingClientRect();
        const tooltipX = e.clientX - containerRect.left + 15;
        const tooltipY = e.clientY - containerRect.top + 15;
        
        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
        tooltip.style.display = 'block';
    } else {
        tooltip.style.display = 'none';
    }
}

// --- Interactive Particle Background System ---
const ParticlesBG = {
    canvas: null,
    ctx: null,
    list: [],
    mouse: { x: -1000, y: -1000 },
    
    init() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Populate particles
        const count = Math.min(80, Math.round((this.canvas.width * this.canvas.height) / 14000));
        this.list = [];
        for (let i = 0; i < count; i++) {
            this.list.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -Math.random() * 0.5 - 0.1, // Drifts upward
                size: Math.random() * 2.5 + 0.8,
                alpha: Math.random() * 0.5 + 0.15,
                color: Math.random() > 0.4 ? '#f39c12' : '#f1c40f' // Harvest golden tones
            });
        }
        
        // Listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Start loop
        this.tick();
    },
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    tick() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        ctx.clearRect(0, 0, w, h);
        
        this.list.forEach((p, idx) => {
            // Drift logic
            p.x += p.vx;
            p.y += p.vy;
            
            // Deflect away from mouse
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const forceRadius = 130;
            
            if (dist < forceRadius) {
                const force = (forceRadius - dist) / forceRadius;
                const angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle) * force * 2.2;
                p.y += Math.sin(angle) * force * 2.2;
            }
            
            // Loop screen boundaries
            if (p.y < -10) {
                p.y = h + 10;
                p.x = Math.random() * w;
            }
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            
            // Draw connection lines to other particles
            for (let j = idx + 1; j < this.list.length; j++) {
                const p2 = this.list[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
                
                if (dist2 < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = ((110 - dist2) / 110) * 0.15 * Math.min(p.alpha, p2.alpha);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Draw connection line to mouse
            if (dist < 160) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(this.mouse.x, this.mouse.y);
                ctx.strokeStyle = '#f39c12';
                ctx.globalAlpha = ((160 - dist) / 160) * 0.25 * p.alpha;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
            
            // Render particle glowing mote
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
        });
        
        ctx.globalAlpha = 1.0; // reset
        requestAnimationFrame(() => this.tick());
    }
};

// --- Export Report as Premium PNG Image ---
function exportReportAsImage() {
    if (!appState.analysisCompleted) return;

    const t = translations[appState.currentLanguage];
    
    // Create an offscreen canvas
    const rCanvas = document.createElement('canvas');
    rCanvas.width = 1200;
    rCanvas.height = 800;
    const ctx = rCanvas.getContext('2d');

    // 1. Draw Background (Deep Emerald night theme with subtle gradient)
    const bgGradient = ctx.createRadialGradient(600, 400, 50, 600, 400, 800);
    bgGradient.addColorStop(0, '#06201b');
    bgGradient.addColorStop(1, '#020d0b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 800);

    // 2. Draw Decorative Borders (Harvest Gold / Emerald)
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 760);

    ctx.strokeStyle = 'rgba(46, 204, 113, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, 1148, 748);

    // 3. Draw Header Title and Logo
    ctx.fillStyle = '#f39c12';
    ctx.font = 'bold 36px Outfit, sans-serif';
    ctx.fillText('CerealsAI', 60, 85);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'normal 18px Outfit, sans-serif';
    ctx.fillText('INTELLIGENT QUALITY & STORAGE ANALYTICS', 240, 80);

    // Subtitle Line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(60, 110, 1080, 2);

    // 4. Metadata details (Left side, top)
    ctx.fillStyle = '#a2b8b2';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.fillText('GRAIN QUALITY CERTIFICATE', 60, 145);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Outfit, sans-serif';
    const grainSelect = elements.grainTypeSelect;
    const grainTextName = grainSelect.options[grainSelect.selectedIndex].text;
    ctx.fillText(grainTextName, 60, 175);

    // Date/Time
    ctx.fillStyle = '#688a81';
    ctx.font = '14px Outfit, sans-serif';
    const dateStr = new Date().toLocaleString(appState.currentLanguage === 'en' ? 'en-US' : 'hi-IN');
    ctx.fillText(`Generated: ${dateStr}`, 60, 205);

    // 5. Draw the Main Metrics Cards (Left column)
    // Quality Score Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    
    drawRoundedRect(ctx, 60, 230, 250, 120, 8);
    ctx.fillStyle = '#688a81';
    ctx.font = '13px Outfit, sans-serif';
    ctx.fillText(t.qualityScore.toUpperCase(), 80, 260);
    
    ctx.fillStyle = '#f39c12';
    ctx.font = 'bold 38px Outfit, sans-serif';
    const scoreVal = document.getElementById('quality-val').innerText;
    ctx.fillText(scoreVal, 80, 310);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Outfit, sans-serif';
    const gradeBadgeText = elements.qualityBadge.innerText;
    ctx.fillText(gradeBadgeText, 160, 305);

    // Moisture Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    drawRoundedRect(ctx, 330, 230, 240, 120, 8);
    ctx.fillStyle = '#688a81';
    ctx.font = '13px Outfit, sans-serif';
    ctx.fillText(t.lblMoistureVal.toUpperCase(), 350, 260);
    
    ctx.fillStyle = '#3498db';
    ctx.font = 'bold 28px Outfit, sans-serif';
    const moistureValue = document.getElementById('moisture-val').innerText;
    ctx.fillText(moistureValue, 350, 310);

    const moistureStatus = elements.moistureStatusBadge.innerText;
    ctx.fillStyle = moistureStatus === 'SAFE' ? '#2ecc71' : (moistureStatus === 'WARN' ? '#f1c40f' : '#e74c3c');
    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.fillText(moistureStatus, 450, 305);

    // Storage Age Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    drawRoundedRect(ctx, 60, 370, 510, 110, 8);
    ctx.fillStyle = '#688a81';
    ctx.font = '13px Outfit, sans-serif';
    ctx.fillText(t.lblAgeVal.toUpperCase(), 80, 400);

    ctx.fillStyle = '#e67e22';
    ctx.font = 'bold 28px Outfit, sans-serif';
    const ageValue = document.getElementById('age-val').innerText;
    ctx.fillText(ageValue, 80, 450);

    // Variety if visible
    if (elements.varietyCard.style.display !== 'none') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        drawRoundedRect(ctx, 60, 500, 510, 80, 8);
        ctx.fillStyle = '#688a81';
        ctx.font = '13px Outfit, sans-serif';
        ctx.fillText(t.lblVarietyVal.toUpperCase(), 80, 525);
        ctx.fillStyle = '#f39c12';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.fillText(elements.varietyVal.innerText, 80, 555);
    }

    // 6. Draw Grain Breakdown Chart & Legend
    const startY = elements.varietyCard.style.display !== 'none' ? 600 : 520;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText(t.defectsBreakdownTitle.toUpperCase(), 60, startY);

    const premiumText = elements.valLegPremium.innerText;
    const brokenText = elements.valLegBroken.innerText;
    const discoloredText = elements.valLegDiscolored.innerText;
    const totalGrains = elements.totalGrainCount.innerText;

    // Premium legend bullet
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath(); ctx.arc(70, startY + 30, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#a2b8b2'; ctx.font = '14px Outfit, sans-serif';
    ctx.fillText(`${t.lblLegPremium}: ${premiumText}`, 90, startY + 35);

    // Broken legend bullet
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath(); ctx.arc(70, startY + 60, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#a2b8b2';
    ctx.fillText(`${t.lblLegBroken}: ${brokenText}`, 90, startY + 65);

    // Discolored legend bullet
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.arc(70, startY + 90, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#a2b8b2';
    ctx.fillText(`${t.lblLegDiscolored}: ${discoloredText}`, 90, startY + 95);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Total Counted: ${totalGrains} grains`, 350, startY + 35);

    // 7. Draw the Storage Advisory Box
    ctx.fillStyle = 'rgba(243, 156, 18, 0.05)';
    ctx.strokeStyle = 'rgba(243, 156, 18, 0.2)';
    drawRoundedRect(ctx, 600, 520, 540, 200, 8);

    ctx.fillStyle = '#f39c12';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText(t.advisoryTitle.toUpperCase(), 620, 555);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Outfit, sans-serif';
    const advisoryText = elements.advisoryText.innerText;
    wrapText(ctx, advisoryText, 620, 590, 500, 22);

    // 8. Draw the Grain Image Preview with CV analysis dots!
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx, 600, 130, 540, 360, 8);
    
    try {
        ctx.drawImage(elements.analysisCanvas, 610, 140, 520, 340);
    } catch (e) {
        console.error("Failed to render canvas preview", e);
    }

    // 9. Download as Image
    const link = document.createElement('a');
    link.download = `CerealsAI_Quality_Report_${appState.selectedGrain}.png`;
    link.href = rCanvas.toDataURL('image/png');
    link.click();
}

// Rounded rectangle helper
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Simple text wrapping helper
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, currentY);
}

// --- Initialize Event Bindings ---
function initializeEvents() {
    const t = () => translations[appState.currentLanguage];
    
    elements.langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
    
    elements.inputTemp.addEventListener('input', (e) => {
        appState.temperature = parseInt(e.target.value);
        elements.valTemp.innerText = `${appState.temperature}°C`;
        if (appState.analysisCompleted) {
            updateUIWithResults();
        }
    });
    
    elements.inputRh.addEventListener('input', (e) => {
        appState.humidity = parseInt(e.target.value);
        elements.valRh.innerText = `${appState.humidity}%`;
        if (appState.analysisCompleted) {
            updateUIWithResults();
        }
    });
    
    elements.grainTypeSelect.addEventListener('change', (e) => {
        appState.selectedGrain = e.target.value;
        updateSampleBtnText();
        
        if (appState.analysisCompleted) {
            updateUIWithResults();
        }
    });
    
    // Try Multigrain Sample Button - Loads correct generated grain sample asset!
    elements.sampleBtn.addEventListener('click', () => {
        stopCamera();
        setStatus('idle', t().statusLoading);
        elements.fallbackMessage.style.display = 'none';
        
        // Dynamically choose sample file path based on selection
        let assetName = 'rice_sample.png';
        switch(appState.selectedGrain) {
            case 'rice':    assetName = 'rice_sample.png'; break;
            case 'wheat':   assetName = 'wheat_sample.png'; break;
            case 'corn':    assetName = 'corn_sample.png'; break;
            case 'barley':  assetName = 'barley_sample.png'; break;
            case 'lentils': assetName = 'lentil_sample.png'; break;
        }
        
        elements.sourceImage.src = `assets/${assetName}`;
        elements.sourceImage.onload = () => {
            elements.analysisCanvas.style.display = 'block';
            const ctx = elements.analysisCanvas.getContext('2d');
            elements.analysisCanvas.width = elements.sourceImage.naturalWidth;
            elements.analysisCanvas.height = elements.sourceImage.naturalHeight;
            ctx.drawImage(elements.sourceImage, 0, 0);
            
            appState.sourceImageLoaded = true;
            appState.analysisCompleted = false;
            elements.btnAnalyze.disabled = false;
            setStatus('idle', t().statusReady);
        };
    });
    
    elements.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.dropzone.classList.add('dragover');
    });
    
    elements.dropzone.addEventListener('dragleave', () => {
        elements.dropzone.classList.remove('dragover');
    });
    
    elements.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.dropzone.classList.remove('dragover');
        stopCamera();
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            loadUploadedFile(e.dataTransfer.files[0]);
        }
    });
    
    elements.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            loadUploadedFile(e.target.files[0]);
        }
    });
    
    elements.dropzone.addEventListener('click', () => {
        elements.fileInput.click();
    });
    
    elements.cameraBtn.addEventListener('click', () => {
        startCamera();
    });
    
    elements.cameraCaptureBtn.addEventListener('click', () => {
        captureCameraFrame();
    });
    
    // Core Grain analysis execution
    elements.btnAnalyze.addEventListener('click', () => {
        if (!appState.sourceImageLoaded) return;
        
        setStatus('processing', t().statusProcessing);
        elements.btnAnalyze.disabled = true;
        elements.scanLine.style.display = 'block'; 
        
        setTimeout(async () => {
            appState.detectedGrains = await performImageAnalysis();
            appState.analysisCompleted = true;
            elements.scanLine.style.display = 'none'; 
            elements.btnAnalyze.disabled = false;
            
            setStatus('success', t().statusSuccess);
            updateUIWithResults();
            saveScanToHistory();
        }, 2200);
    });
    
    elements.analysisCanvas.addEventListener('mousemove', handleCanvasMouseMove);
    elements.analysisCanvas.addEventListener('mouseleave', () => {
        elements.grainTooltip.style.display = 'none';
    });
    
    elements.ttsBtn.addEventListener('click', () => {
        speakReport();
    });
    
    elements.audioStopBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            elements.audioWidget.style.display = 'none';
        }
    });
    
    elements.reportBtn.addEventListener('click', () => {
        exportReportAsImage();
    });
    
    elements.historyToggleBtn.addEventListener('click', () => {
        const isOpen = elements.historyDrawer.classList.contains('open');
        if (isOpen) {
            elements.historyDrawer.classList.remove('open');
            elements.historyDrawer.setAttribute('aria-hidden', 'true');
        } else {
            loadHistory();
            elements.historyDrawer.classList.add('open');
            elements.historyDrawer.setAttribute('aria-hidden', 'false');
        }
    });
    
    elements.historyCloseBtn.addEventListener('click', () => {
        elements.historyDrawer.classList.remove('open');
        elements.historyDrawer.setAttribute('aria-hidden', 'true');
    });
    
    elements.clearHistoryBtn.addEventListener('click', () => {
        if (confirm(appState.currentLanguage === 'en' ? "Clear all scan logs?" : "क्या आप सारा इतिहास मिटाना चाहते हैं?")) {
            clearAllHistory();
        }
    });
}

function loadUploadedFile(file) {
    const t = translations[appState.currentLanguage];
    setStatus('idle', t.statusLoading);
    elements.fallbackMessage.style.display = 'none';
    
    const reader = new FileReader();
    reader.onload = (e) => {
        elements.sourceImage.src = e.target.result;
        elements.sourceImage.onload = () => {
            elements.analysisCanvas.style.display = 'block';
            const ctx = elements.analysisCanvas.getContext('2d');
            elements.analysisCanvas.width = elements.sourceImage.naturalWidth;
            elements.analysisCanvas.height = elements.sourceImage.naturalHeight;
            ctx.drawImage(elements.sourceImage, 0, 0);
            
            appState.sourceImageLoaded = true;
            appState.analysisCompleted = false;
            elements.btnAnalyze.disabled = false;
            setStatus('idle', t.statusReady);
        };
    };
    reader.readAsDataURL(file);
}

// --- Real-time Weather API integration ---
const WeatherAPI = {
    // Default fallback coordinates (New Delhi, India)
    lat: 28.6139,
    lon: 77.2090,
    temp: 25,
    rh: 65,
    locationName: "New Delhi, IN",

    async init() {
        const syncBtn = document.getElementById('weather-sync-btn');
        
        // Listen for sync click
        if (syncBtn) {
            syncBtn.addEventListener('click', () => this.syncToSliders());
        }

        // Try getting user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                    
                    // Fetch city name from reverse geocoding (OpenStreetMap Nominatim)
                    try {
                        const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.lat}&lon=${this.lon}&zoom=10`;
                        const res = await fetch(geoUrl, {
                            headers: { 'Accept-Language': 'en' }
                        });
                        const data = await res.json();
                        const city = data.address.city || data.address.town || data.address.state || "Local Area";
                        const country = data.address.country_code ? data.address.country_code.toUpperCase() : "IN";
                        this.locationName = `${city}, ${country}`;
                    } catch (e) {
                        this.locationName = `${this.lat.toFixed(2)}°N, ${this.lon.toFixed(2)}°E`;
                    }
                    
                    await this.fetchWeatherData();
                },
                async (error) => {
                    console.log("Geolocation error or denied. Using default location.", error);
                    await this.fetchWeatherData();
                }
            );
        } else {
            await this.fetchWeatherData();
        }
    },

    async fetchWeatherData() {
        const tempText = document.getElementById('weather-temp-text');
        const rhText = document.getElementById('weather-rh-text');
        const locText = document.getElementById('weather-loc-text');
        const syncBtn = document.getElementById('weather-sync-btn');

        try {
            // Fetch weather using free Open-Meteo API (No Key Required)
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&current=temperature_2m,relative_humidity_2m`;
            const res = await fetch(weatherUrl);
            const data = await res.json();

            if (data && data.current) {
                this.temp = Math.round(data.current.temperature_2m);
                this.rh = Math.round(data.current.relative_humidity_2m);

                // Update UI elements
                if (tempText) tempText.innerHTML = `<i class="fa-solid fa-temperature-half"></i> ${this.temp}°C`;
                if (rhText) rhText.innerHTML = `<i class="fa-solid fa-droplet"></i> ${this.rh}%`;
                if (locText) locText.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.locationName}`;
                if (syncBtn) {
                    syncBtn.disabled = false;
                    syncBtn.title = "Sync local weather to sliders";
                }
            }
        } catch (e) {
            console.error("Error fetching weather data:", e);
            if (locText) locText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Weather Offline`;
        }
    },

    syncToSliders() {
        // Update appState
        appState.temperature = this.temp;
        appState.humidity = this.rh;

        // Update Slider inputs in UI
        const inputTemp = document.getElementById('input-temp');
        const inputRh = document.getElementById('input-rh');
        const valTemp = document.getElementById('val-temp');
        const valRh = document.getElementById('val-rh');

        if (inputTemp) {
            inputTemp.value = this.temp;
            if (valTemp) valTemp.innerText = `${this.temp}°C`;
        }
        if (inputRh) {
            inputRh.value = this.rh;
            if (valRh) valRh.innerText = `${this.rh}%`;
        }

        // Trigger analysis recalculation if already completed
        if (appState.analysisCompleted) {
            updateUIWithResults();
        }

        // Visual feedback on the Sync button
        const syncBtn = document.getElementById('weather-sync-btn');
        if (syncBtn) {
            const originalHtml = syncBtn.innerHTML;
            syncBtn.innerHTML = `<i class="fa-solid fa-check"></i> Synced`;
            syncBtn.style.background = '#2ecc71';
            setTimeout(() => {
                syncBtn.innerHTML = originalHtml;
                syncBtn.style.background = '';
            }, 1500);
        }
    }
};

// Window Load setup
window.addEventListener('load', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
    
    setLanguage('en');
    initializeEvents();
    loadHistory();
    
    // Initialize Interactive Background Canvas Particle System
    ParticlesBG.init();

    // Initialize Real-time Weather API
    WeatherAPI.init();
});
