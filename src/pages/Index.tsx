
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import StarBackground from '@/components/StarBackground';
import CosmicBadge from '@/components/CosmicBadge';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <StarBackground />
      
      <header className="w-full py-6 z-10">
        <div className="container max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CosmicBadge className="w-12 h-12">
              <span className="text-sm font-bold text-white">CS</span>
            </CosmicBadge>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-light">
              Cosmic Studio
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
          
          <Button 
            onClick={() => navigate('/onboarding/personal-info')}
            className="bg-cosmic-accent hover:bg-cosmic-accent/90"
          >
            Get Started
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-float">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-light">
              Transform Your Digital Presence
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Cosmic Studio helps brands and businesses create stunning digital experiences 
            that captivate audiences and drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/onboarding/personal-info')}
              className="bg-cosmic-accent hover:bg-cosmic-accent/90 px-8 py-6 text-lg"
              size="lg"
            >
              Create Account
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="w-12 h-12 bg-cosmic-accent/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cosmic-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Strategic Design</h3>
            <p className="text-gray-400">
              We create designs that align with your business goals and user needs.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="w-12 h-12 bg-cosmic-accent/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cosmic-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Development</h3>
            <p className="text-gray-400">
              Custom web and mobile solutions built with cutting-edge technologies.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="w-12 h-12 bg-cosmic-accent/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cosmic-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
            <p className="text-gray-400">
              Comprehensive marketing strategies to grow your online presence.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10 bg-black/30 backdrop-blur-sm mt-12 z-10">
        <div className="container max-w-7xl">
          <p>© 2025 Cosmic Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
