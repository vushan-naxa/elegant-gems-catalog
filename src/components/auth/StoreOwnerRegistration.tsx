
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import MapSelector from '@/components/map/MapSelector';

type StoreOwnerRegistrationProps = {
  onSubmit: () => void;
};

const StoreOwnerRegistration = ({ onSubmit }: StoreOwnerRegistrationProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactInfo: '',
    address: '',
    latitude: 27.7172 as number, // Default to Kathmandu
    longitude: 85.3240 as number // Default to Kathmandu
  });

  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        store_name: formData.storeName
      };
      
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        'store_owner',
        metadata
      );
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      const { error: storeError } = await supabase
        .from('stores')
        .update({
          name: formData.storeName,
          description: `${formData.firstName}'s store`,
          contact_info: formData.contactInfo,
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude
        })
        .eq('owner_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (storeError) {
        toast({
          title: "Store details update failed",
          description: storeError.message,
          variant: "destructive",
        });
      }
      
      toast({
        title: "Registration successful",
        description: "Your store has been created!",
      });
      
      onSubmit();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="storeName">Store Name</Label>
        <Input
          id="storeName"
          name="storeName"
          placeholder="Your Jewelry Store"
          required
          value={formData.storeName}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Info</Label>
        <Input
          id="contactInfo"
          name="contactInfo"
          placeholder="Phone number or email"
          value={formData.contactInfo}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Store Address (Optional)</Label>
        <Input
          id="address"
          name="address"
          placeholder="Enter store address description"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Store Location</Label>
        <p className="text-xs text-gray-500 mb-2">Drag the marker or click on the map to set your store location</p>
        <MapSelector
          initialLat={formData.latitude}
          initialLng={formData.longitude}
          onLocationSelect={handleLocationSelect}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register Store'}
      </Button>
    </form>
  );
};

export default StoreOwnerRegistration;
