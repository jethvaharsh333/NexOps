import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // to allow sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// List of endpoints that should NOT trigger refresh logic
const publicRoutes = [
  '/user/signup',
  '/user/send-otp',
  '/user/verify-email',
  '/user/reset-password',
];

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get access token from local storage
    console.log(token); // Log the token for debugging

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers if it exists
    } 
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Reject the promise if there's an error
  }
);

// Refresh logic on 401 errors
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config; 

    const isPublicRoute = publicRoutes.some(route =>
      originalRequest.url.includes(route)
    );

    if (error.response?.status === 401 && !originalRequest._retry && !isPublicRoute && error.response.data?.message === 'Unauthorized - Invalid token') {
      originalRequest._retry = true;

      try {
        console.log("Going to get accessToken with the help of refreshToken");
        //refreshToken is sent via secure httpOnly cookie
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/generate-access-token`,
          {},
          { withCredentials: true }
        );        

        const { accessToken } = refreshResponse.data;

        // Save new accessToken in localStorage (or memory)
        localStorage.setItem('accessToken', accessToken);

        // Retry the original request with new access token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed. Logging out...');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
