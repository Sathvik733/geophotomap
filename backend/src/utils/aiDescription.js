async function generateImageDescription(filePath, manualDescription) {
  if (manualDescription && manualDescription.trim()) {
    return manualDescription.trim();
  }

  return "Auto-generated placeholder: This image was uploaded without a manual description.";
}

module.exports = generateImageDescription;