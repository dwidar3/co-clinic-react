import { Container, Typography, Box, Link, Grid, TextField, Button } from '@mui/material';
import { FaHeartbeat, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { RiMentalHealthFill } from 'react-icons/ri';
import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const {t} = useTranslation()

  return (
    <Box className="bg-[#0f3d3e] text-white pt-8 pb-6">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Health Care Philosophy */}
          <Grid item xs={12} md={4}>
            <Box className="flex items-center mb-4">
              <RiMentalHealthFill className="text-3xl mr-2 text-[#8dbbb4]" />
              <Typography variant="h6" className="font-semibold">
                {t('footer.brand')}
              </Typography>
            </Box>
            <Typography variant="body2" className="text-gray-300 mb-4">
              {t('footer.description')}
            </Typography>
            <Box className="flex space-x-4">
              <BsFacebook className="text-xl hover:text-[#8dbbb4] cursor-pointer" />
              <BsTwitter className="text-xl hover:text-[#8dbbb4] cursor-pointer" />
              <BsLinkedin className="text-xl hover:text-[#8dbbb4] cursor-pointer" />
              <BsInstagram className="text-xl hover:text-[#8dbbb4] cursor-pointer" />
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('footer.services')}
            </Typography>
            <Box className="flex flex-col space-y-2">
              <Link href="/appointment" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.appointments')}
              </Link>
              <Link href="/aichat" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.ai_consultation')}
              </Link>
              <Link href="/livechat" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.emergency_chat')}
              </Link>
              <Link href="/recoveryplan" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.recovery_plans')}
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('footer.contact_us')}
            </Typography>
            <Box className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#8dbbb4]" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-[#8dbbb4]" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-[#8dbbb4]" />
                <span>{t('footer.email')}</span>
              </div>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('footer.health_tips')}
            </Typography>
            <Typography variant="body2" className="text-gray-300 mb-3">
              {t('footer.subscribe_prompt')}
            </Typography>
            <div className="relative w-full">
  <input
    type="email"
    placeholder={t('footer.your_email')}
    className="w-full px-4 py-2 text-sm bg-white rounded-lg border-none outline-none focus:ring-2 focus:ring-[#8dbbb4] pr-28 text-black"
  />
  <button
    className="absolute right-1 top-1 bg-[#8dbbb4] hover:bg-[#6d9c94] text-white px-4 py-1 rounded-md transition-colors duration-200 text-sm font-medium"
    style={{ height: 'calc(100% - 8px)' }}
  >
    {t('footer.subscribe')}
  </button>
</div>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box className="border-t border-[#8dbbb4] my-6" />

        {/* Bottom Footer */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" className="text-gray-300 ">
              {t('footer.copyright')}
            </Typography>
          </Grid>
          <Grid item >
            <Box className="flex space-x-4 gap-2.5">
              <Link href="/privacy" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.privacy_policy')}
              </Link>
              <Link href="/terms" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.terms_of_service')}
              </Link>
              <Link href="/cookies" color="inherit" underline="hover" className="text-gray-300">
                {t('footer.cookies_policy')}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;