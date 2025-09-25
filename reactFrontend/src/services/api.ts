import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StudentData {
  regNo: string;
  name: string;
  email: string;
}

export interface StudentResponse {
  message: {
    id: number;
    regNo: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

export const studentAPI = {
  createStudent: async (studentData: StudentData): Promise<StudentResponse> => {
    try {
      console.log('Sending data to API:', studentData);
      console.log('API URL:', `${API_BASE_URL}/student/create-student`);
      
      const response = await apiClient.post<StudentResponse>('/student/create-student', studentData);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
        
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Cannot connect to server. Please make sure the backend is running on port 3001.');
        }
        
        if (error.response?.status === 409) {
          throw new Error('Student with this registration number already exists.');
        }
        
        throw new Error(error.response?.data?.message || `Server error: ${error.response?.status}` || 'Failed to create student');
      }
      
      throw new Error('Network error - please check your connection');
    }
  },
};
