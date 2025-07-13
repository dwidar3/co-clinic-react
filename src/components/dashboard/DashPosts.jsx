import { Modal, Button, Table, TableHead, TableHeadCell, TableBody, ModalHeader, ModalBody, TableRow, TableCell } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BookUrl } from "../../utils/serverURL";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";

// Reusable Post Table Component
function PostTable ({ posts, onDelete })  {
  const {t} = useTranslation()

  return (
    <Table hoverable className="shadow-md relative">
    <TableHead>
      <TableHeadCell>{t('dashboard.posts.date')}</TableHeadCell>
      <TableHeadCell>{t('dashboard.posts.image')}</TableHeadCell>
      <TableHeadCell>{t('dashboard.posts.title')} </TableHeadCell>
      <TableHeadCell>{t('dashboard.posts.category')}</TableHeadCell>
      <TableHeadCell>{t('dashboard.posts.delete')}</TableHeadCell>
      <TableHeadCell>{t('dashboard.posts.edit')}</TableHeadCell>
    </TableHead>
    <TableBody className="divide-y relative">
      {posts?.map((post) => (
        <TableRow
          key={post._id}
          className="bg-white dark:border-gray-700 dark:bg-white"
        >
          <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
          <TableCell>
            <Link to={`/resource/${post._id}`}>
              <img
                src={post.imageUrls[0]}
                alt={post.name}
                className="w-20 h-10 object-cover bg-gray-500"
              />
            </Link>
          </TableCell>
          <TableCell>
            <Link
              className="font-medium text-gray-900 dark:text-white"
              to={`/listing/${post._id}`}
            >
              {post.name}
            </Link>
          </TableCell>
          <TableCell>{post.type === "rent" ? "Rent" : "Sell"}</TableCell>
          <TableCell>
            <span
              onClick={() => onDelete(post._id)}
              className="font-medium text-red-500 hover:underline cursor-pointer"
            >
              {t('dashboard.posts.delete')}
            </span>
          </TableCell>
          <TableCell>
            <Link
              className="text-teal-500 hover:underline"
              to={`/update-listing/${post._id}`}
            >
              {t('dashboard.posts.edit')}
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
};

export default function DashPosts() {
  const {t} = useTranslation()

  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(BookUrl.getAllBooks);

        const data = await res.data
        if (data.status == 'success') {
          setUserPosts(data.posts || data.data); // Handle varying response structures
          if ((data.posts || data.data).length < 9) setShowMore(false);
        }
      } catch (error) {
        toast.error(t('dashboard.posts.error'), error?.message || t('posts.unkown'));
        console.error(t('dashboard.posts.error'), error?.message || t('posts.unkown'));
      }
    };
    if (currentUser?.isAdmin) fetchPosts();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await axiosInstance.get(`${BookUrl.getAllBooks}?startIndex=${startIndex}`);
      const data =  res.data
      if (data.status == 'success') {
        setUserPosts((prev) => [...prev, ...(data.posts || data.data)]);
        if ((data.posts || data.data).length < 9) setShowMore(false);
      }
    } catch (error) {
      console.error(t('dashboard.posts.error_more'), error.message || t('posts.unkown'));
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axiosInstance.delete(`${BookUrl.delete}/${postIdToDelete}`);

      const data = res.data
      
      if (data.status == 'success') {
        setUserPosts(userPosts.filter((p) => p._id !== postIdToDelete));
      }
    } catch (error) {
      console.error(t('dashboard.posts.error_delete'), error.message || t('posts.unkown') );
    } finally {
      setShowModal(false);
    }
  };
  
  

  return (
    <div className="w-full !bg-[#f0faf7]">
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <PostTable
            posts={userPosts}
            onDelete={(id) => {
              setShowModal(true);
              setPostIdToDelete(id);
            }}
          />
          {showMore && (
            <Button
              onClick={handleShowMore}
              color="teal"
              className="w-full self-center text-sm py-7 hover:bg-teal-600"
            >
              {t('dashboard.posts.more')}
            </Button>
          )}
        </>
      ) : (
        <p>{t('dashboard.posts.no_posts')}</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {t('dashboard.posts.delete?')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                {t('dashboard.posts.sure_delete')}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                {t('dashboard.posts.no_cancel')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
    </div>
    
  );
}