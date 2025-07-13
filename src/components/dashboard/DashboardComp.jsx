import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import {
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { UserUrls, BookUrl, CommentUrls } from '../../utils/serverURL';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

// Define a consistent theme
const theme = {
  primaryColor: 'bg-gray-200', // Used for icons and buttons
  secondaryColor: 'bg-gray-100', // Card backgrounds
  hoverColor: 'hover:bg-gray-300', // Button hover
  textColor: 'text-black',
};

// Reusable Summary Card Component with hover effects
function SummaryCard  ({ title, total, lastMonth, icon: Icon }) {
  const {t} = useTranslation()

  return (
    <div className={` flex flex-col p-3 ${theme.secondaryColor} gap-4 md:w-72 w-full rounded-md shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl`}>  
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-700 text-md uppercase font-sm">{title}</h3>
        <p className="text-2xl">{total}</p>
      </div>
      <Icon className={` bg-gray-500 text-white rounded-full text-5xl p-3 shadow-lg transition-colors duration-20`} />
    </div>
    <div className="flex gap-2 text-sm">
      <span className="text-green-500 flex items-center transition-colors duration-200 hover:text-green-600">
        <HiArrowNarrowUp />
        {lastMonth}
      </span>
      <div className="text-gray-500">{t('dashboard.card.last')}</div>
    </div>
  </div>
  )

  
};

// Reusable Table Component with hover effects
function DataTable  ({ title, data, columns, link }) {
  const {t} = useTranslation()

  return (
    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-100 transition-shadow duration-200 hover:shadow-lg text-black">
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2 text-black transition-colors duration-200 hover:text-gray-200 ">{title}</h1>
      <Button className={`${theme.primaryColor} ${theme.hoverColor} text-black transition-transform duration-200 hover:scale-105`}>  
        <Link to={link}>{t('dashboard.card.all')}</Link>
      </Button>
    </div>
    <Table hoverable>
      <TableHead className="relative">
        {columns.map((col, index) => (
          <TableHeadCell key={index} className="transition-colors duration-200 text-gray-600 hover:text-gray-900" align='center'>
            {col.header}
          </TableHeadCell>
        ))}
      </TableHead>
      <TableBody className="divide-y relative">
        {data.map((item, index) => (
          <TableRow key={index} className="bg-white dark:border-gray-700  transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex} align="center" className="text-black transition-colors duration-200 hover:text-gray-300">
                {col.render ? col.render(item) : item[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
  
};

export default function DashboardComp() {
  const {t} = useTranslation()
  const [dashboardData, setDashboardData] = useState({
    users: [],
    comments: [],
    posts: [],
    totalUsers: 0,
    totalComments: 0,
    totalPosts: 0,
    lastMonthUsers: 0,
    lastMonthComments: 0,
    lastMonthPosts: 0,
  });
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          axiosInstance.get(`${UserUrls.getAll}?limit=5`),
        axiosInstance.get(`${BookUrl.getAllBooks}?limit=5`),
        axiosInstance.get(`${CommentUrls.getAll}?limit=5`),
        ]);

        const usersData = usersRes.data;
      const postsData = postsRes.data;
      const commentsData = commentsRes.data;

      console.log(usersRes, postsData, commentsData)

      console.log("usersData.totalUsers ====> ", usersData.totalUsers)
      console.log("usersRes .ok ====> ", usersData.status)

        if (usersData.status == "success"  && postsData.status == "success" && commentsData.status == "success") {
          setDashboardData({
            users: usersData?.data,
            comments: commentsData?.data,
            posts: postsData?.data,
            totalUsers: usersData?.totalUsers,
            totalComments: commentsData?.totalComments,
            totalPosts: postsData?.totalPosts,
            lastMonthUsers: usersData?.lastMonthUsers,
            lastMonthComments: commentsData?.lastMonthComments,
            lastMonthPosts: commentsData?.lastMonthPosts,
          });
        }
      } catch (error) {
        toast.error( error?.response?.data?.message || t('dashboard.card.unkown'));
        console.error( error?.response?.data?.message || t('dashboard.card.unkown'));
      }
    };

    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser]);

  // Table column definitions
  const userColumns = [
    { header: t('dashboard.users.image'), render: (user) => <img src={user.avatar} alt="user" className="w-10 h-10 rounded-full bg-gray-500 transition-transform duration-200 hover:scale-110" /> },
    { header: t('dashboard.users.username'), key: 'username' },
  ];

  const commentColumns = [
    { header: t('dashboard.comments.content'), render: (comment) => <p className="line-clamp-2 transition-colors duration-200 hover:text-gray-400">{comment.content}</p> },
    { header: t('dashboard.comments.likes'), key: 'numberOfLikes' },
  ];

  const postColumns = [
    { header: t('dashboard.posts.image'), render: (post) => <img src={post.imageUrls[0]} alt="post" className="w-14 h-10 rounded-md bg-gray-500 transition-opacity duration-200 hover:opacity-80" /> },
    { header: t('dashboard.posts.title'), key: 'title' },
    { header: t('dashboard.posts.category'), render: (post) => (post.type === 'rent' ? 'Rent' : 'Sell') },
  ];

  return (
    <div className="p-3 md:mx-auto bg-[#f0faf7]">
      <div className="flex-wrap flex gap-4 justify-center">
        <SummaryCard
          title={t('dashboard.users.total')}
          total={dashboardData.totalUsers}
          lastMonth={dashboardData.lastMonthUsers}
          icon={HiOutlineUserGroup}
        />
        <SummaryCard
          title={t('dashboard.comments.total')}
          total={dashboardData.totalComments}
          lastMonth={dashboardData.lastMonthComments}
          icon={HiAnnotation}
        />
        <SummaryCard
          title={t('dashboard.posts.total')}
          total={dashboardData.totalPosts}
          lastMonth={dashboardData.lastMonthPosts}
          icon={HiDocumentText}
        />
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <DataTable title={t('dashboard.users.recent')} data={dashboardData.users} columns={userColumns} link="/dashboard?tab=users" />
        <DataTable title={t('dashboard.comments.recent')} data={dashboardData.comments} columns={commentColumns} link="/dashboard?tab=comments" />
        <DataTable title={t('dashboard.posts.recent')} data={dashboardData.posts} columns={postColumns} link="/dashboard?tab=posts" />
      </div>
    </div>
);}
