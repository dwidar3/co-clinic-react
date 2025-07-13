import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaShare, FaBook, FaTag, FaEdit } from 'react-icons/fa';
import CommentSection from '../components/dashboard/CommentSection';
import { BookUrl } from "../utils/serverURL";
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

SwiperCore.use([Navigation]);

export default function Book() {
  const { t } = useTranslation();
  const { currentUser } = useSelector(state => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${BookUrl.getById}/${params.listingId}`);
        const data = res.data;
        if (data.status !== 'success') {
          setError(true);
        } else {
          setListing(data.data);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) return <p className="text-center my-7 text-2xl text-gray-600">{t('book.loading')}</p>;
  if (error || !listing) return <p className="text-center my-7 text-2xl text-red-500">{t('book.wrong')}</p>;

  const canEdit = currentUser?._id === listing.userRef;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Swiper Carousel */}
      <Swiper navigation className="mb-8">
        {listing.imageUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-[400px] md:h-[550px]"
              style={{ background: `url(${url}) center/cover no-repeat` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Share & Edit Buttons */}
      <div className="fixed top-[13%] right-[3%] z-10 flex flex-col space-y-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <FaShare className="text-gray-600" />
        </button>
        {copied && (
          <p className="absolute top-full right-0 mt-2 bg-white p-2 rounded-md shadow-md text-sm text-gray-600">
            {t('book.copied')}
          </p>
        )}
        {canEdit && (
          <Link
            to={`/update-listing/${listing._id}`}
            className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors text-green-600"
          >
            <FaEdit />
          </Link>
        )}
      </div>

      {/* Book Details */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8 relative"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center">
            <FaBook className="mr-2 text-blue-500" />
            {listing.title}
          </h1>

          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
            ${listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
            {listing.offer && (
              <span className="text-gray-400 line-through ml-2">
                ${listing.regularPrice.toLocaleString()}
              </span>
            )}
          </p>

          <p className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-green-700" />
            {listing.author}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium">
              {listing.type}
            </span>
            {listing.offer && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium flex items-center">
                <FaTag className="mr-1" />
                ${(+listing.regularPrice - +listing.discountPrice).toLocaleString()} {t('book.off')}
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            <span className="font-semibold text-gray-800">{t('book.description')}:</span>{' '}
            {listing.description}
          </p>

          <CommentSection postId={listing._id} />
        </motion.div>
      </div>
    </main>
  );
}
