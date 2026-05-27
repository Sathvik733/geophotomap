async function generateImageDescription(filePath, manualDescription) {
  if (manualDescription && manualDescription.trim()) {
    return manualDescription;
  }

  return "AI description placeholder: A geotagged image uploaded by the user.";
}

module.exports = generateImageDescription;