import { motion } from "framer-motion";
import InspirationalQuotesCard from './cards/InspirationalQuotesCard';
import AIAssistantCard from './cards/AIAssistantCard';
import GetTherapistCard from './cards/GetTherapistCard';
import EducationalResourcesCard from './cards/EducationalResourcesCard';
import PersonalizedRecoveryCard from './cards/PersonalizedRecoveryCard';
import HabitTrackerCard from './cards/HabitTrackerCard';
import DashboardCard from './cards/DashboardCard';
import CommunitySupportCard from './cards/CommunitySupportCard';
import CrisisSupportCard from './cards/CrisisSupportCard';
import FeatureCard from './FeatureCard';
import { useTranslation } from "react-i18next";


// Import your card components...

const FeaturesCard = () => {

  const {t} = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('featured.title')}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              {t('featured.r_journey')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featured.description')}
          </p>
        </motion.div>

        {/* Main Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {[AIAssistantCard, GetTherapistCard, EducationalResourcesCard, 
            PersonalizedRecoveryCard, HabitTrackerCard, InspirationalQuotesCard].map((Card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard>
                <Card />
              </FeatureCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Upcoming Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-20 shadow-lg"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featured.coming_soon.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('featured.coming_soon.description')}
            </p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {[DashboardCard, CommunitySupportCard, CrisisSupportCard].map((Card, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <FeatureCard>
                    <Card />
                  </FeatureCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesCard;