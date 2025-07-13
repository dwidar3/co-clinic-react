import { Modal, Table, Button, TableHead, TableHeadCell, TableBody, TableRow, TableCell, ModalHeader, ModalBody } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { UserUrls, AdminUrls } from '../../utils/serverURL';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

export default function DashUsers() {
  const {t} = useTranslation()
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [modalConfig, setModalConfig] = useState({ show: false, action: null, userId: null });

  console.log(users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(UserUrls.getAll);
        const data = res.data
        console.log("data ====> ",data)
        if (data?.status == 'success') {
          setUsers(data?.data);
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        toast.error(t('dashboard.users.error'), error?.message || t('dashboard.users.unkown'));
        console.error(t('dashboard.users.error'), error?.message || t('dashboard.users.unkown'));
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await axiosInstance.get(`${UserUrls.getAll}?startIndex=${startIndex}`);
      const data = await res?.data;
      if (data.status == 'success') {
        setUsers((prev) => [...prev, ...data.data]);
        if (data.data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error(t('dashboard.users.error_more'), error?.message || t('dashboard.users.unkown'));
      toast.error(t('dashboard.users.error_more'), error?.message || t('dashboard.users.unkown'));
    }
  };

  const handleAction = async () => {
    const { action, userId } = modalConfig;
    try {
      if (action === 'delete') {
        const res = await axiosInstance.delete(`${UserUrls.delete}/${userId}`);
        const data = res.data
        if (data.status == 'success') {
          setUsers((prev) => prev.filter((user) => user._id !== userId));
        }
      } else if (action === 'promoteDemote') {
        const res = await axiosInstance.patch(`${AdminUrls.toggle_approve}/${userId}`);
        const data = res.data
        if (data.status == 'success') {
          setUsers((prev) =>
            prev.map((user) => (user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user))
          );
        }
      }
    } catch (error) {
      console.error(t('dashboard.users.single_error'), error?.message || t('users.unkown'));
      toast.error(t('dashboard.users.single_error'), error?.message || t('users.unkown'));
    } finally {
      setModalConfig({ show: false, action: null, userId: null });
    }
  };

  return (
    <div className='className="w-full !bg-[#f0faf7]'>
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 relative">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='relative'>
            <TableHead >
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.image')} </TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.username')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.email')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.admin')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.doctor')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.approve')} / {t('dashboard.users.unapprove')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.date')}</TableHeadCell>
              <TableHeadCell className='bg-gray-200'>{t('dashboard.users.delete')}</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y bg-gray-100">
              {users.map((user) => (
                <TableRow key={user._id} className="bg-white dark:border-gray-700 !dark:bg-gray-100">
                  <TableCell align="center">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 object-cover bg-gray-500 rounded-full" />
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.isAdmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}</TableCell>
                  <TableCell align="center"z>{user.isDoctor ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}</TableCell>
                  <TableCell align="center">
                    <button
                      className={user.isAdmin ? 'text-red-500' : 'text-green-500'}
                      onClick={() => setModalConfig({ show: true, action: 'promoteDemote', userId: user._id })}
                    >

                      {user.isAdmin ? t('dashboard.users.unapprove') : t('dashboard.users.approve')}
                    </button>
                  </TableCell>
                  <TableCell align="center">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <span
                      onClick={() => setModalConfig({ show: true, action: 'delete', userId: user._id })}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      {t('dashboard.users.delete')}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              {t('dashboard.users.more')}
            </button>
          )}
        </>
      ) : (
        <p>{t('dashboard.users.no_users')}</p>
      )}
      <Modal show={modalConfig.show} onClose={() => setModalConfig({ show: false })} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {modalConfig.action === 'delete'
                ? t('dashboard.users.delete?')
                : ` ${t('dashboard.users.sure_to')}
                ${users.find((u) => u._id === modalConfig.userId)?.isAdmin ? t('dashboard.users.unapprove') : t('dashboard.users.approve')} `}
                {t('dashboard.users.this')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" className='px-3 bg-gray-200 cursor-pointer' onClick={handleAction}>
                {t('dashboard.users.sure_delete')}
              </Button>
              <Button color="failure" className='px-3 bg-gray-200 cursor-pointer' onClick={() => setModalConfig({ show: false })}>
                {t('dashboard.users.no_cancel')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
    </div>
    
  );
}