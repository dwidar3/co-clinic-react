import { useTranslation } from 'react-i18next';
import AppointmentList from './AppointmentList';

const DoctorAppointmentView = () => {
  const {t} = useTranslation()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('appointment.general.mine')}</h1>
      <AppointmentList userType="doctor" />
    </div>
  );
};

export default DoctorAppointmentView;