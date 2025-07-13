import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../features/user/userSlice";
import { UserUrls, AuthUrls } from "../../utils/serverURL";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";

// Reusable Profile Form Component
const ProfileForm = ({ currentUser, onSubmit, loading, error, success }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fileRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("email", emailRef.current.value);
    if (passwordRef.current.value) formData.append("password", passwordRef.current.value);
    if (fileRef.current.files[0]) formData.append("profileImage", fileRef.current.files[0]);
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <input
        hidden
        type="file"
        ref={fileRef}
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
        placeholder="Username"
        className="border p-3 rounded-lg focus:ring-teal-500 focus:border-teal-500"
        ref={usernameRef}
        defaultValue={currentUser.username}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded-lg focus:ring-teal-500 focus:border-teal-500"
        ref={emailRef}
        defaultValue={currentUser.email}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-lg focus:ring-teal-500 focus:border-teal-500"
        ref={passwordRef}
      />
      <button
        disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-slate-600 disabled:opacity-80 transition-colors"
      >
        {loading ? "Updating..." : "Update"}
      </button>
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-blue-500">{success}</p>}
    </form>
  );
};

const DashProfile = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (formData) => {
    dispatch(updateUserStart());
    try {
      const res = await axiosInstance.post(UserUrls.update + currentUser._id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status == 'success' ) {
        dispatch(updateUserSuccess(res.data.data));
        setSuccess(res.data.message);
      } else {
        dispatch(updateUserFailure(res?.data?.error || t('dashboard.profile.failed_update')));
        setSuccess(null);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.response?.data?.error || error?.message));
      setSuccess(null);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axiosInstance.post(AuthUrls.signOut);
      if (data.status === "success") {
        localStorage.removeItem('chatConversationId');
        dispatch(deleteUserSuccess(data));
      } else {
        dispatch(deleteUserFailure(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const { data } = await axiosInstance.delete(`${UserUrls.delete}/${currentUser._id}`);
      if (data.status === "success") {
        dispatch(deleteUserSuccess(data.data));
      } else {
        dispatch(deleteUserFailure(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error?.response?.data || error.message ));
    }
  };

  

  return (
    <div className="w-full bg-[#f0faf7]">
      <div className="p-3 w-1/2 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">{t('dashboard.profile.name')}</h1>
      <ProfileForm
        currentUser={currentUser}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
      />
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer hover:underline">
          {t('dashboard.profile.delete')}
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer hover:underline">
          {t('dashboard.profile.signout')}
        </span>
      </div>
    </div>
    </div>
  );
};

export default DashProfile;