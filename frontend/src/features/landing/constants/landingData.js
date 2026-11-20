import { FiLayers, FiDatabase, FiZap, FiActivity, FiInfo, FiShield, FiCheckCircle } from 'react-icons/fi';

// 7 Supported Skin Diseases with Clinical Details
export const ALL_CONDITIONS = [
  {
    code: 'mel',
    name: 'Melanoma',
    category: 'malignant',
    riskText: 'Malignant (High Priority)',
    riskColor: '#ef4444',
    description: 'A serious malignancy arising from pigment-producing melanocytes. Often presents with asymmetrical contours, irregular borders, and color variations.',
  },
  {
    code: 'bcc',
    name: 'Basal Cell Carcinoma',
    category: 'malignant',
    riskText: 'Malignant (Common)',
    riskColor: '#ef4444',
    description: 'The most frequent form of skin cancer. Typically appears as pearly translucent papules with telangiectasia; rarely metastasizes but causes local tissue invasion.',
  },
  {
    code: 'akiec',
    name: "Actinic Keratoses / Bowen's Disease",
    category: 'precancer',
    riskText: 'Pre-Cancerous',
    riskColor: '#f59e0b',
    description: 'Rough, dry, scaly patches on chronically sun-exposed areas caused by cumulative UV damage. Carries potential for progression to invasive squamous cell carcinoma.',
  },
  {
    code: 'nv',
    name: 'Melanocytic Nevi',
    category: 'benign',
    riskText: 'Benign (Harmless)',
    riskColor: '#22c55e',
    description: 'Common benign moles and birthmarks formed by ordered nests of melanocytes with uniform pigment distribution and symmetrical borders.',
  },
  {
    code: 'bkl',
    name: 'Benign Keratosis',
    category: 'benign',
    riskText: 'Benign (Harmless)',
    riskColor: '#22c55e',
    description: 'Non-malignant epidermal growths, including seborrheic keratoses, solar lentigines, and lichen-planus-like keratoses common in adults.',
  },
  {
    code: 'df',
    name: 'Dermatofibroma',
    category: 'benign',
    riskText: 'Benign (Harmless)',
    riskColor: '#22c55e',
    description: 'Firm, slowly developing non-cancerous fibrous cutaneous nodules, most frequently observed on the lower extremities and shoulder girdle.',
  },
  {
    code: 'vasc',
    name: 'Vascular Lesions',
    category: 'benign',
    riskText: 'Benign (Harmless)',
    riskColor: '#22c55e',
    description: 'Benign vascular anomalies including cherry angiomas, pyogenic granulomas, angiokeratomas, and localized capillary malformations.',
  },
];

// 4 Core Project Pillars displayed in Hero
export const CORE_PILLARS = [
  {
    icon: FiLayers,
    title: 'Stacked Ensemble',
    subtitle: 'ResNet + DenseNet + EfficientNet',
  },
  {
    icon: FiDatabase,
    title: 'HAM10000 Dataset',
    subtitle: '10,015 Verified Images',
  },
  {
    icon: FiZap,
    title: 'Real-Time Screening',
    subtitle: 'Sub-Second Inference API',
  },
  {
    icon: FiActivity,
    title: '7 Disease Classes',
    subtitle: 'Malignant & Benign Analysis',
  },
];

// Pipeline Steps in How It Works Section
export const PIPELINE_STEPS = [
  {
    step: 'STEP 01',
    title: 'Image Ingestion',
    description: 'The user uploads a close-up dermatoscopic image of a suspicious skin spot or mole via the web dashboard.',
  },
  {
    step: 'STEP 02',
    title: 'CLAHE Preprocessing',
    description: 'OpenCV resizes the image to 224×224 pixels and applies contrast-limited adaptive histogram equalization to enhance pigment patterns.',
  },
  {
    step: 'STEP 03',
    title: 'Tri-Model Inference',
    description: 'ResNet-101, DenseNet-121, and EfficientNet-B3 simultaneously extract spatial features and generate probability logits.',
  },
  {
    step: 'STEP 04',
    title: 'Stacked Prediction',
    description: 'A logistic meta-classifier aggregates all 3 outputs, calculating the final disease classification and calibrated confidence score.',
  },
];

// Dataset Metrics Stats Strip
export const DATASET_STATS = [
  {
    value: '10,015',
    label: 'Curated Dermoscopy Scans',
  },
  {
    value: '7 Classes',
    label: 'Full Diagnostic Scope',
  },
  {
    value: '224 × 224',
    label: 'Normalized RGB Matrix',
  },
  {
    value: '70 / 15 / 15',
    label: 'Patient-Isolated Split',
  },
];

// Dataset Class Distribution Percentages & Colors
export const DATASET_DISTRIBUTION = [
  { code: 'NV', label: 'NV: 67% (Nevi)', share: '67%', color: '#22c55e', tooltip: 'NV: 6,705 (67%)' },
  { code: 'MEL', label: 'MEL: 11% (Melanoma)', share: '11%', color: '#ef4444', tooltip: 'MEL: 1,113 (11%)' },
  { code: 'BKL', label: 'BKL: 11% (Keratosis)', share: '11%', color: '#10b981', tooltip: 'BKL: 1,099 (11%)' },
  { code: 'BCC', label: 'BCC: 5% (Carcinoma)', share: '5%', color: '#dc2626', tooltip: 'BCC: 514 (5%)' },
  { code: 'AKIEC', label: 'AKIEC: 3% (Actinic)', share: '3%', color: '#f59e0b', tooltip: 'AKIEC: 327 (3%)' },
  { code: 'VASC', label: 'VASC: 1.5%', share: '1.5%', color: '#3b82f6', tooltip: 'VASC: 142 (1.5%)' },
  { code: 'DF', label: 'DF: 1.5%', share: '1.5%', color: '#8b5cf6', tooltip: 'DF: 115 (1.5%)' },
];

// Dataset Methodology Steps
export const DATASET_METHODOLOGY = [
  {
    step: '01',
    title: 'Patient-Isolated Partitioning',
    description: 'Images are split by patient ID so scans from the same individual never overlap across train and test folds, guaranteeing authentic generalization.',
  },
  {
    step: '02',
    title: 'Dynamic Rebalancing & Augmentation',
    description: 'On-the-fly random rotations (0°–360°), flips, and loss class-weighting prevent majority bias toward common benign moles.',
  },
  {
    step: '03',
    title: 'CLAHE Contrast & Normalization',
    description: 'Adaptive histogram equalization enhances subtle pigment network boundaries, followed by RGB tensor scaling to [0, 1] for stable gradient descent.',
  },
];

// Project Scope & Limitations Items
export const PROJECT_LIMITATIONS = [
  {
    icon: FiInfo,
    iconColorClass: 'text-green-600 dark:text-green-500',
    title: 'Academic Research Project',
    description: 'This tool is an engineering project developed to evaluate ensemble deep learning on dermatoscopic images. It is not an FDA-approved clinical diagnostic device.',
  },
  {
    icon: FiShield,
    iconColorClass: 'text-amber-500',
    title: 'Sensitivity to Photo Quality',
    description: 'Deep learning models can make errors, especially on blurry photos, non-standard smartphone lighting, hair occlusions, or lesions outside the HAM10000 distribution.',
  },
  {
    icon: FiCheckCircle,
    iconColorClass: 'text-green-600 dark:text-green-500',
    title: 'Consult Certified Doctors',
    description: 'Always consult a certified dermatologist for professional clinical examination, dermoscopy, or biopsy confirmation of any concerning skin spot.',
  },
];
