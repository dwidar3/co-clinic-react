import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../features/user/userSlice";
import { setToken } from "../features/chat/chatSlice";
import { AuthUrls } from "../utils/serverURL";
import logo from "../assets/coclinic.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Oauth from "../components/Oauth";
import { useTranslation } from "react-i18next";


import axiosInstance from "../utils/axiosInstance";



const Signin = () => {
  const {t} = useTranslation()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error(t('signin.fields_error'));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('signin.email_error'));
      return false;
    }
    if (password.length < 8) {
      toast.error(t('signin.password_length'));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    dispatch(signInStart());
    try {
      const response = await axiosInstance.post(AuthUrls.signIn, formData);

      if (response.data.status !== 'success') {
        toast.error(response.data.error || t('signin.login_failed'));
        dispatch(signInFailure(response.data.error));
        return;
      }

      dispatch(signInSuccess(response.data.data));
      dispatch(setToken(response.data.data.token));
      localStorage.setItem("token", response.data.data.token);
      toast.success(t('signin.singin_sucess'));
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || t('signin.something_wrong');
      toast.error(message);
      dispatch(signInFailure({ message }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-green-500">{t('signin.coclinic')}</h1>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
          <p className="text-gray-700">
            {t('signin.headline')}
          </p>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" />
              {t('signin.email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              placeholder={t('signin.email_placeholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaLock className="mr-2 text-gray-500" />
              {t('signin.password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              placeholder={t('signin.password_placeholder')}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          {loading ? t('signin.loading') : t('signin.button')}
        </button>

        {/* <Oauth /> */}

        <p className="text-center mt-4 text-sm text-gray-600">
          {t('signin.no_account')}{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            {t('signin.here')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
