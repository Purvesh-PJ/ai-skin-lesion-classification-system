# Models

This document describes the neural networks, how their outputs are combined, and the conditions the system classifies. For how they run inside the backend see [Architecture](ARCHITECTURE.md), and for how they were trained see [ML Pipeline](ML_PIPELINE.md).

## Contents

1. [Training data](#1-training-data)
2. [The three networks](#2-the-three-networks)
3. [Soft voting](#3-soft-voting)
4. [Disease classes and risk tiers](#4-disease-classes-and-risk-tiers)

---

## 1. Training data

All three models are trained on **HAM10000**: 10,015 dermatoscopic images across 7 classes, split 80% train, 10% validation, 10% test (stratified by class).

---

## 2. The three networks

A single network often shows bias or high variance on dermatoscopic edge cases. Three distinct architectures are combined to improve reliability. Each is an ImageNet-pretrained backbone fine-tuned for this task ([ADR 0002](adr/0002-transfer-learning.md)).

| Model | Quantized size | Why it is in the ensemble |
| :-- | :-: | :-- |
| **ResNet-101** | 43.8 MB | Deep residual skip connections preserve low-level lesion texture and pigment border patterns. |
| **DenseNet-121** | 7.7 MB | Direct layer-to-layer feature reuse maximizes gradient flow across lesion characteristics. |
| **EfficientNet-B3** | 12.7 MB | Compound scaling of depth, width, and resolution captures fine features. |

---

## 3. Soft voting

Each model outputs a probability for every class. The final probability for class `c` is the mean of the three models' softmax outputs:

```text
P_final(c) = ( P_resnet(c) + P_densenet(c) + P_efficientnet(c) ) / 3
```

The class with the highest `P_final` is the predicted disease ([ADR 0003](adr/0003-ensemble-voting.md)).

---

## 4. Disease classes and risk tiers

| Code | Condition | Clinical category | Risk tier |
| :-: | :-- | :-- | :-: |
| `mel` | Melanoma | Malignant melanocytic tumor | High |
| `bcc` | Basal Cell Carcinoma | Malignant skin cancer | High |
| `akiec` | Actinic Keratoses & Intraepithelial Carcinoma | Pre-cancerous / carcinoma in situ | Pre-cancerous |
| `vasc` | Vascular Lesions | Angiomas, pyogenic granulomas | Moderate |
| `bkl` | Benign Keratosis-like Lesions | Solar lentigines / seborrheic | Benign |
| `df` | Dermatofibroma | Benign fibrous histiocytoma | Benign |
| `nv` | Melanocytic Nevi | Common benign moles | Benign |

> This project is an academic demonstration. The risk tiers are for illustration and are not medical advice.