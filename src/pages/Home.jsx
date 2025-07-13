import { motion } from "framer-motion";
import FeaturesCard from "../components/FeaturesCard";
import logo from "../assets/coclinic.png";
import { useTranslation } from 'react-i18next';

const Home = () => {

    const { t } = useTranslation();

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-95" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${logo})` }} />

        <div className="relative z-10 mx-auto px-4 md:px-8 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={textVariants}
              className="text-center md:text-left space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
              >
                {t('home.headline')}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                  {t('home.digital')}
                </span>
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              >
                {t('home.description')}
              </motion.p>

              <motion.div
                variants={textVariants}
                className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300"
                >
                  {t('home.get_started')}
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors duration-300"
                  onClick={handleLearnMoreClick}
                >
                  {t('home.learn_more')}
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={textVariants}
                className="mt-12 flex flex-wrap justify-center md:justify-start gap-6 items-center"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.hipaa')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{t('home.rated')}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl transform rotate-3" />
              <div className="relative p-8 bg-white rounded-xl shadow-2xl transform -rotate-3">
                <img 
                  src={logo} 
                  alt="Healthcare Illustration" 
                  className="rounded-lg w-full h-auto object-cover animate-pulse-slow"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{t('home.patient_served')}</h3>
                  <p className="text-gray-500 mt-2">{t('home.join_growing')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        id="features-section"
        className="py-20 bg-gradient-to-b from-white to-green-50"
      >
        <FeaturesCard />
      </motion.div>
    </div>
  );
};

export default Home;