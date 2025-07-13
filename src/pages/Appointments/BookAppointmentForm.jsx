import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointmentCheckout, getDoctors } from '../../features/appointment/appointmentSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { setOthers } from '../../features/others/otherSlices';



const BookAppointmentForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  

  const { doctors, loading, error } = useSelector((state) => state.appointment);
  const [doctorId, setDoctorId] = useState('');
  const [start, setStart] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      toast.error(t('appointment.book.please_select'));
      return;
    }

    try {
      const result = await dispatch(
        createAppointmentCheckout({
          doctorId,
          start: start.toISOString(), // Convert to ISO string for backend
          notes,
        })
      ).unwrap();

      // Redirect to Stripe checkout
      dispatch(setOthers(result?.data?.sessionId))
      // console.log(result?.data)
      window.location.href = result.data.url;
      
    } catch (err) {
      toast.error(err || t('appointment.book.checkout_failed'));
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {isFormVisible ? t('appointment.form.hide') : t('appointment.form.book')}
      </button>
      {isFormVisible && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('appointment.book.appointment_1')}</h2>
          {loading && <p className="text-gray-500">{t('appointment.book.loading')}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('appointment.book.select_doctor')}</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('appointment.book.select_doctor')}</option>
                {doctors?.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              {!doctorId && <p className="text-red-500 text-xs mt-1">{t('appointment.book.please_select')}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('appointment.book.date_time')}</label>
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('appointment.book.notes')}</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {loading ? t('appointment.book.processing') : t('appointment.book.appointment_2')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentForm;