// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Dashboard from './pages/Dashboard'; // create later
import ProductRegister from './ProductRegister';
import OCRExtractor from './OCRExtractor';

function App() {
  const [extractedDate, setExtractedDate] = useState('');
  const [extractedProduct, setExtractedProduct] = useState('');

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 font-sans">
              <h1 className="text-4xl font-bold text-center mb-6 animate-pulse">📦 KeepMyWarranty</h1>
              <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6">
                <OCRExtractor
                  onDateExtracted={setExtractedDate}
                  onProductExtracted={setExtractedProduct}
                />
                <ProductRegister
                  extractedDate={extractedDate}
                  extractedProduct={extractedProduct}
                />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;