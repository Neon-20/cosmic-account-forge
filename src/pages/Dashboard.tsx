
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import StarBackground from '@/components/StarBackground';
import CosmicBadge from '@/components/CosmicBadge';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  firstName: string;
  lastName: string;
  businessName: string;
  businessType: string;
  businessSize: string;
  // Add other fields as needed
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if onboarding is complete
    try {
      const data = localStorage.getItem('onboarding-complete');
      if (!data) {
        // If not complete, redirect to first step
        toast({
          title: "Complete your profile",
          description: "Please complete the onboarding process first.",
          variant: "destructive"
        });
        navigate('/onboarding/personal-info');
        return;
      }
      
      setUserData(JSON.parse(data));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen w-full relative">
      <StarBackground />
      
      <header className="w-full py-6 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CosmicBadge className="w-10 h-10">
              <span className="text-sm font-bold text-white">CS</span>
            </CosmicBadge>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-light">
              Cosmic Studio
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-cosmic-accent flex items-center justify-center">
                {userData && (
                  <span className="text-sm font-bold">
                    {userData.firstName.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm hidden sm:inline-block">
                {userData ? `${userData.firstName} ${userData.lastName}` : 'User'}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-7xl py-12 z-10 relative">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h2>
          
          {userData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Account Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-gray-400">Name</span>
                      <span>{userData.firstName} {userData.lastName}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-gray-400">Business</span>
                      <span>{userData.businessName}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-gray-400">Type</span>
                      <span>{userData.businessType}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-gray-400">Size</span>
                      <span>{userData.businessSize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cosmic-accent/20 p-6 rounded-lg border border-cosmic-accent/30">
                  <h4 className="font-semibold mb-2">Account Successfully Created!</h4>
                  <p className="text-sm text-gray-300">
                    Thank you for completing the onboarding process. Your account is now set up and ready to use.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-cosmic-accent/20 flex items-center justify-center text-cosmic-accent">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium">Complete your profile</h5>
                      <p className="text-sm text-gray-400">Add more details to your profile to get started.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-cosmic-accent/20 flex items-center justify-center text-cosmic-accent">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium">Explore available tools</h5>
                      <p className="text-sm text-gray-400">Check out the tools and features available to you.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-cosmic-accent/20 flex items-center justify-center text-cosmic-accent">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium">Create your first project</h5>
                      <p className="text-sm text-gray-400">Start building your first project with Cosmic Studio.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10 bg-black/30 backdrop-blur-sm mt-12">
        <div className="container max-w-7xl">
          <p>© 2025 Cosmic Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
