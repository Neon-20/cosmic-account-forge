
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OnboardingLayout from '@/components/OnboardingLayout';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const OnboardingAccountSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if previous step was completed
    const businessSizeData = localStorage.getItem('onboarding-business-size');
    if (!businessSizeData) {
      navigate('/onboarding/business-size');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
      confirmPassword: ''
    };
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('onboarding-account', JSON.stringify(formData));
      
      // Process all data from all steps
      try {
        const personal = JSON.parse(localStorage.getItem('onboarding-personal') || '{}');
        const business = JSON.parse(localStorage.getItem('onboarding-business') || '{}');
        const businessType = JSON.parse(localStorage.getItem('onboarding-business-type') || '{}');
        const address = JSON.parse(localStorage.getItem('onboarding-address') || '{}');
        const businessSize = JSON.parse(localStorage.getItem('onboarding-business-size') || '{}');
        const account = JSON.parse(localStorage.getItem('onboarding-account') || '{}');
        
        // Combine all data
        const allData = {
          ...personal,
          ...business,
          ...businessType,
          ...address,
          ...businessSize,
          ...account
        };
        
        // Store combined data
        localStorage.setItem('onboarding-complete', JSON.stringify(allData));
        
        // Show success message and navigate to the dashboard
        toast({
          title: "Account created successfully!",
          description: "Welcome to Cosmic Studio. Redirecting to your dashboard...",
        });
        
        // Navigate to the dashboard in a real app
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Error processing onboarding data:', error);
        toast({
          title: "An error occurred",
          description: "There was a problem creating your account. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Please check your information",
        description: "Make sure all fields are filled correctly",
        variant: "destructive"
      });
    }
  };

  return (
    <OnboardingLayout 
      title="Create your account" 
      description="Choose a username and set a secure password for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        
        <div className="text-sm text-gray-400 mt-4">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/onboarding/business-size')}
          >
            Back
          </Button>
          <Button type="submit" className="bg-cosmic-accent hover:bg-cosmic-accent/90">
            Create Account
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default OnboardingAccountSetup;
