import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppointmentUrls } from '../../utils/serverURL';
import axiosInstance from '../../utils/axiosInstance';

export const bookAppointment = createAsyncThunk(
  'appointment/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(AppointmentUrls.create, appointmentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Booking failed');
    }
  }
);

export const createAppointmentCheckout = createAsyncThunk(
  'appointment/createAppointmentCheckout',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(AppointmentUrls.checkout, appointmentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Checkout failed');
    }
  }
);

export const getPatientAppointments = createAsyncThunk(
  'appointment/getPatientAppointments',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(AppointmentUrls.patient, { params});
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const getDoctorAppointments = createAsyncThunk(
  'appointment/getDoctorAppointments',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(AppointmentUrls.doctor, { params});
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointment/cancelAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${AppointmentUrls.delete}/${appointmentId}`);
      return appointmentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Cancellation failed');
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointment/updateAppointmentStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`${AppointmentUrls.status}/${id}`, { status });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Status update failed');
    }
  }
);

export const getDoctors = createAsyncThunk(
  'appointment/getDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(AppointmentUrls.doctors);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload.data);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointmentCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointmentCheckout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAppointmentCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPatientAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getPatientAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((appt) => appt._id !== action.payload);
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.appointments = state.appointments.map((appt) =>
          appt._id === action.payload._id ? action.payload : appt
        );
      })
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;