import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  const authed = localStorage.getItem('tpt_admin_session') === 'true';

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}