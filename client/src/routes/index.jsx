import { Routes, Route } from 'react-router-dom';
// import { PrivateRoutes } from './private-routes';
// import { FallbackRoute } from './fallback-route';
import { PublicRoutes } from './public-routes';
import { PrivateRoutes } from './private-routes';
import ProtectedRoute from '../utils/protected-route.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            {PublicRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
            {PrivateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                    {route.children?.map((child, idx) => (
                        <Route key={idx} path={child.path} element={child.element} />
                    ))}
                </Route>
            ))}
            {/* {FallbackRoute.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))} */}
        </Routes>
    )
}

export default AppRoutes;