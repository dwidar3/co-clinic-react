import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from "../components/ListingItem";
import { BookUrl } from '../utils/serverURL';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    offer: false,
    sort: 'createdAt', // Match controller's default
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await axiosInstance.get(`${BookUrl.getAllBooks}?${searchQuery}`);
      const data = res.data;
      setListings(data.data);
      setShowMore(data.data.length === 9); // If exactly 9, there might be more
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'offer') {
      setSidebardata({ ...sidebardata, offer: e.target.checked });
    }
    if (e.target.id === 'sort_order') {
      const [sort, order] = e.target.value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('limit', '9'); // Set consistent limit
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await axiosInstance.get(`${BookUrl.getAllBooks}?${searchQuery}`);
    const newListings = res.data.data;
    setListings([...listings, ...newListings]);
    setShowMore(newListings.length === 9); // If less than 9, no more to show
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-gray-700">
              {t('search.term')}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder={t('search.placeholder')}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-gray-700">{t('search.options')}</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 accent-blue-500"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span className="text-gray-600">{t('search.offer')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">{t('search.sort')}</label>
            <select
              onChange={handleChange}
              defaultValue="createdAt_desc"
              id="sort_order"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="regularPrice_desc">{t('search.price_high_low')}</option>
              <option value="regularPrice_asc">{t('search.price_low_high')}</option>
              <option value="createdAt_desc">{t('search.latest')}</option>
              <option value="createdAt_asc">{t('search.oldest')}</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 transition duration-200">
            {t('search.title')}
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-gray-700 mt-5">
          {t('search.listing_results')}
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-600">{t('search.no_listing')}</p>
          )}
          {loading && (
            <p className="text-xl text-gray-600 text-center w-full">
              {t('search.loading')}
            </p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-blue-600 hover:underline p-7 text-center w-full"
            >
              {t('search.show_more')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;