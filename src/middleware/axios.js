import axios from 'axios';
import { API_URL } from '@env';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL, // Replace with your API URL
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add Authorization token
    // const token = 'your-auth-token'; // Replace with your token logic
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log('Request:', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Example: Log the response data
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Handle response error globally
    console.error('Response Error:', error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (like logging out the user)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
