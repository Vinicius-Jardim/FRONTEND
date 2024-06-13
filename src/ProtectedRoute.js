import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../src/authcontext/AuthContext'; // substitua por seu hook de autenticação

function ProtectedRoute({ element, ...rest }) {
  const { user } = useAuth();

  return (
    <Route {...rest} element={user ? element : <Navigate to="/login" replace />} />
  );
}

export default ProtectedRoute;