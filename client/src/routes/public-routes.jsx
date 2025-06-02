import Login from "../pages/auth/login.jsx";
import SignUp from "../pages/auth/sign-up.jsx";
import VerifyEmail from "../pages/auth/verify-email.jsx";
import Layout from "../pages/landing/layout.jsx";
import OAuthCallback from "../components/auth/oauth-callback.jsx";

export const PublicRoutes = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  { 
    path: '/oauth', 
    element: <OAuthCallback />, 
  },
];

// export default PublicRoutes;