// api/uploadFile.js
import axiosInstance from '../utils/axiosInstance';
import { UploadUrls } from '../utils/serverURL';

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(UploadUrls.uploadFile, formData, {
      headers: {
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Upload error:", error?.response?.data || error.message);
    throw error; 
  }
};

export default uploadFile;
