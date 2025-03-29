
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/hooks/use-toast';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'store_owner' | 'admin';
  allowGuest?: boolean;
};

const ProtectedRoute = ({ 
  children, 
  requiredRole,
  allowGuest = false
}: ProtectedRouteProps) => {
  const { user, userRole, isLoading, isGuest } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Allow guest access if specified
  if (allowGuest && isGuest && (!requiredRole || requiredRole === 'customer')) {
    return <>{children}</>;
  }

  // Check if user is authenticated
  if (!user && !isGuest) {
    toast({
      title: "Authentication required",
      description: "Please login to access this page",
      variant: "destructive",
    });
    return <Navigate to="/auth" />;
  }

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    toast({
      title: "Access restricted",
      description: `This page is only accessible to ${requiredRole}s`,
      variant: "destructive",
    });
    
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
