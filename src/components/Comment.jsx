/* eslint-disable react/prop-types */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import {CommentUrls, UserUrls} from '../utils/serverURL'
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';



export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const {t} = useTranslation()
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`${UserUrls.getById}/${comment.userId}`);
        console.log("in general ==>",data.data)
        const data = await res.data;
        if (res.status == 'success') {
          setUser(data.data);
          console.log("in success ==>",data.data)
          
        }
      

      } catch (error) {
        console.log("error",error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

const handleSave = async () => {
  try {
    const res = await axiosInstance.put(
      `${CommentUrls.editOne}/${comment._id}`,
      {
        content: editedContent,
      }
    );
    const data = res.data;
    if (data.status === 'success') {
      setIsEditing(false);
      onEdit(comment, editedContent);
    }
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={currentUser.avatar}
          alt={currentUser.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {currentUser ? `@${currentUser.username}` : t('dashboard.comments.anonymous')}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2 pt-1 pl-1'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              color='black'
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                className='text-black border-1'
                onClick={handleSave}
              >
                {t('dashboard.comments.save')}
              </Button>
              <Button
                type='button'
                size='sm'
                className='text-black border-1 hover:text-red'
                onClick={() => setIsEditing(false)}
              >
                {t('dashboard.comments.cancel')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      {t('dashboard.comments.edit')}
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      {t('dashboard.comments.delete')}
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
