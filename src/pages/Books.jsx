import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { FaBookOpen, FaTags } from 'react-icons/fa';
import ListingItem from '../components/ListingItem';
import { unSetProfile } from '../features/user/userSlice';
import { BookUrl } from '../utils/serverURL';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../utils/axiosInstance';

export default function Books() {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [offerListings, setOfferListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Navigation, Autoplay, Pagination]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offerRes = await axiosInstance.get(`${BookUrl.getAllBooks}?offer=true&limit=5`);
        const offerJson = offerRes.data;
        setOfferListings(offerJson.data || []);

        const allRes = await axiosInstance.get(`${BookUrl.getAllBooks}?limit=12`);
        const allJson = allRes.data
        setAllListings(allJson.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen" onClick={() => dispatch(unSetProfile())}>
      {/* Top Hero */}
      <section className="bg-white shadow py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            <FaBookOpen className="inline-block mr-2 text-green-600" />
            {t('books.explore')}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {t('books.discover')}
          </p>
          <Link
            to="/search"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow hover:bg-green-700 transition"
          >
            {t('books.browse')}
          </Link>
        </div>
      </section>

      {/* Offer Carousel */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 flex items-center">
            <FaTags className="mr-2 text-green-600" /> {t('books.today_offer')}
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">{t('books.loading')}</p>
          ) : (
            <Swiper
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop
              className="rounded-xl overflow-hidden shadow-md"
              spaceBetween={20}
              slidesPerView={1}
            >
              {offerListings.map((book) => (
                <SwiperSlide key={book._id}>
                  <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${book.imageUrls[0]})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                      <h3 className="text-white text-2xl font-semibold">{book.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Grid of Books */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">{t('books.featured')}</h2>
          {loading ? (
            <p className="text-center text-gray-500">{t('books.loading')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allListings.map((book) => (
                <ListingItem listing={book} key={book._id} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/search?limit=20"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
            >
              {t('books.more')}
            </Link>
          </div>
        </div>
      </section>

      {/* Community Call-to-Action */}
      <section className="bg-green-700 py-12">
        <div className="max-w-5xl mx-auto text-center text-white px-4">
          <h3 className="text-2xl font-semibold mb-2">{t('books.join_community')}</h3>
          <p className="mb-4">{t('books.subscribe_benefits')}</p>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            {t('books.subscribe_now')}
          </Link>
        </div>
      </section>
    </main>
  );
}
