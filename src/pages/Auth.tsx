
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import CustomerRegistration from '@/components/auth/CustomerRegistration';
import StoreOwnerRegistration from '@/components/auth/StoreOwnerRegistration';
import AdminRegistration from '@/components/auth/AdminRegistration';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registerType, setRegisterType] = useState<'customer' | 'store_owner' | 'admin'>('customer');
  
  const { userRole, isLoading, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && userRole) {
      if (userRole === 'store_owner') {
        navigate('/store');
      } else if (userRole === 'admin') {
        navigate('/admin/update-price');
      } else {
        navigate('/');
      }
    }
  }, [userRole, isLoading, navigate]);

  const handleSuccessfulAuth = () => {
    // Navigation will happen automatically through the useEffect
  };

  // Show a loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Hamro Gahana</CardTitle>
          <CardDescription className="text-center">
            Your destination for premium jewelry
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <CardContent className="space-y-4 pt-4">
              <LoginForm onSubmit={handleSuccessfulAuth} />
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={continueAsGuest}
              >
                Continue as Guest
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="register">
            <CardContent className="pt-4">
              <div className="flex justify-center space-x-2 mb-6">
                <Button
                  type="button"
                  size="sm"
                  variant={registerType === 'customer' ? 'default' : 'outline'}
                  onClick={() => setRegisterType('customer')}
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={registerType === 'store_owner' ? 'default' : 'outline'}
                  onClick={() => setRegisterType('store_owner')}
                >
                  Store Owner
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={registerType === 'admin' ? 'default' : 'outline'}
                  onClick={() => setRegisterType('admin')}
                >
                  Admin
                </Button>
              </div>
              
              {registerType === 'customer' && (
                <CustomerRegistration onSubmit={handleSuccessfulAuth} />
              )}
              
              {registerType === 'store_owner' && (
                <StoreOwnerRegistration onSubmit={handleSuccessfulAuth} />
              )}
              
              {registerType === 'admin' && (
                <AdminRegistration onSubmit={handleSuccessfulAuth} />
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={continueAsGuest}
              >
                Continue as Guest
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
