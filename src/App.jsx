import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import LiveChat from "./pages/LiveChat";
import Footer from "./components/Footer";
import MessagePage from "./components/chat/MessagePage";
import HomeChat from "./components/chat/HomeChat";
import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";
import Book from "./pages/Book";
import Books from "./pages/Books";
import { ToastContainer } from "react-toastify";
import Appointment from "./pages/Appointments/Appointments";
import '@fontsource/abel'; // Defaults to 400
import '@fontsource/cairo'; // Defaults to 400
import VerifyEmail from "./pages/VerifyEmail";
import { Suspense, useEffect } from "react";
import AppointmentConfirmation from "./pages/Appointments/AppointmentConfirmation";
import { useTranslation } from "react-i18next";
import useLanguageEffect from "./hooks/useLanguageEffect";
import ChatPage from "./pages/AiChat/ChatPage";
import SelfChatbot from "./pages/SelfChatbotPage";
import Pneumonia from "./pages/PneumoniaPage";


import { useSelector } from 'react-redux';
import { store } from "./app/store";
import CreateBook from "./pages/CreateBook";
import UpdateBookPage from "./pages/UpdateBook";
import AIToolsShowcase from "./pages/AiTools";




const App = () => {

  useLanguageEffect();


  useEffect(() => {
  console.log('🧠 Redux language on app mount:', store.getState().language.language);
}, []);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={3000} />
      <div className={`w-full h-full`}>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/update-listing/:id" element={<UpdateBookPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pneumonia" element={<Pneumonia />} />
          <Route path="/aichat" element={<AIToolsShowcase/>} />
          <Route path="/self-chatbot" element={<SelfChatbot/>} />
          <Route path="/gemini" element={<ChatPage/>} />
          <Route path="/pneumonia" element={<Pneumonia/>} />
          <Route path="/self-bot" element={<SelfChatbot/>} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="/appointment/confirmation" element={<AppointmentConfirmation />} />
          <Route path="/livechat" element={<LiveChat/>} />

          <Route path="/resource" element={<Books/>} />
          <Route path="/resource/:listingId" element={<Book />} />
          <Route path="" element={<HomeChat />}>
            <Route path="/livechat/:userId" element={<MessagePage />} />
          </Route>
        </Route>
        <Route path="" element={<OnlyAdminPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
    </Suspense>
  );
};

export default App;
