import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { BookUrl } from '../utils/serverURL';

export default function UpdateBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    imageUrls: [''],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch existing book details for pre-fill
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`${BookUrl.getById}/${id}`)
      .then(res => {
        const data = res.data.data;
        setBook({
          title: data.title,
          author: data.author,
          description: data.description,
          regularPrice: data.regularPrice,
          discountPrice: data.discountPrice,
          offer: data.offer,
          imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [''],
        });
      })
      .catch(() => {
        toast.error(t('book.fetch_error'));
        navigate('/dashboard');
      })
      .finally(() => setLoading(false));
  }, [id, navigate, t]);

  

  {book.imageUrls.map((url, idx) => (
              console.log("book images ===> ", url)
    ))}


  // Handle text, number, checkbox changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle dynamic image URL changes
  const handleImageChange = (index, value) => {
    setBook(prev => {
      const urls = [...prev.imageUrls];
      urls[index] = value;
      return { ...prev, imageUrls: urls };
    });
  };

  const addImageField = () => {
    setBook(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ''],
    }));
  };

  const removeImageField = index => {
    setBook(prev => {
      const urls = prev.imageUrls.filter((_, i) => i !== index);
      return { ...prev, imageUrls: urls.length ? urls : [''] };
    });
  };

  // Submit updated book to backend
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.post(`${BookUrl.update}/${id}`, book);
      toast.success(t('book.update_success'));
      await new Promise(r => setTimeout(r, 800));
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || t('book.update_fail');
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-4 text-teal-600">{t('book.edit')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('book.title')}</label>
          <input
            name="title"
            type="text"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('book.author')}</label>
          <input
            name="author"
            type="text"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('book.description')}</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        {/* Regular Price */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('book.regular_price')}</label>
          <input
            name="regularPrice"
            type="number"
            value={book.regularPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('book.discount_price')}</label>
          <input
            name="discountPrice"
            type="number"
            value={book.discountPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        {/* Offer */}
        <div className="flex items-center space-x-2">
          <input
            name="offer"
            type="checkbox"
            checked={book.offer}
            onChange={handleChange}
            className="h-4 w-4 rounded text-teal-500 focus:ring-teal-300"
          />
          <label className="text-sm font-medium">{t('book.offer')}</label>
        </div>

        {/* Existing Images Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">{t('book.current_images')}</label>
          <div className="flex flex-wrap gap-2">
            {book.imageUrls.map((url, idx) => (
              url && (
                <img
                  key={idx}
                  src={url}
                  alt={`${t('book.book_images')} ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              )
            ))}
          </div>
        </div>

        {/* Image URL Inputs */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">{t('book.image_urls')}</label>
          {book.imageUrls.map((url, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="url"
                value={url}
                onChange={e => handleImageChange(idx, e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder={t('book.image_placeholder')}
              />
              <button
                type="button"
                onClick={() => removeImageField(idx)}
                className="px-2 py-1 rounded bg-red-500 text-white"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-4 py-2 rounded bg-teal-500 text-white"
          >
            + {t('book.add_image')}
          </button>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={saving}
          whileTap={{ scale: saving ? 1 : 0.95 }}
          className="w-full py-3 rounded-lg bg-teal-500 text-white font-semibold disabled:opacity-50"
        >
          {saving ? t('book.saving') : t('book.save_changes')}
        </motion.button>
      </form>
    </div>
  );
}
