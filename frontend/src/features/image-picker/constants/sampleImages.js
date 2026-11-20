import sampleNv from '../assets/samples/sample_nv.jpg';
import sampleMel from '../assets/samples/sample_mel.jpg';
import sampleBkl from '../assets/samples/sample_bkl.jpg';
import sampleBcc from '../assets/samples/sample_bcc.jpg';
import sampleAkiec from '../assets/samples/sample_akiec.jpg';
import sampleVasc from '../assets/samples/sample_vasc.jpg';
import sampleDf from '../assets/samples/sample_df.jpg';

export const SAMPLE_IMAGES = [
  {
    id: 'sample_nv',
    name: 'Melanocytic Nevi',
    code: 'NV',
    type: 'Benign',
    typeLabel: 'Benign Mole',
    fileName: 'sample_nv.jpg',
    imagePath: sampleNv,
  },
  {
    id: 'sample_mel',
    name: 'Melanoma',
    code: 'MEL',
    type: 'Malignant',
    typeLabel: 'Malignant',
    fileName: 'sample_mel.jpg',
    imagePath: sampleMel,
  },
  {
    id: 'sample_bkl',
    name: 'Benign Keratosis',
    code: 'BKL',
    type: 'Benign',
    typeLabel: 'Benign Keratosis',
    fileName: 'sample_bkl.jpg',
    imagePath: sampleBkl,
  },
  {
    id: 'sample_bcc',
    name: 'Basal Cell Carcinoma',
    code: 'BCC',
    type: 'Malignant',
    typeLabel: 'Carcinoma',
    fileName: 'sample_bcc.jpg',
    imagePath: sampleBcc,
  },
  {
    id: 'sample_akiec',
    name: "Actinic Keratoses / Bowen's",
    code: 'AKIEC',
    type: 'Pre-Cancerous',
    typeLabel: 'Pre-Cancerous',
    fileName: 'sample_akiec.jpg',
    imagePath: sampleAkiec,
  },
  {
    id: 'sample_vasc',
    name: 'Vascular Lesion',
    code: 'VASC',
    type: 'Benign',
    typeLabel: 'Vascular Spot',
    fileName: 'sample_vasc.jpg',
    imagePath: sampleVasc,
  },
  {
    id: 'sample_df',
    name: 'Dermatofibroma',
    code: 'DF',
    type: 'Benign',
    typeLabel: 'Fibrous Nodule',
    fileName: 'sample_df.jpg',
    imagePath: sampleDf,
  },
];
