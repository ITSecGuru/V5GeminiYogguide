/**
 * @file src/data/routines.js
 * @description Master Playlist Factory with bulletproof auto-side expansion mapping filters.
 */

import { stepDatabase } from './stepNames';

const masterRoutinesConfig = [
  {
    id: "patanjaliJogging1",
    label: "Patanjali Yogic Jogging Part 1",
    description: "Patanjali Yogic Jogging sequence with Positions 1 to 5, followed by 12 individual Yogic Jogging steps and 5 Surya Namaskar rounds.",
    safetyNote: "Start gently, keep movement rhythmic and controlled, and reduce speed if breathing becomes strained or balance feels unstable.",
    stepKeys: [
      "yogic-jogging-position-1", "yogic-jogging-position-2", "yogic-jogging-position-3",
      "yogic-jogging-position-4", "yogic-jogging-position-5", "hasta-sanchalan-kriya",
      "purna-hasta-sanchalan-kriya", "janu-sanchalan-kriya", "janu-vikasak-kriya",
      "uru-vikasak-kriya-1", "uru-vikasak-kriya-2", "vaksha-vikasak-kriya",
      "trikonasana-kriya", "konasana-kriya", "hastottanasana-paadhastasana-kriya",
      "chalit-pad-hastasana-kriya", "yog-nrutyasana-kriya", "surya-namaskar",
      "mishra-dand", "easy-breathing"
    ]
  },
  {
    id: "patanjaliAsanas2",
    label: "Patanjali Yog Part 2 - Asanas",
    description: "Second class asana sequence from the uploaded Patanjali file with the listed repetitions and relaxation timings.",
    safetyNote: "Move with control, avoid jerks, and rest whenever strain, dizziness, pain, or discomfort appears.",
    stepKeys: [
      "makarasana", "ardha-bhujangasana", "purna-bhujangasana", "tiryak-bhujangasana",
      "saral-bhujangasana", "shalabhasana", "dhanurasana", "bal-vishram-asana",
      "markat-asana", "uttanapadasana", "naukasana", "ekapada-angushtha-nasa-sparshasana",
      "pawanmuktasana", "ardha-halasana", "padavrittasana", "dwichakrikasana",
      "kandharasana", "savasana-yog-nidra"
    ]
  },
  {
    id: "patanjaliPhase3",
    label: "Patanjali Yog Phase 3",
    description: "Based on the uploaded Patanjali Session 3 content with pranayama, asana, kriya, foot work, acupressure, and closing relaxation practices.",
    safetyNote: "Sit in a comfortable posture with the spine, waist, and neck upright. No strain, no force, and no competition. Do all practices only according to your capacity.",
    stepKeys: [
      "prarthana", "hasta-manibandha-kurpara-skandha-chakra", "greeva-sanchalana-3-types",
      "greeva-anti-pressure", "netra-chakra", "bhastrika-pranayama", "kapal-bhati",
      "mandukasana", "shashankasana", "gomukhasana", "vakrasana", "ardha-chandrasana",
      "ustrasana", "marjarasana", "bahya-pranayama", "agnisar-kriya", "ujjayi-pranayama",
      "foot-exercises", "chakki-chalan", "sthit-konasana", "titli-asana", "tali-vadan",
      "kidney-acupressure", "anulom-vilom", "bhramari", "udgeeth-pranayama",
      "pranav-pranayama", "simhasana", "hasyasana", "savasana-yog-nidra"
    ]
  },
  {
    id: "diabetesSupport",
    label: "Diabetes Support",
    description: "A targeted sequence designed to massage abdominal organs and support metabolic health.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "diaphragmatic-breath", "surya-namaskar", "cat-cow", "seated-forward-fold",
      "cobra-pose", "pawanmuktasana", "mandukasana", "bridge-pose", "anulom-vilom",
      "savasana-yog-nidra"
    ]
  },
  {
    id: "weightLossFlow",
    label: "Weight Loss Flow",
    description: "A dynamic sequence to build heat, increase heart rate, and build core strength.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "bhastrika-pranayama", "surya-namaskar", "chair-pose-pulses", "plank-hold",
      "high-lunge", "naukasana", "bridge-pose", "kapal-bhati", "savasana-yog-nidra"
    ]
  },
  {
    id: "backPainRelief",
    label: "Back Pain Relief",
    description: "Gentle movements focusing on spinal mobility and relieving tension in the lower and mid-back.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "easy-breathing", "pelvic-tilts", "cat-cow", "childs-pose", "sphinx-pose",
      "knees-to-chest", "supine-twist", "bridge-pose", "savasana-yog-nidra"
    ]
  },
  {
    id: "kneePainSupport",
    label: "Knee Pain Support",
    description: "Focuses on strengthening the muscles around the knee joint without putting excessive pressure on it.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "diaphragmatic-breath", "ankle-rotations", "hamstring-stretch", "quad-set",
      "bridge-pose", "supported-chair-pose", "legs-up-the-wall", "anulom-vilom"
    ]
  },
  {
    id: "neckPainSupport",
    label: "Neck Pain / Spondylosis Support",
    description: "Gentle stretches and isometrics to relieve cervical tension and improve neck mobility.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "easy-breathing", "neck-isometrics", "shoulder-rolls", "thread-the-needle",
      "cat-cow", "supported-fish-pose", "bhramari", "savasana-yog-nidra"
    ]
  },
  {
    id: "beginnerFlow",
    label: "Beginner Flow",
    description: "An introductory sequence exploring fundamental foundational poses and gentle movement.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "prarthana", "neck-rolls", "shoulder-rolls", "cat-cow", "downward-dog",
      "low-lunge", "warrior-ii", "tree-pose", "seated-forward-fold", "supine-twist",
      "savasana-yog-nidra"
    ]
  },
  {
    id: "intermediateStrength",
    label: "Intermediate Strength Flow",
    description: "A challenging flow building full-body strength, balance, and endurance.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "bhastrika-pranayama", "surya-namaskar", "chair-pose-pulses", "plank-hold",
      "cobra-to-childs-pose", "crescent-lunge", "warrior-iii", "naukasana", "bridge-pose",
      "happy-baby", "savasana-yog-nidra"
    ]
  },
  {
    id: "gentleRecovery",
    label: "Gentle / Recovery",
    description: "A highly restorative sequence aimed at nervous system regulation and deep relaxation.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "easy-breathing", "seated-side-stretch", "seated-twist", "cat-cow",
      "thread-the-needle", "childs-pose", "figure-four-stretch", "legs-up-the-wall",
      "savasana-yog-nidra"
    ]
  },
  {
    id: "pranayamaOm",
    label: "Pranayama & Om",
    description: "A focused breathwork and meditation session to center the mind and oxygenate the body.",
    safetyNote: "Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.",
    stepKeys: [
      "bhastrika-pranayama", "kapal-bhati", "anulom-vilom", "bhramari", "om-pranav",
      "savasana-yog-nidra"
    ]
  }
];

