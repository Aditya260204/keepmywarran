import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function OCRExtractor({ onDateExtracted, onProductExtracted }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const funnyMessages = [
    '🍵 Take a sip of tea, we are analyzing the invoice...',
    '🧠 Decoding the mysteries of your receipt...',
    '🔍 CSI: Invoice edition in progress...',
    '🦾 Reading text like a robot detective...',
    '📄 Scanning your secrets (just kidding, only warranty stuff)...'
  ];
  const [funnyLine, setFunnyLine] = useState(funnyMessages[0]);

  useEffect(() => {
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const today = new Date();

    storedProducts.forEach((product) => {
      const expiry = new Date(product.warrantyEndDate);
      const reminderDays = parseInt(product.reminderDays || '7');
      const remindDate = new Date(expiry);
      remindDate.setDate(expiry.getDate() - reminderDays);

      if (
        remindDate.toDateString() === today.toDateString() &&
        Notification.permission === 'granted'
      ) {
        new Notification('🔔 Warranty Reminder', {
          body: `${product.productName} warranty expires on ${expiry.toDateString()}`,
        });
      }
    });
  }, []);

  const extractFromImage = (image) => {
    Tesseract.recognize(image, 'eng')
      .then(({ data: { text } }) => {
        const datePatterns = [
          /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/,
          /\b(\d{1,2})\s*[-]?\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[-]?\s*(\d{4})\b/i,
          /\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/,
          /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),\s+(\d{4})\b/i,
          /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/i
        ];

        let matchedDate = null;
        for (const pattern of datePatterns) {
          const match = text.match(pattern);
          if (match) {
            if (pattern === datePatterns[1]) {
              const [_, day, monthStr, year] = match;
              const months = {
                Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
              };
              const mm = months[monthStr.slice(0, 3)];
              matchedDate = `${year}-${mm}-${day.padStart(2, '0')}`;
            } else if (pattern === datePatterns[0]) {
              const [_, month, day, year] = match;
              matchedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            } else if (pattern === datePatterns[2]) {
              const [_, year, month, day] = match;
              matchedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            } else if (pattern === datePatterns[3]) {
              const [_, monthStr, day, year] = match;
              const months = {
                Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
              };
              const mm = months[monthStr.slice(0, 3)];
              matchedDate = `${year}-${mm}-${day.padStart(2, '0')}`;
            } else if (pattern === datePatterns[4]) {
              const [_, day, monthStr, year] = match;
              const months = {
                January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
                July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'
              };
              const mm = months[monthStr];
              matchedDate = `${year}-${mm}-${day.padStart(2, '0')}`;
            }
            break;
          }
        }

        if (matchedDate) {
          onDateExtracted && onDateExtracted(matchedDate);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
          toast('⚠️ Couldn’t extract date from invoice.');
        }

        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 5);
        const probableProduct = lines.find(line =>
          /phone|laptop|tv|monitor|camera|printer|fridge/i.test(line)
        );
        if (probableProduct) {
          onProductExtracted && onProductExtracted(probableProduct);
        }
      })
      .catch(() => {
        toast.error('OCR failed. Try another file.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePDF = async (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      extractFromImage(canvas);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSizeMB = 5;
    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload JPG, PNG, or PDF.');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File too large. Max size is ${maxSizeMB}MB.`);
      return;
    }

    setFileName(file.name);
    setFunnyLine(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    setLoading(true);

    if (file.type === 'application/pdf') {
      handlePDF(file);
    } else {
      extractFromImage(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">Upload Invoice (PDF or Image)</label>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />

      {fileName && <p className="text-sm italic text-gray-400">📄 {fileName}</p>}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-yellow-300 text-lg font-semibold animate-pulse"
        >
          {funnyLine}
        </motion.div>
      )}
    </div>
  );
}

export default OCRExtractor;
