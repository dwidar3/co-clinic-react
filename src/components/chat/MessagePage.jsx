import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaPlus, FaImage, FaVideo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import Loading from './Loading';
import moment from 'moment';
import uploadFile from '../../helpers/uploadFile';
import { useTranslation } from 'react-i18next';

const MessagePage = () => {

  const {t} = useTranslation()

  const params = useParams();
  const socketConnection = useSelector(state => state?.chat?.socketConnection);
  const user = useSelector(state => state?.chat);
  // console.log(params)

  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    avatar: "",
    online: false,
    _id: "",
    isDoctor: false
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [allMessage]);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage(prev => ({
      ...prev,
      imageUrl: uploadPhoto.url
    }));
  };

  const handleClearUploadImage = () => {
    setMessage(prev => ({
      ...prev,
      imageUrl: ""
    }));
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage(prev => ({
      ...prev,
      videoUrl: uploadPhoto.url
    }));
  };

  const handleClearUploadVideo = () => {
    setMessage(prev => ({
      ...prev,
      videoUrl: ""
    }));
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);
      socketConnection.emit('seen', params.userId);
      socketConnection.on('message-user', data => {
        // console.log(data)
        setDataUser(data);
      });
      socketConnection.on('message', data => {
        setAllMessage(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setMessage(prev => ({
      ...prev,
      text: value
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        console.log('user ====>', user)
        console.log(` ,,,,,,,,,,,,,,, receiver =======> ${params.userId} `)
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        });
      }
    }
  };

  // console.log("thisis checking",dataUser)
  return (
    <div className="w-full  bg-white ">
      <header className=" top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to="/livechat" className="lg:hidden p-2 hover:bg-green-50 rounded">
      <FaAngleLeft size={25} className="text-green-600" />
    </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.avatar}
              name={dataUser?.username}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">{dataUser?.isDoctor ? "Dr.":"Patient "}{dataUser?.username}</h3>
            {console.log(dataUser)}
            <p className="-my-2 text-sm">
              {dataUser.online ? <span className="text-primary">{t('live_chat.online')}</span> : <span className="text-slate-400">{t('live_chat.offline')}</span>}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      <section className="h-5/6 overflow-x-hidden overflow-y-scroll scrollbar relative bg-gray-200 bg-opacity-80">
  <div className="flex flex-col gap-2 py-2 mx-2 h-[51vh]" ref={currentMessage}>
    {allMessage?.map((msg, index) => {
      const isCurrentUser = user._id === msg?.msgByUserId;
      return (
        <div
          key={index}
          className={`rounded-lg max-w-[280px] md:max-w-sm lg:max-w-md shadow-md ${
            isCurrentUser
              ? 'self-end bg-teal-100 text-right'
              : 'self-start bg-white text-left'
          }`}
        >
          <div className="w-full relative">
            {msg?.imageUrl && (
              <img
                src={msg?.imageUrl}
                className="w-full h-full object-scale-down rounded-md"
              />
            )}
            {msg?.videoUrl && (
              <video
                src={msg.videoUrl}
                className="w-full h-full object-scale-down rounded-md"
                controls
              />
            )}
          </div>
          {msg?.text && <p className="px-2 pt-1 break-words">{msg.text}</p>}
          <p className="text-xs text-gray-500 px-2">
            {moment(msg.createdAt).format('hh:mm')}
          </p>
        </div>
      );
    })}
        </div>

        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600" onClick={handleClearUploadImage}>
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img src={message.imageUrl} alt="uploadImage" className="aspect-square w-full h-full max-w-sm m-2 object-scale-down" />
            </div>
          </div>
        )}

        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600" onClick={handleClearUploadVideo}>
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video src={message.videoUrl} className="aspect-square w-full h-full max-w-sm m-2 object-scale-down" controls muted autoPlay />
            </div>
          </div>
        )}

        {loading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <Loading />
          </div>
        )}
      </section>

      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button onClick={handleUploadImageVideoOpen} className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary ">
            <FaPlus size={20} />
          </button>

          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label htmlFor="uploadImage" className="flex items-center p-2 px-3 gap-3  cursor-pointer">
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>{t('live_chat.image')}</p>
                </label>
                <label htmlFor="uploadVideo" className="flex items-center p-2 px-3 gap-3  cursor-pointer">
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>{t('live_chat.video')}</p>
                </label>
                <input type="file" id="uploadImage" onChange={handleUploadImage} className="hidden" />
                <input type="file" id="uploadVideo" onChange={handleUploadVideo} className="hidden" />
              </form>
            </div>
          )}
        </div>

        <form className="w-full h-full flex gap-2" onSubmit={handleSendMessage}>
          <input type="text" placeholder={t('live_chat.type_here')} className="py-1 px-4 outline-none border-none rounded w-full h-full" value={message.text} onChange={handleOnChange} />
          <button className="text-primary hover:text-secondary">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
};
MessagePage.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string
  })
};

export default MessagePage;