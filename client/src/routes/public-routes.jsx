import Login from "../pages/auth/login.jsx";
import SignUp from "../pages/auth/sign-up.jsx";
import Home from "../pages/landing/home.jsx";

export const PublicRoutes = [
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/sign-up',
      element: <SignUp/>,
    }
];

// export default PublicRoutes;