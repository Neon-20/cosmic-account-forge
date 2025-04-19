
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import OnboardingLayout from '@/components/OnboardingLayout';
import { useToast } from '@/components/ui/use-toast';

const OnboardingBusinessInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: ''
  });
  const [errors, setErrors] = useState({
    businessName: '',
    businessDescription: ''
  });

  useEffect(() => {
    // Check if previous step was completed
    const personalData = localStorage.getItem('onboarding-personal');
    if (!personalData) {
      navigate('/onboarding/personal-info');
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      businessName: formData.businessName ? '' : 'Business name is required',
      businessDescription: formData.businessDescription ? '' : 'Please provide a brief description'
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('onboarding-business', JSON.stringify(formData));
      navigate('/onboarding/business-type');
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
      title="Tell us about your business" 
      description="Help us understand your business and its needs."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={handleChange}
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessDescription">Business Description</Label>
          <Textarea
            id="businessDescription"
            name="businessDescription"
            placeholder="Briefly describe what your business does..."
            value={formData.businessDescription}
            onChange={handleChange}
            className={errors.businessDescription ? "border-red-500" : ""}
            rows={4}
          />
          {errors.businessDescription && (
            <p className="text-red-500 text-sm">{errors.businessDescription}</p>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/onboarding/personal-info')}
          >
            Back
          </Button>
          <Button type="submit" className="bg-cosmic-accent hover:bg-cosmic-accent/90">
            Continue
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default OnboardingBusinessInfo;
