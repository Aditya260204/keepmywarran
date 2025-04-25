import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ProductRegister({ extractedDate, extractedProduct }) {
  const [productName, setProductName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [warrantyMonths, setWarrantyMonths] = useState(12);
  const [warrantyExpiry, setWarrantyExpiry] = useState('');
  const [reminderDays, setReminderDays] = useState(7);
  const [registeredProducts, setRegisteredProducts] = useState([]);

  useEffect(() => {
    if (extractedDate) {
      const parsedDate = new Date(extractedDate);
      setPurchaseDate(parsedDate);
    }
  }, [extractedDate]);

  useEffect(() => {
    if (extractedProduct) {
      setProductName(extractedProduct);
    }
  }, [extractedProduct]);

  useEffect(() => {
    if (purchaseDate && warrantyMonths) {
      const expiry = new Date(purchaseDate);
      expiry.setMonth(expiry.getMonth() + parseInt(warrantyMonths));
      setWarrantyExpiry(expiry.toISOString().slice(0, 10));
    }
  }, [purchaseDate, warrantyMonths]);

  useEffect(() => {
    const stored = localStorage.getItem('warrantyProducts');
    if (stored) setRegisteredProducts(JSON.parse(stored));

    Notification.requestPermission();
    const interval = setInterval(() => checkForReminders(), 24 * 60 * 60 * 1000);
    checkForReminders(); // Run once immediately
    return () => clearInterval(interval);
  }, []);

  const checkForReminders = () => {
    const today = new Date();
    const products = JSON.parse(localStorage.getItem('warrantyProducts')) || [];
    products.forEach(product => {
      const expiry = new Date(product.warrantyExpiry);
      const remindDate = new Date(expiry);
      remindDate.setDate(remindDate.getDate() - product.reminderDays);
      const isSameDay = remindDate.toDateString() === today.toDateString();
      if (isSameDay && Notification.permission === 'granted') {
        new Notification('⏰ Warranty Reminder', {
          body: `${product.productName}'s warranty will expire on ${product.warrantyExpiry}`,
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !purchaseDate || !warrantyMonths) {
      toast.error('Please fill all fields.');
      return;
    }

    try {
      const newProduct = {
        productName,
        purchaseDate,
        warrantyMonths,
        warrantyExpiry,
        reminderDays,
      };
      const updated = [...registeredProducts, newProduct];
      localStorage.setItem('warrantyProducts', JSON.stringify(updated));
      setRegisteredProducts(updated);

      await axios.post('http://localhost:5000/register', newProduct);

      toast.success('✅ Product registered successfully!');
      setProductName('');
    } catch (err) {
      toast.error('❌ Failed to register product.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Register Warranty</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Purchase Date</label>
          <DatePicker
            selected={purchaseDate}
            onChange={(date) => setPurchaseDate(date)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Warranty Period (months)</label>
          <select
            value={warrantyMonths}
            onChange={(e) => setWarrantyMonths(parseInt(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            {[...Array(61).keys()].slice(1).map((n) => (
              <option key={n} value={n}>{n} month{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Reminder (before expiry)</label>
          <select
            value={reminderDays}
            onChange={(e) => setReminderDays(parseInt(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            {[3, 7, 14, 30].map((d) => (
              <option key={d} value={d}>Remind me {d} day{d > 1 ? 's' : ''} before expiry</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Warranty Expiry Date</label>
          <input
            type="text"
            value={warrantyExpiry}
            readOnly
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Register Product
        </button>
      </form>
    </div>
  );
}

export default ProductRegister;
