import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppointmentUrls } from '../../utils/serverURL';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../utils/axiosInstance';

import { store } from '../../app/store';


const AppointmentConfirmation = () => {
  const sessionId = store.getState().other.sessionId;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);



  

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axiosInstance.post(`${AppointmentUrls.verifyPayment}`, {
          sessionId: sessionId
        });

        console.log('data in appointment confifmation =====> ', data)

        const appointment_id = data?.data?.appointmentId

        if (!appointment_id) {
          console.error('appointmentId not found in the response')
          return ;
        }

        const appointment_exists  = await axiosInstance.get(`${AppointmentUrls.patient}?appointmentId=${appointment_id}`);

        console.log('appointment_exists.data ====> ', appointment_exists?.data?.data[0])

        

        console.log('appoinemtnId in appointment confifmation =====> ', appointment_id)

        if (appointment_id) {
          setAppointment(appointment_exists?.data?.data[0]);
          toast.success(t(appointment_exists?.data?.message || 'appointment.confirmation.success'));
        } else {
          toast.error(t('appointment.confirmation.not_found'));
          console.error(t('appointment.confirmation.not_found'));
          // navigate('/appointment');
        }
      } catch (error) {
        console.log("error in response from appointment confirmatino ====> ", error)
        toast.error(error.response?.data?.message || t('appointment.confirmation.failed'));
        // navigate('/appointment');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [sessionId, navigate, t]);

  if (loading) return <div>{t('general.loading')}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('appointment.confirmation.title')}</h1>
      {appointment && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-medium">
            {t('appointment.confirmation.with')} Dr. {appointment.doctor?.name}
          </p>
          <p className="text-gray-600 mt-2">
            {t('appointment.confirmation.date')}: {moment(appointment.start).format('MMM Do YYYY, h:mm a')}
          </p>
          <p className="text-gray-600 mt-2">
            {t('appointment.confirmation.duration')}: {t('appointment.confirmation.time')}
          </p>
          {appointment.notes && (
            <p className="text-gray-600 mt-2">
              {t('appointment.confirmation.notes')}: {appointment.notes}
            </p>
          )}
          <p className="text-gray-600 mt-2">
            {t('appointment.confirmation.status')}: {appointment.status}
          </p>
          <button
            onClick={() => navigate('/appointment')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {t('appointment.confirmation.view_appointments')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentConfirmation;