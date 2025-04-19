
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StarBackground from './StarBackground';
import CosmicBadge from './CosmicBadge';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  number: number;
  title: string;
  path: string;
}

const steps: StepProps[] = [
  { number: 1, title: 'Personal Info', path: '/onboarding/personal-info' },
  { number: 2, title: 'Business Info', path: '/onboarding/business-info' },
  { number: 3, title: 'Business Type', path: '/onboarding/business-type' },
  { number: 4, title: 'Address', path: '/onboarding/address' },
  { number: 5, title: 'Business Size', path: '/onboarding/business-size' },
  { number: 6, title: 'Account Setup', path: '/onboarding/account-setup' },
];

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  title,
  description
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Find current step based on URL
    const step = steps.findIndex(step => step.path === location.pathname) + 1;
    if (step > 0) setCurrentStep(step);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden px-4">
      <StarBackground />
      
      <header className="w-full pt-8 pb-4 z-10">
        <div className="container max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CosmicBadge className="w-10 h-10 sm:w-12 sm:h-12">
              <span className="text-xs sm:text-sm font-bold text-white">CS</span>
            </CosmicBadge>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-light">
              Cosmic Studio
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={cn(
                  "flex items-center",
                  currentStep === step.number ? "text-white" : "text-gray-400"
                )}
              >
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                    currentStep > step.number 
                      ? "bg-cosmic-accent" 
                      : currentStep === step.number 
                        ? "bg-secondary border border-cosmic-accent" 
                        : "bg-secondary border border-gray-700"
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                
                {step.number < steps.length && (
                  <ChevronRight className="h-4 w-4 mx-1 text-gray-600" />
                )}
              </div>
            ))}
          </div>
          
          <div className="md:hidden flex items-center space-x-1">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={cn(
                  "h-1 rounded",
                  step.number === currentStep 
                    ? "w-6 bg-cosmic-accent" 
                    : step.number < currentStep 
                      ? "w-6 bg-cosmic-accent/60" 
                      : "w-6 bg-gray-700"
                )}
              />
            ))}
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full z-10 py-8">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-gray-400 max-w-lg mx-auto">{description}</p>
          </div>
          
          <div className="fade-in bg-black/20 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-xl shadow-lg">
            {children}
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm z-10">
        <div className="container max-w-7xl">
          <p>© 2025 Cosmic Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingLayout;
