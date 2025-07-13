import { Modal, Button, Table, TableHead, TableHeadCell, TableBody, TableCell, ModalHeader, ModalBody, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CommentUrls } from "../../utils/serverURL";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";



//////// translation is required here


// Reusable Comment Table Component
function CommentTable ({ comments, onDelete }) {

  const {t} = useTranslation()

  return (
    <Table hoverable className="shadow-md relative !text-black">
    <TableHead className="!text-black">
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.date')}</TableHeadCell>
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.content')}</TableHeadCell>
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.no_of_likes')}</TableHeadCell>
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.post_id')}</TableHeadCell>
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.user_id')}</TableHeadCell>
      <TableHeadCell className="!bg-gray-200">{t('dashboard.comments.delete')}</TableHeadCell>
    </TableHead>
    <TableBody className="divide-y" >
      {comments.map((comment) => (
        <TableRow
          key={comment._id}
          className="bg-white dark:border-gray-100 dark:bg-gray-50"
        >
          <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
          <TableCell>{comment.content}</TableCell>
          <TableCell>{comment.numberOfLikes}</TableCell>
          <TableCell>{comment.postId}</TableCell>
          <TableCell>{comment.userId}</TableCell>
          <TableCell>
            <span
              onClick={() => onDelete(comment._id)}
              className="font-medium text-red-500 hover:underline cursor-pointer"
            >
              {t('dashboard.comments.delete')}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
};

export default function DashComments() {
  const {t} = useTranslation() 
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(CommentUrls.getAll);
        const data = await res.data
        if (data.status == 'success') {
          setComments(data.data);
          if (data.data.length < 9) setShowMore(false);
        }
      } catch (error) {
        toast.error(t('dashboard.comments.error'), error?.message || t('dashboard.comments.unkown'));
        console.error(t('dashboard.comments.error'), error?.message || t('dashboard.comments.unkown'));
      }
    };
    if (currentUser?.isAdmin) fetchComments();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await axiosInstance.get(`${CommentUrls.getAll}?startIndex=${startIndex}`);
      const data = await res.data;
      if (data.status == 'success') {
        setComments((prev) => [...prev, ...data.data]);
        if (data.data.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.error(t('dashboard.comments.error_more'), t('dashboard.comments.unkown'));
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await axiosInstance.delete(`${CommentUrls.deleteOne}/${commentIdToDelete}`);

      const data = res.data

      if (data.status == 'success') {
        setComments(comments.filter((c) => c._id !== commentIdToDelete));
      }
    } catch (error) {
      toast.error(t('dashboard.comments.error_delete'), error?.message || t('dashboard.comments.unkown'));
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 !bg-[#f0faf7] dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <CommentTable
            comments={comments}
            onDelete={(id) => {
              setShowModal(true);
              setCommentIdToDelete(id);
            }}
          />
          {showMore && (
            <Button
              onClick={handleShowMore}
              color="teal"
              className="w-full self-center text-sm py-7 mt-5 bg-gray-200"
            >
              {t('dashboard.comments.more')}
            </Button>
          )}
        </>
      ) : (
        <p> {t('dashboard.comments.no_comment')}</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {t('dashboard.comments.delete?')}
            </h3>
            <div className="flex justify-center gap-4 ">
              <Button color="failure" className="bg-gray-200 px-2 cursor-pointer" onClick={handleDeleteComment}>
                {t('dashboard.comments.sure_delete')}
              </Button>
              <Button className="bg-gray-200 px-2 cursor-pointer" color="failure" onClick={() => setShowModal(false)}>
                {t('dashboard.comments.no_cancel')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}