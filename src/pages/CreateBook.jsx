




import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookUrl } from '../utils/serverURL';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

const CreateBook = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrls: [''],
    title: '',
    description: '',
    author: currentUser.name,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    setFormData(prev => {
      const urls = [...prev.imageUrls];
      urls[index] = value;
      return { ...prev, imageUrls: urls };
    });
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ''] }));
  };

  const removeImageField = (index) => {
    setFormData(prev => {
      const urls = prev.imageUrls.filter((_, i) => i !== index);
      return { ...prev, imageUrls: urls.length ? urls : [''] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.some(url => !url.trim())) {
      setError(t('books.at_least'));
      return;
    }
    if (+formData.regularPrice < +formData.discountPrice && formData.offer) {
      setError(t('books.lower_or_equal'));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
      };
      const res = await axiosInstance.post(BookUrl.create, payload);
      const data = res.data;
      setLoading(false);
      if (data.status !== 'success') {
        setError(data.message);
      } else {
        toast.success(data.message || t('books.created'));
        navigate(`/resource/${data.data._id}`);
      }
    } catch (err){
      setError(err?.response?.data?.message);
      setLoading(false);
    }
  };

  

  return (

    <main className='bg-[#f0faf7] w-full'>

      <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">{t('books.create')}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t('books.title')}
            id="title"
            required
            minLength={10}
            maxLength={62}
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            placeholder={t('books.description')}
            id="description"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder={t('books.author')}
            id="author"
            required
            disabled
            className="border p-3 rounded-lg bg-gray-100"
            value={formData.author}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="offer"
              checked={formData.offer}
              onChange={handleChange}
              className="w-5"
            />
            <label htmlFor="offer">{t('books.offer')}</label>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={50}
                required
                className="p-3 border rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <span className="text-sm">{t('books.regular_price')}</span>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  required
                  className="p-3 border rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <span className="text-sm">{t('books.discount_price')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            {t('books.images')} <span className="font-normal text-gray-600">{t('books.first_image')}</span>
          </p>
          {formData.imageUrls.map((url, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="url"
                placeholder="Image URL"
                required
                className="flex-1 p-3 border rounded-lg"
                value={url}
                onChange={e => handleImageChange(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeImageField(idx)}
                className="p-2 text-red-600 hover:opacity-75"
              >
                &times;
              </button>
            </div>
          ))}
          <button type="button" onClick={addImageField} className="text-green-600 hover:underline">
            + {t('books.add_image')}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? t('books.creating') : t('books.create')}
          </button>
        </div>
      </form>
    </div>

    </main>
    
  );
};

export default CreateBook;
