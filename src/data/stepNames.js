/**
 * @file src/data/stepNames.js
 * @description Centralized Database Registry (V7 Schema) for the Lata Yog Guide.
 * Holds names, categories, pacing criteria, alerts, and placeholders for audio/video paths.
 */

export const stepDatabase = {
  // ==========================================
  // 1. WARM UPS & JOGGING
  // ==========================================
  "prarthana": { 
    names: { 
      devanagari: "प्रार्थना", // Hindi script text string
      roman: "Prarthana",       // Phonetic transliteration name
      english: "Prayer"         // English translation display name 
    },
    category: "Warm Up",        // Grouping taxonomy filter
    type: "time",               // Pacing logic rule: "time" or "reps"
    duration: 60,               // Active countdown length in seconds (used if type === "time")
    reps: null,                 // Repetition loops count (used if type === "reps")
    timePerRep: null,           // Pacing length per repeat. Defaults to 5s if null
    prepTime: 5,                // Transition count buffer in seconds before clock engages
    hasSides: false,            // Flag for asymmetrical form duplication
    breathPattern: "",          // Respiratory alignment instruction text strings
    benefits: "",               // Therapeutic parameters for Text-to-Speech engines
    caution: "",                // Safety text warnings (triggers amber notice box if populated)
    audioUrl: "",               // Path targeting custom MP3 data tracks
    videoUrl: "",               // Swaps display box to embedded player if populated
    pictureUrl: ""              // Asset pathway override string
  },

  "yogic-jogging-position-1": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 1", roman: "Yogic Jogging Sthiti 1", english: "Yogic Jogging Position 1" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Do not hyperextend the knees.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-2": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 2", roman: "Yogic Jogging Sthiti 2", english: "Yogic Jogging Position 2" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-3": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 3", roman: "Yogic Jogging Sthiti 3", english: "Yogic Jogging Position 3" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-4": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 4", roman: "Yogic Jogging Sthiti 4", english: "Yogic Jogging Position 4" },
    category: "Warm Up", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Coordinate breathing with the leg movement.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-5": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 5", roman: "Yogic Jogging Sthiti 5", english: "Yogic Jogging Position 5" },
    category: "Warm Up", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 2. KRIYAS
  // ==========================================
  "hasta-sanchalan-kriya": { 
    names: { devanagari: "हस्त संचालन क्रिया", roman: "Hasta Sanchalan Kriya", english: "Hand Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid jerky shoulder movements.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "purna-hasta-sanchalan-kriya": { 
    names: { devanagari: "पूर्ण हस्त संचालन क्रिया", roman: "Purna Hasta Sanchalan Kriya", english: "Full Arm Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "janu-sanchalan-kriya": { 
    names: { devanagari: "जानु संचालन क्रिया", roman: "Janu Sanchalan Kriya", english: "Knee Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "janu-vikasak-kriya": { 
    names: { devanagari: "जानु विकासक क्रिया", roman: "Janu Vikasak Kriya", english: "Knee Strengthening Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uru-vikasak-kriya-1": { 
    names: { devanagari: "ऊरु विकासक क्रिया - 1", roman: "Uru Vikasak Kriya - 1", english: "Thigh Strengthening Practice 1" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uru-vikasak-kriya-2": { 
    names: { devanagari: "ऊरु विकासक क्रिया - 2", roman: "Uru Vikasak Kriya - 2", english: "Thigh Strengthening Practice 2" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "vaksha-vikasak-kriya": { 
    names: { devanagari: "वक्ष विकासक क्रिया", roman: "Vaksha Vikasak Kriya", english: "Chest Expansion Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "trikonasana-kriya": { 
    names: { devanagari: "त्रिकोणासन क्रिया", roman: "Trikonasana Kriya", english: "Triangle Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "konasana-kriya": { 
    names: { devanagari: "कोणासन क्रिया", roman: "Konasana Kriya", english: "Angle Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hastottanasana-paadhastasana-kriya": { 
    names: { devanagari: "हस्तोत्तानासन-पादहस्तासन क्रिया", roman: "Hastottanasana-Padahastasana Kriya", english: "Raised Arms to Hand-to-Foot Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chalit-pad-hastasana-kriya": { 
    names: { devanagari: "चलित पाद हस्तासन क्रिया", roman: "Chalit Pad Hastasana Kriya", english: "Dynamic Foot-Hand Pose Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yog-nrutyasana-kriya": { 
    names: { devanagari: "योग नृत्यासन क्रिया", roman: "Yog Nrutyasana Kriya", english: "Yogic Dance Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "agnisar-kriya": { 
    names: { devanagari: "अग्निसार क्रिया", roman: "Agnisar Kriya", english: "Abdominal Fire Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Do on an empty stomach.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 3. SPECIALTY SEQUENCES & DRILLS
  // ==========================================
  "surya-namaskar": { 
    names: { devanagari: "सूर्य नमस्कार", roman: "Surya Namaskar", english: "Sun Salutation" },
    category: "Sequence", type: "reps", duration: null, reps: 5, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Synchronize breath with movement. Avoid if you have high blood pressure.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "mishra-dand": { 
    names: { devanagari: "मिश्र दंड", roman: "Mishra Dand", english: "Mixed Staff / Dynamic Push-up Practice" },
    category: "Drill", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "easy-breathing": { 
    names: { devanagari: "सरल श्वसन", roman: "Saral Shwasan", english: "Easy Breathing" },
    category: "Pranayama", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 4. PRANAYAMA
  // ==========================================
  "bhastrika-pranayama": { 
    names: { devanagari: "भस्त्रिका प्राणायाम", roman: "Bhastrika Pranayam", english: "Bellows Breath" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid if you have high blood pressure or heart conditions.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kapal-bhati": { 
    names: { devanagari: "कपालभाति प्राणायाम", roman: "Kapal Bhati Pranayam", english: "Skull-Shining Breath" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid for 6–12 months after surgery. Hypertension users should practice gently.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "anulom-vilom": { 
    names: { devanagari: "अनुलोम विलोम", roman: "Anulom Vilom", english: "Alternate Nostril Breathing" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bahya-pranayama": { 
    names: { devanagari: "बाह्य प्राणायाम", roman: "Bahya Pranayam", english: "External Breath Retention" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ujjayi-pranayama": { 
    names: { devanagari: "उज्जायी प्राणायाम", roman: "Ujjayi Pranayam", english: "Victorious Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bhramari": { 
    names: { devanagari: "भ्रामरी प्राणायाम", roman: "Bhramari Pranayam", english: "Humming Bee Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "udgeeth-pranayama": { 
    names: { devanagari: "उद्गीथ प्राणायाम", roman: "Udgeeth Pranayam", english: "Om Chanting Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pranav-pranayama": { 
    names: { devanagari: "प्रणव प्राणायाम", roman: "Pranav Pranayam", english: "Om / Pranav Meditation Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "om-pranav": { 
    names: { devanagari: "ॐ प्रणव", roman: "Om Pranav", english: "Om Chanting" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "diaphragmatic-breath": { 
    names: { devanagari: "उदर श्वसन", roman: "Udar Shwasan", english: "Diaphragmatic Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 5. ASANAS
  // ==========================================
  "makarasana": { 
    names: { devanagari: "मकरासन", roman: "Makarasan", english: "Crocodile Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-bhujangasana": { 
    names: { devanagari: "अर्ध भुजंगासन", roman: "Ardha Bhujangasan", english: "Half Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "purna-bhujangasana": { 
    names: { devanagari: "पूर्ण भुजंगासन", roman: "Purna Bhujangasan", english: "Full Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tiryak-bhujangasana": { 
    names: { devanagari: "तिर्यक भुजंगासन", roman: "Tiryak Bhujangasan", english: "Twisting Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "saral-bhujangasana": { 
    names: { devanagari: "सरल भुजंगासन", roman: "Saral Bhujangasan", english: "Simple Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shalabhasana": { 
    names: { devanagari: "शलभासन", roman: "Shalabhasan", english: "Locust Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "dhanurasana": { 
    names: { devanagari: "धनुरासन", roman: "Dhanurasan", english: "Bow Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bal-vishram-asana": { 
    names: { devanagari: "बाल विश्राम आसन", roman: "Bal Vishram Asan", english: "Child Rest Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "markat-asana": { 
    names: { devanagari: "मर्कटासन", roman: "Markat Asan", english: "Monkey Pose / Supine Spinal Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uttanapadasana": { 
    names: { devanagari: "उत्तानपादासन", roman: "Uttanapadasan", english: "Raised Leg Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Support lower back if needed.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "naukasana": { 
    names: { devanagari: "नौकासन", roman: "Naukasan", english: "Boat Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ekapada-angushtha-nasa-sparshasana": { 
    names: { devanagari: "एकपाद अंगुष्ठ नासिका स्पर्शासन", roman: "Ekapada Angushtha Nasa Sparshasan", english: "One-Leg Toe-to-Nose Touch Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pawanmuktasana": { 
    names: { devanagari: "पवनमुक्तासन", roman: "Pawanmuktasan", english: "Wind-Relieving Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-halasana": { 
    names: { devanagari: "अर्ध हलासन", roman: "Ardha Halasan", english: "Half Plough Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "padavrittasana": { 
    names: { devanagari: "पादवृत्तासन", roman: "Padavrittasan", english: "Leg Rotation Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "dwichakrikasana": { 
    names: { devanagari: "द्विचक्रिकासन", roman: "Dwichakrikasan", english: "Bicycle Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kandharasana": { 
    names: { devanagari: "कंधरासन", roman: "Kandharasan", english: "Shoulder Pose / Bridge-like Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "savasana-yog-nidra": { 
    names: { devanagari: "शवासन / योग निद्रा", roman: "Savasan / Yog Nidra", english: "Corpse Pose / Yogic Sleep" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "mandukasana": { 
    names: { devanagari: "मंडूकासन", roman: "Mandukasan", english: "Frog Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shashankasana": { 
    names: { devanagari: "शशांकासन", roman: "Shashankasan", english: "Hare Pose / Child-like Forward Bend" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "gomukhasana": { 
    names: { devanagari: "गोमुखासन", roman: "Gomukhasan", english: "Cow Face Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "vakrasana": { 
    names: { devanagari: "वक्रासन", roman: "Vakrasan", english: "Twisted Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-chandrasana": { 
    names: { devanagari: "अर्ध चंद्रासन", roman: "Ardha Chandrasan", english: "Half Moon Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ustrasana": { 
    names: { devanagari: "उष्ट्रासन", roman: "Ustrasan", english: "Camel Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "marjarasana": { 
    names: { devanagari: "मार्जरासन", roman: "Marjarasan", english: "Cat Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "sthit-konasana": { 
    names: { devanagari: "स्थित कोणासन", roman: "Sthit Konasan", english: "Standing Angle Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "titli-asana": { 
    names: { devanagari: "तितली आसन", roman: "Titli Asan", english: "Butterfly Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "simhasana": { 
    names: { devanagari: "सिंहासन", roman: "Simhasan", english: "Lion Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hasyasana": { 
    names: { devanagari: "हास्यासन", roman: "Hasyasan", english: "Laughter Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cat-cow": { 
    names: { devanagari: "मार्जरी-बितिलासन", roman: "Marjari-Bitilasan", english: "Cat-Cow" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-forward-fold": { 
    names: { devanagari: "पश्चिमोत्तानासन", roman: "Paschimottanasan", english: "Seated Forward Fold" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cobra-pose": { 
    names: { devanagari: "भुजंगासन", roman: "Bhujangasan", english: "Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bridge-pose": { 
    names: { devanagari: "सेतु बंधासन", roman: "Setu Bandhasan", english: "Bridge Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chair-pose-pulses": { 
    names: { devanagari: "उत्कटासन पल्स", roman: "Utkatasan Pulses", english: "Chair Pose Pulses" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "plank-hold": { 
    names: { devanagari: "फलकासन धारण", roman: "Phalakasan Hold", english: "Plank Hold" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "high-lunge": { 
    names: { devanagari: "अश्व संचालनासन", roman: "Ashwa Sanchalanasan", english: "High Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "childs-pose": { 
    names: { devanagari: "बालासन", roman: "Balasan", english: "Child's Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "sphinx-pose": { 
    names: { devanagari: "सालंब भुजंगासन", roman: "Salamba Bhujangasan", english: "Sphinx Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "knees-to-chest": { 
    names: { devanagari: "अपानासन", roman: "Apanasan", english: "Knees to Chest" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supine-twist": { 
    names: { devanagari: "सुप्त मत्स्येन्द्रासन", roman: "Supta Matsyendrasan", english: "Supine Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supported-chair-pose": { 
    names: { devanagari: "सहायक उत्कटासन", roman: "Sahayak Utkatasan", english: "Supported Chair Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "legs-up-the-wall": { 
    names: { devanagari: "विपरीत करणी", roman: "Viparita Karani", english: "Legs Up the Wall" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "thread-the-needle": { 
    names: { devanagari: "सूची सूत्रासन", roman: "Suchi Sutrasan", english: "Thread the Needle" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supported-fish-pose": { 
    names: { devanagari: "सहायक मत्स्यासन", roman: "Sahayak Matsyasan", english: "Supported Fish Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "downward-dog": { 
    names: { devanagari: "अधोमुख श्वानासन", roman: "Adho Mukha Shvanasan", english: "Downward Dog" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "low-lunge": { 
    names: { devanagari: "अंजनेयासन", roman: "Anjaneyasan", english: "Low Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "warrior-ii": { 
    names: { devanagari: "वीरभद्रासन 2", roman: "Virabhadrasan II", english: "Warrior II" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tree-pose": { 
    names: { devanagari: "वृक्षासन", roman: "Vrikshasan", english: "Tree Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cobra-to-childs-pose": { 
    names: { devanagari: "भुजंगासन से बालासन", roman: "Bhujangasan to Balasan", english: "Cobra to Child's Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "crescent-lunge": { 
    names: { devanagari: "अंजनेयासन", roman: "Anjaneyasan", english: "Crescent Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "warrior-iii": { 
    names: { devanagari: "वीरभद्रासन 3", roman: "Virabhadrasan III", english: "Warrior III" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "happy-baby": { 
    names: { devanagari: "आनंद बालासन", roman: "Ananda Balasan", english: "Happy Baby" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-side-stretch": { 
    names: { devanagari: "बैठकर पार्श्व खिंचाव", roman: "Baithkar Parshva Khinchav", english: "Seated Side Stretch" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-twist": { 
    names: { devanagari: "बैठकर वक्रासन", roman: "Baithkar Vakrasan", english: "Seated Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "figure-four-stretch": { 
    names: { devanagari: "सूचिरंध्रासन", roman: "Suchirandhrasan", english: "Figure Four Stretch" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-pranamasana": { 
    names: { devanagari: "प्रणामासन", roman: "Pranamasan", english: "Prayer Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-hastauttanasana": { 
    names: { devanagari: "हस्तोत्तानासन", roman: "Hastauttanasan", english: "Raised Arms Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-hastapadasana": { 
    names: { devanagari: "हस्तपादासन", roman: "Hastapadasan", english: "Standing Forward Bend" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-ashwa-sanchalanasana": { 
    names: { devanagari: "अश्व संचालनासन", roman: "Ashwa Sanchalanasan", english: "Equestrian Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-dandasana": { 
    names: { devanagari: "दंडासन", roman: "Dandasan", english: "Stick / Plank Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-ashtanga-namaskara": { 
    names: { devanagari: "अष्टांग नमस्कार", roman: "Ashtanga Namaskar", english: "Salute with Eight Parts" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-bhujangasana": { 
    names: { devanagari: "भुजंगासन", roman: "Bhujangasan", english: "Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-parvatasana": { 
    names: { devanagari: "पर्वतासन", roman: "Parvatasan", english: "Mountain Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-tadasana": { 
    names: { devanagari: "ताड़ासन", roman: "Tadasan", english: "Standing Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 6. MISC EXERCISES & ROTATIONS
  // ==========================================
  "hasta-manibandha-kurpara-skandha-chakra": { 
    names: { devanagari: "हस्त-मणिबंध-कूर्पर-स्कंध चक्र", roman: "Hasta-Manibandha-Kurpara-Skandha Chakra", english: "Hand, Wrist, Elbow & Shoulder Rotation" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "greeva-sanchalana-3-types": { 
    names: { devanagari: "ग्रीवा संचालन - 3 प्रकार", roman: "Greeva Sanchalan - 3 Types", english: "Neck Rotation - 3 Types" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "greeva-anti-pressure": { 
    names: { devanagari: "ग्रीवा एंटी-प्रेशर", roman: "Greeva Anti-Pressure", english: "Neck Anti-Pressure" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "netra-chakra": { 
  
  /**
 * @file src/data/stepNames.js
 * @description Centralized Database Registry (V7 Schema) for the Lata Yog Guide.
 * Holds names, categories, pacing criteria, alerts, and placeholders for audio/video paths.
 */

export const stepDatabase = {
  // ==========================================
  // 1. WARM UPS & JOGGING
  // ==========================================
  "prarthana": { 
    names: { 
      devanagari: "प्रार्थना", // Hindi script text string
      roman: "Prarthana",       // Phonetic transliteration name
      english: "Prayer"         // English translation display name 
    },
    category: "Warm Up",        // Grouping taxonomy filter
    type: "time",               // Pacing logic rule: "time" or "reps"
    duration: 60,               // Active countdown length in seconds (used if type === "time")
    reps: null,                 // Repetition loops count (used if type === "reps")
    timePerRep: null,           // Pacing length per repeat. Defaults to 5s if null
    prepTime: 5,                // Transition count buffer in seconds before clock engages
    hasSides: false,            // Flag for asymmetrical form duplication
    breathPattern: "",          // Respiratory alignment instruction text strings
    benefits: "",               // Therapeutic parameters for Text-to-Speech engines
    caution: "",                // Safety text warnings (triggers amber notice box if populated)
    audioUrl: "",               // Path targeting custom MP3 data tracks
    videoUrl: "",               // Swaps display box to embedded player if populated
    pictureUrl: ""              // Asset pathway override string
  },

  "yogic-jogging-position-1": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 1", roman: "Yogic Jogging Sthiti 1", english: "Yogic Jogging Position 1" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Do not hyperextend the knees.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-2": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 2", roman: "Yogic Jogging Sthiti 2", english: "Yogic Jogging Position 2" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-3": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 3", roman: "Yogic Jogging Sthiti 3", english: "Yogic Jogging Position 3" },
    category: "Warm Up", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-4": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 4", roman: "Yogic Jogging Sthiti 4", english: "Yogic Jogging Position 4" },
    category: "Warm Up", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Coordinate breathing with the leg movement.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yogic-jogging-position-5": { 
    names: { devanagari: "योगिक जॉगिंग स्थिति 5", roman: "Yogic Jogging Sthiti 5", english: "Yogic Jogging Position 5" },
    category: "Warm Up", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 2. KRIYAS
  // ==========================================
  "hasta-sanchalan-kriya": { 
    names: { devanagari: "हस्त संचालन क्रिया", roman: "Hasta Sanchalan Kriya", english: "Hand Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid jerky shoulder movements.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "purna-hasta-sanchalan-kriya": { 
    names: { devanagari: "पूर्ण हस्त संचालन क्रिया", roman: "Purna Hasta Sanchalan Kriya", english: "Full Arm Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "janu-sanchalan-kriya": { 
    names: { devanagari: "जानु संचालन क्रिया", roman: "Janu Sanchalan Kriya", english: "Knee Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "janu-vikasak-kriya": { 
    names: { devanagari: "जानु विकासक क्रिया", roman: "Janu Vikasak Kriya", english: "Knee Strengthening Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uru-vikasak-kriya-1": { 
    names: { devanagari: "ऊरु विकासक क्रिया - 1", roman: "Uru Vikasak Kriya - 1", english: "Thigh Strengthening Practice 1" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uru-vikasak-kriya-2": { 
    names: { devanagari: "ऊरु विकासक क्रिया - 2", roman: "Uru Vikasak Kriya - 2", english: "Thigh Strengthening Practice 2" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "vaksha-vikasak-kriya": { 
    names: { devanagari: "वक्ष विकासक क्रिया", roman: "Vaksha Vikasak Kriya", english: "Chest Expansion Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "trikonasana-kriya": { 
    names: { devanagari: "त्रिकोणासन क्रिया", roman: "Trikonasana Kriya", english: "Triangle Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "konasana-kriya": { 
    names: { devanagari: "कोणासन क्रिया", roman: "Konasana Kriya", english: "Angle Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hastottanasana-paadhastasana-kriya": { 
    names: { devanagari: "हस्तोत्तानासन-पादहस्तासन क्रिया", roman: "Hastottanasana-Padahastasana Kriya", english: "Raised Arms to Hand-to-Foot Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chalit-pad-hastasana-kriya": { 
    names: { devanagari: "चलित पाद हस्तासन क्रिया", roman: "Chalit Pad Hastasana Kriya", english: "Dynamic Foot-Hand Pose Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "yog-nrutyasana-kriya": { 
    names: { devanagari: "योग नृत्यासन क्रिया", roman: "Yog Nrutyasana Kriya", english: "Yogic Dance Movement Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "agnisar-kriya": { 
    names: { devanagari: "अग्निसार क्रिया", roman: "Agnisar Kriya", english: "Abdominal Fire Practice" },
    category: "Kriya", type: "reps", duration: null, reps: 16, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Do on an empty stomach.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 3. SPECIALTY SEQUENCES & DRILLS
  // ==========================================
  "surya-namaskar": { 
    names: { devanagari: "सूर्य नमस्कार", roman: "Surya Namaskar", english: "Sun Salutation" },
    category: "Sequence", type: "reps", duration: null, reps: 5, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Synchronize breath with movement. Avoid if you have high blood pressure.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "mishra-dand": { 
    names: { devanagari: "मिश्र दंड", roman: "Mishra Dand", english: "Mixed Staff / Dynamic Push-up Practice" },
    category: "Drill", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "easy-breathing": { 
    names: { devanagari: "सरल श्वसन", roman: "Saral Shwasan", english: "Easy Breathing" },
    category: "Pranayama", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 4. PRANAYAMA
  // ==========================================
  "bhastrika-pranayama": { 
    names: { devanagari: "भस्त्रिका प्राणायाम", roman: "Bhastrika Pranayam", english: "Bellows Breath" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid if you have high blood pressure or heart conditions.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kapal-bhati": { 
    names: { devanagari: "कपालभाति प्राणायाम", roman: "Kapal Bhati Pranayam", english: "Skull-Shining Breath" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Avoid for 6–12 months after surgery. Hypertension users should practice gently.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "anulom-vilom": { 
    names: { devanagari: "अनुलोम विलोम", roman: "Anulom Vilom", english: "Alternate Nostril Breathing" },
    category: "Pranayama", type: "time", duration: 300, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bahya-pranayama": { 
    names: { devanagari: "बाह्य प्राणायाम", roman: "Bahya Pranayam", english: "External Breath Retention" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ujjayi-pranayama": { 
    names: { devanagari: "उज्जायी प्राणायाम", roman: "Ujjayi Pranayam", english: "Victorious Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bhramari": { 
    names: { devanagari: "भ्रामरी प्राणायाम", roman: "Bhramari Pranayam", english: "Humming Bee Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "udgeeth-pranayama": { 
    names: { devanagari: "उद्गीथ प्राणायाम", roman: "Udgeeth Pranayam", english: "Om Chanting Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pranav-pranayama": { 
    names: { devanagari: "प्रणव प्राणायाम", roman: "Pranav Pranayam", english: "Om / Pranav Meditation Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "om-pranav": { 
    names: { devanagari: "ॐ प्रणव", roman: "Om Pranav", english: "Om Chanting" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "diaphragmatic-breath": { 
    names: { devanagari: "उदर श्वसन", roman: "Udar Shwasan", english: "Diaphragmatic Breath" },
    category: "Pranayama", type: "reps", duration: null, reps: 3, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 5. ASANAS
  // ==========================================
  "makarasana": { 
    names: { devanagari: "मकरासन", roman: "Makarasan", english: "Crocodile Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-bhujangasana": { 
    names: { devanagari: "अर्ध भुजंगासन", roman: "Ardha Bhujangasan", english: "Half Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "purna-bhujangasana": { 
    names: { devanagari: "पूर्ण भुजंगासन", roman: "Purna Bhujangasan", english: "Full Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tiryak-bhujangasana": { 
    names: { devanagari: "तिर्यक भुजंगासन", roman: "Tiryak Bhujangasan", english: "Twisting Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "saral-bhujangasana": { 
    names: { devanagari: "सरल भुजंगासन", roman: "Saral Bhujangasan", english: "Simple Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shalabhasana": { 
    names: { devanagari: "शलभासन", roman: "Shalabhasan", english: "Locust Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "dhanurasana": { 
    names: { devanagari: "धनुरासन", roman: "Dhanurasan", english: "Bow Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bal-vishram-asana": { 
    names: { devanagari: "बाल विश्राम आसन", roman: "Bal Vishram Asan", english: "Child Rest Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "markat-asana": { 
    names: { devanagari: "मर्कटासन", roman: "Markat Asan", english: "Monkey Pose / Supine Spinal Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "uttanapadasana": { 
    names: { devanagari: "उत्तानपादासन", roman: "Uttanapadasan", english: "Raised Leg Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "Support lower back if needed.", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "naukasana": { 
    names: { devanagari: "नौकासन", roman: "Naukasan", english: "Boat Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ekapada-angushtha-nasa-sparshasana": { 
    names: { devanagari: "एकपाद अंगुष्ठ नासिका स्पर्शासन", roman: "Ekapada Angushtha Nasa Sparshasan", english: "One-Leg Toe-to-Nose Touch Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pawanmuktasana": { 
    names: { devanagari: "पवनमुक्तासन", roman: "Pawanmuktasan", english: "Wind-Relieving Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-halasana": { 
    names: { devanagari: "अर्ध हलासन", roman: "Ardha Halasan", english: "Half Plough Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "padavrittasana": { 
    names: { devanagari: "पादवृत्तासन", roman: "Padavrittasan", english: "Leg Rotation Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "dwichakrikasana": { 
    names: { devanagari: "द्विचक्रिकासन", roman: "Dwichakrikasan", english: "Bicycle Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kandharasana": { 
    names: { devanagari: "कंधरासन", roman: "Kandharasan", english: "Shoulder Pose / Bridge-like Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "savasana-yog-nidra": { 
    names: { devanagari: "शवासन / योग निद्रा", roman: "Savasan / Yog Nidra", english: "Corpse Pose / Yogic Sleep" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "mandukasana": { 
    names: { devanagari: "मंडूकासन", roman: "Mandukasan", english: "Frog Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shashankasana": { 
    names: { devanagari: "शशांकासन", roman: "Shashankasan", english: "Hare Pose / Child-like Forward Bend" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "gomukhasana": { 
    names: { devanagari: "गोमुखासन", roman: "Gomukhasan", english: "Cow Face Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "vakrasana": { 
    names: { devanagari: "वक्रासन", roman: "Vakrasan", english: "Twisted Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ardha-chandrasana": { 
    names: { devanagari: "अर्ध चंद्रासन", roman: "Ardha Chandrasan", english: "Half Moon Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ustrasana": { 
    names: { devanagari: "उष्ट्रासन", roman: "Ustrasan", english: "Camel Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "marjarasana": { 
    names: { devanagari: "मार्जरासन", roman: "Marjarasan", english: "Cat Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "sthit-konasana": { 
    names: { devanagari: "स्थित कोणासन", roman: "Sthit Konasan", english: "Standing Angle Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "titli-asana": { 
    names: { devanagari: "तितली आसन", roman: "Titli Asan", english: "Butterfly Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "simhasana": { 
    names: { devanagari: "सिंहासन", roman: "Simhasan", english: "Lion Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hasyasana": { 
    names: { devanagari: "हास्यासन", roman: "Hasyasan", english: "Laughter Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cat-cow": { 
    names: { devanagari: "मार्जरी-बितिलासन", roman: "Marjari-Bitilasan", english: "Cat-Cow" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-forward-fold": { 
    names: { devanagari: "पश्चिमोत्तानासन", roman: "Paschimottanasan", english: "Seated Forward Fold" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cobra-pose": { 
    names: { devanagari: "भुजंगासन", roman: "Bhujangasan", english: "Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "bridge-pose": { 
    names: { devanagari: "सेतु बंधासन", roman: "Setu Bandhasan", english: "Bridge Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chair-pose-pulses": { 
    names: { devanagari: "उत्कटासन पल्स", roman: "Utkatasan Pulses", english: "Chair Pose Pulses" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "plank-hold": { 
    names: { devanagari: "फलकासन धारण", roman: "Phalakasan Hold", english: "Plank Hold" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "high-lunge": { 
    names: { devanagari: "अश्व संचालनासन", roman: "Ashwa Sanchalanasan", english: "High Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "childs-pose": { 
    names: { devanagari: "बालासन", roman: "Balasan", english: "Child's Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "sphinx-pose": { 
    names: { devanagari: "सालंब भुजंगासन", roman: "Salamba Bhujangasan", english: "Sphinx Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "knees-to-chest": { 
    names: { devanagari: "अपानासन", roman: "Apanasan", english: "Knees to Chest" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supine-twist": { 
    names: { devanagari: "सुप्त मत्स्येन्द्रासन", roman: "Supta Matsyendrasan", english: "Supine Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supported-chair-pose": { 
    names: { devanagari: "सहायक उत्कटासन", roman: "Sahayak Utkatasan", english: "Supported Chair Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "legs-up-the-wall": { 
    names: { devanagari: "विपरीत करणी", roman: "Viparita Karani", english: "Legs Up the Wall" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "thread-the-needle": { 
    names: { devanagari: "सूची सूत्रासन", roman: "Suchi Sutrasan", english: "Thread the Needle" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "supported-fish-pose": { 
    names: { devanagari: "सहायक मत्स्यासन", roman: "Sahayak Matsyasan", english: "Supported Fish Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "downward-dog": { 
    names: { devanagari: "अधोमुख श्वानासन", roman: "Adho Mukha Shvanasan", english: "Downward Dog" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "low-lunge": { 
    names: { devanagari: "अंजनेयासन", roman: "Anjaneyasan", english: "Low Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "warrior-ii": { 
    names: { devanagari: "वीरभद्रासन 2", roman: "Virabhadrasan II", english: "Warrior II" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tree-pose": { 
    names: { devanagari: "वृक्षासन", roman: "Vrikshasan", english: "Tree Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "cobra-to-childs-pose": { 
    names: { devanagari: "भुजंगासन से बालासन", roman: "Bhujangasan to Balasan", english: "Cobra to Child's Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "crescent-lunge": { 
    names: { devanagari: "अंजनेयासन", roman: "Anjaneyasan", english: "Crescent Lunge" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "warrior-iii": { 
    names: { devanagari: "वीरभद्रासन 3", roman: "Virabhadrasan III", english: "Warrior III" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "happy-baby": { 
    names: { devanagari: "आनंद बालासन", roman: "Ananda Balasan", english: "Happy Baby" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-side-stretch": { 
    names: { devanagari: "बैठकर पार्श्व खिंचाव", roman: "Baithkar Parshva Khinchav", english: "Seated Side Stretch" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "seated-twist": { 
    names: { devanagari: "बैठकर वक्रासन", roman: "Baithkar Vakrasan", english: "Seated Twist" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "figure-four-stretch": { 
    names: { devanagari: "सूचिरंध्रासन", roman: "Suchirandhrasan", english: "Figure Four Stretch" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-pranamasana": { 
    names: { devanagari: "प्रणामासन", roman: "Pranamasan", english: "Prayer Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-hastauttanasana": { 
    names: { devanagari: "हस्तोत्तानासन", roman: "Hastauttanasan", english: "Raised Arms Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-hastapadasana": { 
    names: { devanagari: "हस्तपादासन", roman: "Hastapadasan", english: "Standing Forward Bend" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-ashwa-sanchalanasana": { 
    names: { devanagari: "अश्व संचालनासन", roman: "Ashwa Sanchalanasan", english: "Equestrian Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-dandasana": { 
    names: { devanagari: "दंडासन", roman: "Dandasan", english: "Stick / Plank Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-ashtanga-namaskara": { 
    names: { devanagari: "अष्टांग नमस्कार", roman: "Ashtanga Namaskar", english: "Salute with Eight Parts" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-bhujangasana": { 
    names: { devanagari: "भुजंगासन", roman: "Bhujangasan", english: "Cobra Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-parvatasana": { 
    names: { devanagari: "पर्वतासन", roman: "Parvatasan", english: "Mountain Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "surya-tadasana": { 
    names: { devanagari: "ताड़ासन", roman: "Tadasan", english: "Standing Pose" },
    category: "Asana", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },

  // ==========================================
  // 6. MISC EXERCISES & ROTATIONS
  // ==========================================
  "hasta-manibandha-kurpara-skandha-chakra": { 
    names: { devanagari: "हस्त-मणिबंध-कूर्पर-स्कंध चक्र", roman: "Hasta-Manibandha-Kurpara-Skandha Chakra", english: "Hand, Wrist, Elbow & Shoulder Rotation" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "greeva-sanchalana-3-types": { 
    names: { devanagari: "ग्रीवा संचालन - 3 प्रकार", roman: "Greeva Sanchalan - 3 Types", english: "Neck Rotation - 3 Types" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "greeva-anti-pressure": { 
    names: { devanagari: "ग्रीवा एंटी-प्रेशर", roman: "Greeva Anti-Pressure", english: "Neck Anti-Pressure" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "netra-chakra": { 
    names: { devanagari: "नेत्र चक्र", roman: "Netra Chakra", english: "Eye Rotation" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "foot-exercises": { 
    names: { devanagari: "पाद व्यायाम", roman: "Pad Vyayam", english: "Foot Exercises" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chakki-chalan": { 
    names: { devanagari: "चक्की चालन", roman: "Chakki Chalan", english: "Mill Churning Movement" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tali-vadan": { 
    names: { devanagari: "ताली वादन", roman: "Tali Vadan", english: "Clapping Practice" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kidney-acupressure": { 
    names: { devanagari: "वृक्क एक्यूप्रेशर", roman: "Vrikk Acupressure", english: "Kidney Acupressure" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pelvic-tilts": { 
    names: { devanagari: "श्रोणि चालन", roman: "Shroni Chalan", english: "Pelvic Tilts" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ankle-rotations": { 
    names: { devanagari: "गुल्फ चक्र", roman: "Gulpha Chakra", english: "Ankle Rotations" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hamstring-stretch": { 
    names: { devanagari: "पश्चिम जंघा खिंचाव", roman: "Paschim Jangha Khinchav", english: "Hamstring Stretch" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "quad-set": { 
    names: { devanagari: "जंघा संकोच", roman: "Jangha Sankoch", english: "Quad Set" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "neck-isometrics": { 
    names: { devanagari: "ग्रीवा स्थिरता अभ्यास", roman: "Greeva Sthirata Abhyas", english: "Neck Isometrics" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shoulder-rolls": { 
    names: { devanagari: "स्कंध चक्र", roman: "Skandha Chakra", english: "Shoulder Rolls" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "neck-rolls": { 
    names: { devanagari: "ग्रीवा चालन", roman: "Greeva Chalan", english: "Neck Rolls" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  }
};  names: { devanagari: "नेत्र चक्र", roman: "Netra Chakra", english: "Eye Rotation" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "foot-exercises": { 
    names: { devanagari: "पाद व्यायाम", roman: "Pad Vyayam", english: "Foot Exercises" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "chakki-chalan": { 
    names: { devanagari: "चक्की चालन", roman: "Chakki Chalan", english: "Mill Churning Movement" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "tali-vadan": { 
    names: { devanagari: "ताली वादन", roman: "Tali Vadan", english: "Clapping Practice" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "kidney-acupressure": { 
    names: { devanagari: "वृक्क एक्यूप्रेशर", roman: "Vrikk Acupressure", english: "Kidney Acupressure" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "pelvic-tilts": { 
    names: { devanagari: "श्रोणि चालन", roman: "Shroni Chalan", english: "Pelvic Tilts" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "ankle-rotations": { 
    names: { devanagari: "गुल्फ चक्र", roman: "Gulpha Chakra", english: "Ankle Rotations" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "hamstring-stretch": { 
    names: { devanagari: "पश्चिम जंघा खिंचाव", roman: "Paschim Jangha Khinchav", english: "Hamstring Stretch" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "quad-set": { 
    names: { devanagari: "जंघा संकोच", roman: "Jangha Sankoch", english: "Quad Set" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: true, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "neck-isometrics": { 
    names: { devanagari: "ग्रीवा स्थिरता अभ्यास", roman: "Greeva Sthirata Abhyas", english: "Neck Isometrics" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "shoulder-rolls": { 
    names: { devanagari: "स्कंध चक्र", roman: "Skandha Chakra", english: "Shoulder Rolls" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  },
  "neck-rolls": { 
    names: { devanagari: "ग्रीवा चालन", roman: "Greeva Chalan", english: "Neck Rolls" },
    category: "Misc", type: "time", duration: 60, reps: null, timePerRep: null, prepTime: 5, hasSides: false, breathPattern: "", benefits: "", caution: "", audioUrl: "", videoUrl: "", pictureUrl: "" 
  }
};