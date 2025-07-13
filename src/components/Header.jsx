import logo from "../assets/coclinic.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  deleteUserFailure,
  unSetProfile,
  deleteUserSuccess,
  setAndUnSetProfile,
  signOutUserStart,
} from "../features/user/userSlice";
import { AuthUrls } from "../utils/serverURL";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const location = useLocation();

  const dispatch = useDispatch();
  const { currentUser, profile } = useSelector((state) => state.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change or language change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, currentLanguage]);

  const handleProfile = () => dispatch(setAndUnSetProfile());
  const handleUnsetProfile = () => dispatch(unSetProfile());

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axiosInstance.post(AuthUrls.signOut);
      if (data.status !== "success") {
        dispatch(deleteUserFailure(data));
        return;
      }
      localStorage.removeItem('chatConversationId');
      dispatch(deleteUserSuccess(data));
      localStorage.removeItem("aiChatMessages");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const navLinks = [
    { to: "/", label: t('header.home') },
    ...(currentUser ? [
      { to: "/aichat", label: t('header.ai_chat') },
      { to: "/livechat", label: t('header.live_chat') },
      { to: "/appointment", label: t('header.appointments') },
      { to: "/resource", label: t('header.resources') },
    ] : []),
    { to: "/about", label: t('header.about') },
  ];
  const adminLink = { to: "/dashboard", label: t('header.dashboard') };
  const doctorLink = { to: "/create-book", label: t('header.create_book') };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold"
      : "text-gray-600 hover:text-green-700 transition-colors duration-200";

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="relative">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
            <div onClick={handleUnsetProfile} className="flex items-center space-x-8">
              <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <FaBars className="w-6 h-6 text-gray-700" />
              </button>
              <NavLink to="/">
                <div className="hidden md:block">
                  <h1 className="text-4xl font-semibold text-gray-800">
                    <span className="text-green-600">{t('header.co')}</span>
                    <span className="text-green-800">{t('header.clinic')}</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">{t('header.slogan')}</p>
                </div>
              </NavLink>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('header.find')}
                className="w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm"
              />
            </div>
            <div className={`hidden lg:block ${currentLanguage === 'en' ? 'left-4' : 'right-4'} z-10`}>
              <LanguageSwitcher />
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to} className={linkClass}>
                    {link.label}
                  </NavLink>
                ))}
                {currentUser?.isAdmin && (
                  <NavLink to={adminLink.to} className={linkClass}>
                    {adminLink.label}
                  </NavLink>
                )}
                {currentUser?.isDoctor && (
                  <NavLink to={doctorLink.to} className={linkClass}>
                    {doctorLink.label}
                  </NavLink>
                )}
              </nav>
              {currentUser ? (
                <div className="relative ml-4">
                  <button onClick={handleProfile} className="flex items-center space-x-2">
                    <img className="h-9 w-9 rounded-full border-2 border-green-100" src={currentUser.avatar} alt="User profile" />
                  </button>
                  {profile && (
                    <div className={`absolute ${currentLanguage === 'en' ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50`}>
                      <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50" onClick={handleProfile}>{t('header.my_profile')}</NavLink>
                      <button onClick={handleSignOut} className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t('header.sign_out')}</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex">
                  <NavLink to="/signup" className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm shadow-sm">{t('header.sign_up')}</NavLink>
                  <NavLink to="/signin" className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm shadow-sm">{t('header.sign_in')}</NavLink>
                </div>
              )}
            </div>
            <div className="flex-1 p-2 lg:hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400" />
                </div>
                <input type="text" placeholder={t('header.find')} className="min-w-0 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-100 text-sm" />
              </div>
            </div>
            <div className="ml-4 lg:hidden flex">
              {currentUser ? (
                <div className="relative">
                  <button onClick={handleProfile} className="flex items-center space-x-2">
                    <img className="h-9 w-9 rounded-full border-2 border-green-100" src={currentUser.avatar} alt="User profile" />
                  </button>
                  {profile && (
                    <div className={`absolute ${currentLanguage==='en'?'right-0':'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50`}>
                      <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50" onClick={handleProfile}>{t('header.my_profile')}</NavLink>
                      <button onClick={handleSignOut} className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t('header.sign_out')}</button>
                    </div>
                  )}
                </div>
              ) : (
                <>  
                  <NavLink to="/signin" className="px-2 py-2 text-sm underline">{t('header.sign_in')}</NavLink>
                  <NavLink to="/signup" className="ml-4 px-2 py-2 text-sm underline">{t('header.sign_up')}</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between p-4">
            <LanguageSwitcher />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <FaTimes className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>
            ))}
            {currentUser?.isAdmin && <NavLink to={adminLink.to} className={linkClass}>{adminLink.label}</NavLink>}
            {currentUser?.isDoctor && <NavLink to={doctorLink.to} className={linkClass}>{doctorLink.label}</NavLink>}
          </div>
          <div className="p-4 border-t border-gray-200">
            {currentUser ? (
              <>
                <NavLink to="/profile" className="block py-2 text-gray-700 hover:text-green-700">{t('header.my_profile')}</NavLink>
                <button onClick={handleSignOut} className="block py-2 text-gray-700 hover:text-green-700">{t('header.sign_out')}</button>
              </>
            ) : (
              <>
                <NavLink to="/signup" className="block py-2 text-gray-700 hover:text-green-700">{t('header.sign_up')}</NavLink>
                <NavLink to="/signin" className="block py-2 text-gray-700 hover:text-green-700">{t('header.sign_in')}</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
