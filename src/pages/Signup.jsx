import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/coclinic.png";
import { AuthUrls } from "../utils/serverURL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaVenusMars, FaStethoscope, FaUserShield } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Signup = () => { 
  const {t} = useTranslation()

  console.log(t('signup.button'))



const roles = [
  { value: "patient", label: t('signup.role.patient'), isDoctor: false, isAdmin: false, icon: FaUser },
  { value: "doctor", label: t('signup.role.doctor'), isDoctor: true, isAdmin: false, icon: FaStethoscope },
  { value: "admin", label: t('signup.role.admin'), isDoctor: false, isAdmin: true, icon: FaUserShield },
];

const baseFields = [
  {
    key: "username",
    label: t('signup.username'),
    description: t('signup.username_description'),
    icon: FaUser,
  },
  {
    key: "email",
    label: t('signup.email'),
    description: t('signup.email_description'),
    icon: FaEnvelope,
  },
  {
    key: "name",
    label: t('signup.name'),
    description: t('signup.name_description'),
    icon: FaUser,
  },
  {
    key: "password",
    label: t('signup.password'),
    type: "password",
    description: t('signup.password_description'),
    icon: FaLock,
  },
  {
    key: "birthDate",
    label: t('signup.birthdate'),
    description: t('signup.birthdate_description'),
    icon: FaCalendarAlt,
  },
  {
    key: "gender",
    label: t('signup.gender'),
    type: "select",
    options: ["male", "female", ],
    genderOption: t('signup.gender_options'),
    description: t('signup.gender_description'),
    icon: FaVenusMars,
  },
];

const additionalFields = {
  doctor: [
    {
      key: "specialization",
      label: t('signup.specialization'),
      description: t('signup.specialization_description'),
      icon: FaStethoscope,
    },
  ],
};


  const navigate = useNavigate();
  const [formData, setFormData] = useState({ role: "patient", isDoctor: false, isAdmin: false });
  const [openAlert, setOpenAlert] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [birthDate, setBirthDate] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const selectedRole = roles.find((role) => role.value === e.target.value);
    setFormData({
      ...formData,
      role: selectedRole.value,
      isDoctor: selectedRole.isDoctor,
      isAdmin: selectedRole.isAdmin,
    });
  };

  const handleDateChange = (date) => {
    setBirthDate(date);
    setFormData({ ...formData, birthDate: date ? date.toISOString().split("T")[0] : "" });
  };

  const handleSubmit = async () => {
    const requiredFields = [...baseFields, ...(additionalFields[formData.role] || [])];
    const emptyFields = requiredFields.filter((field) => !formData[field.key]);

    if (emptyFields.length > 0) {
      setOpenAlert(true);
      setSnackbarMessage(t('signup.fill_all2'));
      setSnackbarSeverity("error");
      return;
    }

    setOpenAlert(false);
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        name: formData.name,
        password: formData.password,
        birthDate: formData.birthDate,
        gender: formData.gender,
        isDoctor: formData.isDoctor,
        isAdmin: formData.isAdmin,
        specialization: formData.specialization || undefined,
      };

      const response = await axios.post(AuthUrls.signUp, payload);
      console.log(response.data);
      setSnackbarMessage("Registration successful! Please verify your email.");
      setSnackbarSeverity("success");
      setRegistrationSuccess(true);
      setTimeout(() => {
  navigate("/verify-email");
}, 2000);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setSnackbarMessage(error?.response?.data.message || "Registration failed.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-green-500">{t('signup.coclinic')}</h1>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
          <p className="text-gray-700">
            {t('signup.headline')}
          </p>
        </div>

        {openAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>{t('signup.fill_all2')}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            {t('signup.fill_all2')}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {baseFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <field.icon className="mr-2 text-gray-500" />
                {field.label}
              </label>
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
              {field.key === "birthDate" ? (
                <DatePicker
  selected={birthDate}
  onChange={handleDateChange}
  dateFormat="yyyy-MM-dd"
  showYearDropdown
  scrollableYearDropdown
   yearDropdownItemNumber={100}
  minDate={new Date(1900, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
  placeholderText={t('signup.select_b_date')}
/>

              ) : field.type === "select" ? (
                <select
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">{t('signup.select')}</option>
                  {field.options.map((option, index) => (
                    <option key={option} value={option} >
                      {t(`signup.gender_options.${option}`)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              )}
            </div>
          ))}

          {additionalFields[formData.role]?.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <field.icon className="mr-2 text-gray-500" />
                {field.label}
              </label>
              <p className="text-xs text-gray-500 mb-2">{field.description}</p>
              <input
                type="text"
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          {t('signup.button')}
        </button>

        {registrationSuccess && (
          <Link to="/signin">
            <button className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {t('signup.go_login')}
            </button>
          </Link>
        )}

        {snackbarMessage && (
          <div
            className={`mt-4 p-4 rounded-md text-center ${
              snackbarSeverity === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;