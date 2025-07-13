import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CommentUrls } from "../../utils/serverURL";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";



////// translation is required here 


// Reusable Comment Form Component
function CommentForm ({ onSubmit, comment, setComment, loading, error }) {
  const {t} = useTranslation();
  return (
  <form onSubmit={onSubmit} className="border border-teal-500 rounded-md p-3">
    <Textarea
      placeholder="Write a comment..."
      rows={3}
      maxLength={200}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="resize-none p-2 focus:ring-teal-500 focus:border-teal-500"
      color="black"
    />
    <div className="flex justify-between items-center mt-5">
      <p className="text-gray-500 text-xs">
        {200 - comment.length} {t('books.comment.chars_remaining')}
      </p>
      <Button
        color="black"
        outline
        type="submit"
        disabled={loading}
        className="p-1 bg-teal-100 hover:bg-teal-500 hover:text-white transition-colors"
      >
        {loading ? t('books.comment.submitting') : t('books.comment.submit')}
      </Button>
    </div>
    {error && <Alert color="failure" className="mt-5">{error}</Alert>}
  </form>
)};

// Reusable Comment List Component
function CommentList  ({ comments, onLike, onEdit, onDelete }) {
  const {t} = useTranslation()
  
  return (
    <>
    <div className="text-sm my-5 flex items-center gap-1">
      <p>{t('books.comment.name')}</p>
      <div className="border border-gray-400 py-1 px-2 rounded-sm">
        {comments.length}
      </div>
    </div>
    {comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        onLike={onLike}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </>
  )
};

export default function CommentSection({ postId }) {
  const {t} = useTranslation()
  
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`${CommentUrls.getPostComments}/${postId}`);



        console.log("res in comment section =====> ", res)


        const data = await res.data;

        console.log("data in comment section ====> ", data)

        if (data.status == 'success') {
          setComments(data.data);
        } else {
          console.log(res)
          toast.error(t('books.comment.failed'), res.statusText);
          console.error(t('books.comment.failed'), res.statusText);
        }
      } catch (error) {
        toast.error(t('books.comment.error'), error.message || t('books.comment.unkown'));
        console.error(t('books.comment.error'), error.message || t('books.comment.unkown') );
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length === 0 || comment.length > 200) {
      setCommentError(t('books.comment.length'));
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(CommentUrls.create, {
      content: comment,
      postId,
      userId: currentUser._id,
    });;
      const data = await res.data;
      if (data.status == "success") {
        setComment("");
        setCommentError(null);
        setComments([data.data, ...comments]);
      } else {
        setCommentError(data.message || t('books.failed'));
      }
    } catch (error) {
      setCommentError(t('books.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axiosInstance.put(`${CommentUrls.likeOne}/${commentId}`);
      const data = await res.data;
      if (data.status == "success") {
        const data = await res.json();
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? { ...c, likes: data.data.likes, numberOfLikes: data.data.likes.length }
              : c
          )
        );
      }
    } catch (error) {
      toast.error(t('books.comment.error_like'), error.message || t('books.comment.unkown') );
      console.error(t('books.comment.error_like'), error.message || t('books.comment.unkown') );
    }
  };

  const handleEdit = (comment, editedContent) => {
    setComments(
      comments.map((c) => (c._id === comment._id ? { ...c, content: editedContent } : c))
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axiosInstance.delete(`${CommentUrls.deleteOne}/${commentId}`);
      const data = await res.data;
      if (data.status == "success") {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (error) {
      console.error(t('books.comment.error_delete'), error.message || t('books.comment.unkown'));
    }
  };

  console.log(t('books.comment.no_comments'));
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>{t('books.comment.as')}</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.avatar}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          {t('books.comment.must')}
          <Link className="text-blue-500 hover:underline" to="/signin">
            {t('books.comment.sign')}
          </Link>
        </div>
      )}
      {currentUser && (
        <CommentForm
          onSubmit={handleSubmit}
          comment={comment}
          setComment={setComment}
          loading={loading}
          error={commentError}
        />
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">{t('books.comment.no_comments')}</p>
      ) : (
        <CommentList
          comments={comments}
          onLike={handleLike}
          onEdit={handleEdit}
          onDelete={(id) => {
            setShowModal(true);
            setCommentToDelete(id);
          }}
        />
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {t('dashboard.comments.delte?')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
                {t('dashboard.comments.sure_delte?')}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                {t('dashboard.comments.no_cancel?')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}