import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import { FiArrowUpLeft } from 'react-icons/fi';
import SearchUser from './SearchUser';
import { FaImage } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';
import { HiOutlineChat } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const user = useSelector(state => state.chat.user);
  const socketConnection = useSelector(state => state.chat.socketConnection);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  useEffect(() => {
    if (!socketConnection || !user?._id) return;
    socketConnection.emit('sidebar', user._id);
    socketConnection.on('conversation', data => {
      const conversationUserData = data.map(conv => {
        const other = conv.sender._id === conv.receiver._id
          ? conv.sender
          : (conv.receiver._id !== user._id ? conv.receiver : conv.sender);
        return { ...conv, userDetails: other };
      });
      setAllUser(conversationUserData);
    });
    return () => socketConnection.off('conversation');
  }, [socketConnection, user]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-tr-lg rounded-br-lg shadow-lg">
      {/* Top Icons */}
      <div className="flex items-center justify-between p-3 border-b">
        <NavLink
          to="/livechat"
          className={({ isActive }) =>
            `p-2 rounded hover:bg-green-50 ${isActive ? 'bg-green-100' : ''}`
          }
          title={t('live_chat.chat')}
        >
          <HiOutlineChat size={24} className="text-green-600" />
        </NavLink>

        <button
          onClick={() => setOpenSearchUser(true)}
          className="p-2 rounded hover:bg-green-50"
          title={t('live_chat.add')}
        >
          <FaUserPlus size={20} className="text-green-600" />
        </button>
      </div>

      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-green-800">{t('live_chat.live')}</h2>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        {allUser.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <FiArrowUpLeft size={48} className="mb-2" />
            <p>{t('live_chat.explore')}</p>
          </div>
        ) : (
          allUser.map(conv => (
            <NavLink
              key={conv._id}
              to={`/livechat/${conv.userDetails._id}`}
              className="flex items-center gap-3 p-3 hover:bg-green-50 transition rounded-lg mx-2 my-1"
            >
              <Avatar
                imageUrl={conv.userDetails.avatar}
                name={conv.userDetails.username}
                width={40}
                height={40}
              />
              <div className="flex-1">
                <p className="font-medium text-green-900 truncate">
                  {conv.userDetails.username}
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-1 truncate">
                  {conv.lastMsg.imageUrl && (
                    <span className="flex items-center gap-1">
                      <FaImage /> {!conv.lastMsg.text && t('live_chat.image')}
                    </span>
                  )}
                  {conv.lastMsg.videoUrl && (
                    <span className="flex items-center gap-1">
                      <FaVideo /> {!conv.lastMsg.text && t('live_chat.video')}
                    </span>
                  )}
                  <span className="truncate">{conv.lastMsg.text}</span>
                </div>
              </div>
              {conv.unseenMsg > 0 && (
                <div className="ml-auto bg-green-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {conv.unseenMsg}
                </div>
              )}
            </NavLink>
          ))
        )}
      </div>

      {/* Search Overlay */}
      {openSearchUser && <SearchUser onClose={() => setOpenSearchUser(false)} />}
    </div>
  );
};

export default Sidebar;
