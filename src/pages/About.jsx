import React from 'react';
import { useTranslation } from "react-i18next";
import { FaUserMd, FaRobot, FaMobileAlt, FaShieldAlt, FaGlobe, FaHandHoldingHeart, FaHeartbeat, FaUsers, FaLightbulb, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const { t } = useTranslation();

  function signupPage() {

  }
  
  // Features data
  const features = [
    { 
      icon: <FaUserMd className="text-3xl text-blue-500" />, 
      title: t('about.live_consultations'), 
      description: t('about.live_consultations_desc') 
    },
    { 
      icon: <FaRobot className="text-3xl text-green-500" />, 
      title: t('about.ai_assistant'), 
      description: t('about.ai_assistant_desc') 
    },
    { 
      icon: <FaMobileAlt className="text-3xl text-purple-500" />, 
      title: t('about.mobile_app'), 
      description: t('about.mobile_app_desc') 
    },
    { 
      icon: <FaShieldAlt className="text-3xl text-amber-500" />, 
      title: t('about.secure_messaging'), 
      description: t('about.secure_messaging_desc') 
    },
    { 
      icon: <FaGlobe className="text-3xl text-teal-500" />, 
      title: t('about.global_access'), 
      description: t('about.global_access_desc') 
    },
    { 
      icon: <FaHandHoldingHeart className="text-3xl text-pink-500" />, 
      title: t('about.mental_health'), 
      description: t('about.mental_health_desc') 
    },
  ];
  
  // Values data
  const values = [
    { icon: <FaHeartbeat className="text-2xl text-red-500" />, title: t('about.patient_first') },
    { icon: <FaChartLine className="text-2xl text-blue-500" />, title: t('about.innovation') },
    { icon: <FaUsers className="text-2xl text-green-500" />, title: t('about.accessibility') },
    { icon: <FaLightbulb className="text-2xl text-amber-500" />, title: t('about.transparency') },
  ];
  
  // Statistics data
  const stats = [
    { value: '98%', label: t('about.patient_satisfaction') },
    { value: '24/7', label: t('about.availability') },
    { value: '50k+', label: t('about.patients_served') },
    { value: '200+', label: t('about.medical_professionals') },
  ];
  
  // Team data
  const teamMembers = [
    { id: 1, name: t('about.dr_sarah'), role: t('about.medical_director') },
    { id: 2, name: t('about.dr_ahmed'), role: t('about.tech_lead') },
    { id: 3, name: t('about.dr_emma'), role: t('about.patient_experience') },
    { id: 4, name: t('about.dr_mohammed'), role: t('about.ai_research') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white rounded-full p-3 mb-6 shadow-md">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <FaHeartbeat className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t('about.co')}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {t('about.description1')}
          </p>
          <p className="text-lg text-gray-600">
            {t('about.description2')}
          </p>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-blue-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('about.our_mission')}</h2>
          <p className="text-gray-600 mb-6">
            {t('about.our_mission_content')}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaUsers className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('about.accessibility')}</h3>
                <p className="text-gray-600">{t('about.accessibility_desc')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaLightbulb className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('about.quality')}</h3>
                <p className="text-gray-600">{t('about.quality_desc')}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-green-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('about.our_values')}</h2>
          <p className="text-gray-600 mb-6">
            {t('about.our_values_desc')}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl">
                <div className="mb-2">{value.icon}</div>
                <h3 className="font-semibold">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.our_services')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.our_services_desc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.our_team')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.our_team_desc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map(member => (
            <div 
              key={member.id} 
              className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-blue-600 mb-3">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {t('about.join_us_today')}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('about.cta_description')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={'/'} className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
            {t('about.learn_more')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;