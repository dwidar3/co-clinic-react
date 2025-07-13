import BookAppointmentForm from './BookAppointmentForm';
import AppointmentList from './AppointmentList';
import { useTranslation } from 'react-i18next';

const PatientAppointmentView = () => {
  const {t} = useTranslation()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {t('appointment.general.mine')}
      </h1>
      <BookAppointmentForm />
      <AppointmentList userType="patient" />
    </div>
  );
};

export default PatientAppointmentView;