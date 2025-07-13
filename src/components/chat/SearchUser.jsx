/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoSearchOutline, IoClose } from 'react-icons/io5';
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import axiosInstance from '../../utils/axiosInstance';
import { UserUrls } from '../../utils/serverURL';
import { useTranslation } from 'react-i18next';

export default function SearchUser({ onClose }) {
  const { t } = useTranslation();
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleSearchUser = async () => {
    //   if (!search) {
    //     setSearchUser([]);
    //     return;
    //   }
      setLoading(true);
      try {
        const response = await axiosInstance.post(UserUrls.searchOne, {
          search,
        });
        setSearchUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleSearchUser();
  }, [search]);

  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-40 flex items-start justify-center p-4 z-10">
      <div className="w-full max-w-lg h-full max-h-screen bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header with search input */}
        <div className="flex items-center p-4 border-b">
          <IoSearchOutline size={24} className="text-gray-500 mr-2" />
          <input
            autoFocus
            type="text"
            placeholder={t('live_chat.search')}
            className="flex-1 p-2 border rounded-lg outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={onClose}
            className="ml-4 text-gray-600 hover:text-gray-900"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Scrollable results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <Loading />
          ) : searchUser.length === 0 ? (
            <p className="text-center text-gray-500">{t('live_chat.no_user')}</p>
          ) : (
            searchUser.map(user => (
              <UserSearchCard
                key={user._id}
                user={user}
                onClose={onClose}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
