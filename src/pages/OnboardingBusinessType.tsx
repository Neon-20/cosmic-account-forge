
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import OnboardingLayout from '@/components/OnboardingLayout';
import { Check, Briefcase, Code, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

type BusinessType = 'marketing' | 'software' | 'design' | '';

const OnboardingBusinessType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<BusinessType>('');

  useEffect(() => {
    // Check if previous step was completed
    const businessData = localStorage.getItem('onboarding-business');
    if (!businessData) {
      navigate('/onboarding/business-info');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedType) {
      localStorage.setItem('onboarding-business-type', JSON.stringify({ businessType: selectedType }));
      navigate('/onboarding/address');
    }
  };

  const businessTypes = [
    {
      id: 'marketing',
      title: 'Marketing Agency',
      description: 'Specializing in digital marketing, branding, and advertising campaigns.',
      icon: Briefcase
    },
    {
      id: 'software',
      title: 'Software Developer',
      description: 'Building digital products, apps, and technical solutions.',
      icon: Code
    },
    {
      id: 'design',
      title: 'Graphic Designer',
      description: 'Creating visual content, branding, and design assets.',
      icon: PenTool
    }
  ];

  return (
    <OnboardingLayout 
      title="What type of business are you?" 
      description="Select the option that best describes your business."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {businessTypes.map((type) => (
            <div
              key={type.id}
              className={cn(
                "relative border rounded-lg p-6 cursor-pointer transition-all duration-200",
                selectedType === type.id
                  ? "border-cosmic-accent bg-cosmic-accent/10"
                  : "border-gray-700 hover:border-gray-500"
              )}
              onClick={() => setSelectedType(type.id as BusinessType)}
            >
              {selectedType === type.id && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-cosmic-accent rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800 rounded-full mb-4">
                  <type.icon className="w-6 h-6 text-cosmic-accent" />
                </div>
                <h3 className="font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-gray-400">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/onboarding/business-info')}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="bg-cosmic-accent hover:bg-cosmic-accent/90"
            disabled={!selectedType}
          >
            Continue
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default OnboardingBusinessType;
