import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import {  deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from "../features/user/userSlice";
import { AuthUrls, UserUrls } from "../utils/serverURL";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import i18n from "../i81n";
const Profile = () => {
  const {t} = useTranslation()
  const [profileImage, setProfileImage] = useState(null);
  const {loading, error} = useSelector(state=>state.user)
  const [success, setSuccess] = useState(null)
  const profileImageRef = useRef(null);
  const fileRef = useRef();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        profileImageRef.current = file; // Store the file for submission
      };
      reader.readAsDataURL(file);
    } else {
      alert(t('profile.please_select'));
    }
  };
  const currentLanguage = i18n.language;

  const handleSubmit = async (e) => {

    
    dispatch(updateUserStart())
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("name", usernameRef.current.value);
    formData.append("age", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    
    if (profileImageRef.current instanceof File) {
      formData.append("profileImage", profileImageRef.current);
    }


  };


    async function update() {
          try {
      const res = await axiosInstance.post(`${UserUrls.update}/`+currentUser._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.success) {
        dispatch(updateUserSuccess(res.data))
        setSuccess(res?.data?.message)
        
        
        
      } else {
        dispatch(updateUserFailure(res.data.error || t('profile.update_failed')))
        setSuccess(null)
      

        
      }
    } catch (error) {
      console.log(error)

      dispatch(updateUserFailure(error.response?.data?.error || error.message || t('profile.update_failed')))
      setSuccess(null)
      
    }
    }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await axiosInstance.post(AuthUrls.signOut);
      // const data = await res.json();
      console.log(data.data)
      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.data));
        return;
      }
      localStorage.removeItem('chatConversationId');
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const data = await axiosInstance.delete(`${UserUrls.delete}/${currentUser._id}`);
      
      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.data));
        return;
      }
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data));
    }
  };

  
  
  return (
    <div className="bg-[#f0faf7] w-full">
      <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">{t('profile.profile')}</h1>

      {/* <div className={`max-lg:hidden   ${currentLanguage === 'en' ? 'left-4' : 'right-4'} z-10`}>
            <LanguageSwitcher />
        </div> */}
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          ref={fileRef}
          id="avatar"
          accept="image/*"
          onChange={handleImageChange}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={profileImage || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="name"
          id="name"
          className="border p-3 rounded-lg"
          ref={usernameRef}
          defaultValue={currentUser.name}
        />
        <input
          type="age"
          placeholder="age"
          id="age"
          className="border p-3 rounded-lg"
          ref={usernameRef}
          defaultValue={currentUser.age}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          ref={passwordRef}
        />
        <button disabled={loading} onClick={update} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? t('profile.loading') : t('profile.update')}
        </button>
      </form>
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-blue-500">{success}</p>}
      
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">{t('profile.delete')}</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">{t('profile.signout')}</span>
      </div>
    </div>
    </div>
  );
};

export default Profile;