export const routines = masterRoutinesConfig.map(routine => {
  const expandedSteps = [];
  let trackingIndex = 1;

  routine.stepKeys.forEach((key) => {
    const stepData = stepDatabase ? stepDatabase[key] : null;
    if (!stepData) return;

    const makeStepItem = (sideSuffix = "", sideLabelHi = "", sideLabelEn = "") => ({
      id: `${routine.id}-step-${trackingIndex++}`,
      stepKey: key,
      ...stepData,
      pictureUrl: stepData.pictureUrl || `/assets/images/${key}.jpg`,
      sideIndicator: sideLabelEn,
      names: {
        devanagari: `${stepData.names?.devanagari || ''} ${sideLabelHi}`.trim(),
        roman: `${stepData.names?.roman || ''} ${sideLabelEn}`.trim(),
        english: `${stepData.names?.english || ''} ${sideLabelEn ? `(${sideLabelEn})` : ''}`.trim()
      },
      speech: {
        hi: `${stepData.names?.devanagari || ''} ${sideLabelHi} प्रारंभ करें।`,
        en: `Begin ${stepData.names?.roman || ''} ${sideLabelEn}.`
      }
    });

    if (stepData.hasSides) {
      expandedSteps.push(makeStepItem("-left", "(बायाँ भाग)", "Left Side"));
      expandedSteps.push(makeStepItem("-right", "(दायाँ भाग)", "Right Side"));
    } else {
      expandedSteps.push(makeStepItem("", "", ""));
    }
  });

  return {
    id: routine.id,
    label: routine.label,
    description: routine.description,
    safetyNote: routine.safetyNote,
    steps: expandedSteps
  };
});