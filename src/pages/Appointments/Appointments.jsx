import { useSelector } from 'react-redux';
import PatientAppointmentView from './PatientAppointmentView';
import DoctorAppointmentView from './DoctorAppointmentView';

const Appointment = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-[#f0faf7] p-5">
      {currentUser?.isDoctor ? <DoctorAppointmentView /> : <PatientAppointmentView />}
    </div>
  );
};

export default Appointment;