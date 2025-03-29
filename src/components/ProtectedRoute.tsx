
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'store_owner' | 'admin';
};

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user, userRole, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect users to appropriate page based on their role
    if (userRole === 'store_owner') {
      return <Navigate to="/store" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin/update-price" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
