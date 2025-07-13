import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthUrls, AppointmentUrls } from '../../utils/serverURL';
import { toast } from 'react-toastify';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientAppointments, getDoctorAppointments, cancelAppointment } from '../../features/appointment/appointmentSlice';
import BookAppointmentForm from './BookAppointmentForm'; // Import the updated form
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

const AppointmentPage = () => {

  const {t} = useTranslation()

  const dispatch = useDispatch();
  const { currentUser, appointments, loading, error } = useSelector((state) => ({
    currentUser: state.user.currentUser,
    appointments: state.appointment.appointments,
    loading: state.appointment.loading,
    error: state.appointment.error,
  }));
  const [isDoctor, setIsDoctor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsDoctor(currentUser?.isDoctor);
        if (currentUser?.isDoctor) {
          dispatch(getDoctorAppointments({ page: 1, limit: 10 }));
        } else {
          dispatch(getPatientAppointments({ page: 1, limit: 10 }));
        }
      } catch (error) {
        toast.error(error?.data?.message || t('appointment.confirmation.failed'));
      }
    };

    fetchUserData();
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await axiosInstance.put(
        `${AppointmentUrls.status}/${appointmentId}`,
        { status: newStatus }
      );
      dispatch(getPatientAppointments({ page: 1, limit: 10 })); // Refresh appointments
      toast.success(t('appointment.confirmation.status_updated'));
    } catch (error) {
      toast.error(error.response?.data?.message || t('appointment.confirmation.status_failed'));
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();
      toast.success(t('appointment.confirmation.app_cancelled'));
    } catch (error) {
      toast.error(error?.response?.message || t('appointment.confirmation.app_failed'));
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div>{t('appointment.confirmation.loading')}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          {isDoctor ? t('appointment.confirmation.my') : t('appointment.confirmation.your')}
        </h1>
      </div>

      {!isDoctor && <BookAppointmentForm />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{t('appointment.confirmation.upcoming')}</h3>
            </div>
            <div className="divide-y">
              {appointments.length === 0 ? (
                <div className="p-6 text-center text-gray-500">{t('appointment.confirmation.no_appointments')}</div>
              ) : (
                appointments.map((appt) => (
                  <div key={appt._id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {isDoctor ? appt.patient?.name : appt.doctor?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {moment(appt.start).format('MMM Do YYYY, h:mm a')}
                        </p>
                        <p className="text-sm mt-1">{appt.notes}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(appt.status)}
                        <div className="flex flex-col gap-2">
                          {!isDoctor && appt.status === 'pending' && (
                            <button
                              onClick={() => handleCancelAppointment(appt._id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              {t('appointment.confirmation.cancel')}
                            </button>
                          )}
                          {isDoctor && appt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(appt._id, 'confirmed')}
                                className="text-green-600 hover:text-green-700 text-sm"
                              >
                                {t('appointment.confirmation.confirm')}
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appt._id, 'cancelled')}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                {t('appointment.confirmation.decline')}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            tileClassName={({ date }) => {
              const hasAppointment = appointments.some((appt) =>
                moment(date).isSame(appt.start, 'day')
              );
              return hasAppointment ? 'bg-green-50' : '';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;