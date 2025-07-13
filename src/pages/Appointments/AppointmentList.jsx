import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment,
  updateAppointmentStatus,
} from '../../features/appointment/appointmentSlice';
import moment from 'moment';
import { FaStethoscope, FaUserInjured, FaClock, FaTimesCircle, FaUserCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const AppointmentList = ({ userType }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointment);

  useEffect(() => {
    if (userType === 'patient') {
      dispatch(getPatientAppointments({}));
    } else {
      dispatch(getDoctorAppointments({}));
    }
  }, [dispatch, userType]);

  if (loading) return <p className="text-center text-gray-500">{t('general.loading')}</p>;
  if (error) return <p className="text-center text-red-500">{t('general.error')}: {error}</p>;

  return (
    <div className="grid gap-6 min-lg:grid-cols-2 min-h-[60vh]">
      {appointments?.length === 0 && (
  <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow border border-gray-200 min-h-[300px] flex flex-col justify-center items-center">
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      {userType === 'patient'
        ? t('appointment.empty.patient_title')
        : t('appointment.empty.doctor_title')}
    </h2>
    <p className="text-gray-500 text-md max-w-md">
      {userType === 'patient'
        ? t('appointment.empty.patient_description')
        : t('appointment.empty.doctor_description')}
    </p>
  </div>
)}


      {appointments?.map((appointment) => (
        <div
          key={appointment._id}
          className="group bg-white p-6 rounded-2xl hover:shadow-lg transition-shadow border-2 border-[#3d4756] relative"
        >
          <div className={`absolute top-4 ${currentLanguage === 'en' ? 'right-4' : 'left-4'} font-normal font-sm`}>
            {appointment.status === 'pending' && (
              <div className="bg-yellow-100 flex items-center gap-2 border-1 border-yellow-100 rounded-lg p-1">
                <p className="text-sm">{t('appointment.status.pending')}</p>
                <FaClock className="text-lg text-amber-500" />
              </div>
            )}
            {appointment.status === 'completed' && (
              <div className="bg-green-100 flex items-center gap-2 border-1 border-green-100 rounded-lg p-1">
                <p className="text-sm">{t('appointment.status.completed')}</p>
                <FaClock className="text-lg text-green-600" />
              </div>
            )}
            {appointment.status === 'confirmed' && (
              <div className="bg-blue-100 flex items-center gap-2 border-1 border-blue-100 rounded-lg p-1">
                <p className="text-sm">{t('appointment.status.confirmed')}</p>
                <FaUserCheck className="text-lg text-blue-600" />
              </div>
            )}
            {appointment.status === 'cancelled' && (
              <div className="bg-red-100 flex items-center gap-2 border-1 border-red-100 rounded-lg p-1">
                <p className="text-sm">{t('appointment.status.cancelled')}</p>
                <FaTimesCircle className="text-lg text-rose-500" />
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                {userType === 'patient' ? (
                  <FaStethoscope className="text-emerald-600 text-xl" />
                ) : (
                  <FaUserInjured className="text-emerald-600 text-xl" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {userType === 'patient' ? `Dr. ${appointment.doctor?.name}` : appointment.patient?.name}
                </h3>
                <p className="text-sm text-emerald-600">
                  {userType === 'patient'
                    ? appointment.doctor?.specialty || 'General Practitioner'
                    : t('appointment.patient.consultation')}
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-2 border-l-2 border-[#3d4756]">
              <div className="flex items-center gap-3 text-gray-600">
                <p className="font-medium">{t('appointment.general.date')}</p>
                <span className="underline font-bold">{moment(appointment.start).format('MMM Do, YYYY')}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <p className="font-medium">{t('appointment.general.from')}</p>
                <p className="underline font-bold">{moment(appointment.start).format('h:mm A')}</p>
                <p className="font-medium">{t('appointment.general.to')}</p>
                <p className="underline font-bold">{moment(appointment.end).format('h:mm A')}</p>
              </div>
              {appointment.notes && (
                <div className="flex items-start gap-3 text-gray-600">
                  <p className="font-medium">{t('appointment.general.note')}</p>
                  <p className="text-gray-600 font-bold">{appointment.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-emerald-50 pt-4">
              {userType === 'patient' && appointment.status === 'pending' && (
                <button
                  onClick={() => dispatch(cancelAppointment(appointment._id))}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 px-2 py-1 bg-rose-50 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <FaTimesCircle />
                  {t('appointment.patient.cancel_consultaion')}
                </button>
              )}
            </div>
          </div>

          {userType === 'doctor' && (
            <select
              value={appointment.status}
              onChange={(e) => dispatch(updateAppointmentStatus({ id: appointment._id, status: e.target.value }))}
              className="mt-2 border p-1 rounded w-full"
              disabled={['cancelled', 'completed'].includes(appointment.status)}
            >
              <option value="pending">{t('appointment.status.pending')}</option>
              <option value="confirmed">{t('appointment.status.confirmed')}</option>
              <option value="completed">{t('appointment.status.completed')}</option>
              <option value="cancelled">{t('appointment.status.cancelled')}</option>
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;