import { Routes, Route } from 'react-router-dom';
// import { PrivateRoutes } from './private-routes';
// import { FallbackRoute } from './fallback-route';
import { PublicRoutes } from './public-routes';

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
            {/* {PrivateRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <ProtectedRoute>
                            {route.element}
                        </ProtectedRoute>
                    }
                />
            ))}
            {FallbackRoute.map((route, index) => (
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