/**
 * Utility functions for clinical & general formatting
 */

export const getCategoryClass = (diseaseCode) => {
  const code = (diseaseCode || '').toLowerCase();
  if (['mel', 'melanoma', 'bcc', 'basal cell carcinoma'].includes(code)) return 'malignant';
  if (['akiec', 'actinic keratoses', 'bowen'].includes(code)) return 'precancerous';
  return 'benign';
};

export const formatDate = (isoString) => {
  if (!isoString) return 'Recent';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Recent';
  }
};
