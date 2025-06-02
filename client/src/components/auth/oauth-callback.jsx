// import { useLocation, useNavigate } from "react-router-dom";
// import axiosClient from "../../utils/axiosClient";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const OAuthCallback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const accessToken = queryParams.get('accessToken');

//     const handleAuth = async () => {
//       if (accessToken) {
//         try {
//           // Store the access token
//           localStorage.setItem('accessToken', accessToken);
          
//           // Fetch user data using the access token
//           const res = await axiosClient.get('/users/me');
//           const user = res.data.data;
          
//           // Update Redux state
//           dispatch(loginUser.fulfilled(user));
//           toast.success('Login successful!');
//           navigate('/dashboard');
//         } catch (error) {
//           toast.error('Failed to fetch user data');
//           navigate('/login');
//         }
//       } else {
//         navigate('/login');
//       }
//     };

//     handleAuth();
//   }, [location, navigate, dispatch]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <p>Completing authentication...</p>
//     </div>
//   );
// };

// export default OAuthCallback;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setUser } from "../../redux/auth/authSlice";
import { generateAccessToken } from "../../redux/auth/authApi";
import toast from "react-hot-toast";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const OAuthHandle = async() => {
      try {
      const queryParams = new URLSearchParams(window.location.search);
      const user = {
        userName: queryParams.get("userName"),
        email: queryParams.get("email"),
        name: queryParams.get("name"),
        avatar: queryParams.get("avatar"),
      };

      if (user.userName && user.email) {
        dispatch(setUser(user));
        if(!localStorage.getItem("accessToken")){
          await generateAccessToken();
        }
        dispatch(setLogin(true));

        window.history.replaceState({}, document.title, "/");
        navigate('/dashboard', { replace: true });
      }else{
        toast.error("Something went wrong");
        navigate('/login', { replace: true });
      }}
      catch(err){
        console.log("[OAUTH-ERROR-CALLBACK]: "+ err);
        navigate('/login', { replace: true });
      }
    }
    
    OAuthHandle();
    
  }, [dispatch, navigate]);

  return (
    <div>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default OAuthCallback;
