const Tesseract = require('tesseract.js');
const fs = require('fs');

function extractTextFromImage(filePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(filePath, 'eng')
      .then(({ data: { text } }) => {
        fs.unlink(filePath, () => {}); // delete uploaded file
        resolve(text);
      })
      .catch(err => reject(err));
  });
}

module.exports = extractTextFromImage;
