
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import OnboardingLayout from '@/components/OnboardingLayout';
import { Check, User, Users, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type BusinessSize = 'solo' | 'small' | 'medium' | 'large' | '';

const OnboardingBusinessSize = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<BusinessSize>('');

  useEffect(() => {
    // Check if previous step was completed
    const addressData = localStorage.getItem('onboarding-address');
    if (!addressData) {
      navigate('/onboarding/address');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSize) {
      localStorage.setItem('onboarding-business-size', JSON.stringify({ businessSize: selectedSize }));
      navigate('/onboarding/account-setup');
    }
  };

  const businessSizes = [
    {
      id: 'solo',
      title: 'Solo Entrepreneur',
      description: 'Just you working on the business.',
      icon: User,
      employees: '1'
    },
    {
      id: 'small',
      title: 'Small Team',
      description: 'A small team working together.',
      icon: Users,
      employees: '2-10'
    },
    {
      id: 'medium',
      title: 'Medium Business',
      description: 'An established business with multiple teams.',
      icon: Building2,
      employees: '11-50'
    },
    {
      id: 'large',
      title: 'Large Enterprise',
      description: 'A large organization with many departments.',
      icon: Building2,
      employees: '50+'
    }
  ];

  return (
    <OnboardingLayout 
      title="What's your business size?" 
      description="Help us understand the scale of your operations."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {businessSizes.map((size) => (
            <div
              key={size.id}
              className={cn(
                "relative border rounded-lg p-6 cursor-pointer transition-all duration-200",
                selectedSize === size.id
                  ? "border-cosmic-accent bg-cosmic-accent/10"
                  : "border-gray-700 hover:border-gray-500"
              )}
              onClick={() => setSelectedSize(size.id as BusinessSize)}
            >
              {selectedSize === size.id && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-cosmic-accent rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-800 rounded-full mb-4">
                  <size.icon className="w-6 h-6 text-cosmic-accent" />
                </div>
                <h3 className="font-semibold mb-2">{size.title}</h3>
                <p className="text-sm text-gray-400 mb-1">{size.description}</p>
                <span className="inline-block px-3 py-1 bg-gray-800 text-xs rounded-full">
                  {size.employees} employees
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/onboarding/address')}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="bg-cosmic-accent hover:bg-cosmic-accent/90"
            disabled={!selectedSize}
          >
            Continue
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
};

export default OnboardingBusinessSize;
