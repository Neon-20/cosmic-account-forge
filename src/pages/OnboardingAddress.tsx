
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OnboardingLayout from '@/components/OnboardingLayout';
import { useToast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const OnboardingAddress = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showMapTokenInput, setShowMapTokenInput] = useState(true);
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    latitude: 0,
    longitude: 0
  });
  const [errors, setErrors] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    mapboxToken: ''
  });

  useEffect(() => {
    // Check if previous step was completed
    const businessTypeData = localStorage.getItem('onboarding-business-type');
    if (!businessTypeData) {
      navigate('/onboarding/business-type');
    }
  }, [navigate]);

  const initializeMap = () => {
    if (!mapboxToken) {
      setErrors(prev => ({ ...prev, mapboxToken: 'Please enter a valid Mapbox token' }));
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;
      
      if (mapContainer.current && !map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [0, 20],
          zoom: 1.5
        });
        
        map.current.addControl(new mapboxgl.NavigationControl());
        
        // Create a default marker
        marker.current = new mapboxgl.Marker({
          color: '#7C3AED'
        })
          .setLngLat([0, 20])
          .addTo(map.current);
        
        // Add click handler to set marker
        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          marker.current?.setLngLat([lng, lat]);
          
          setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
          }));
          
          // Try to reverse geocode and fill form
          reverseGeocode(lng, lat);
        });
        
        setShowMapTokenInput(false);
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      setErrors(prev => ({ ...prev, mapboxToken: 'Invalid Mapbox token or map error' }));
    }
  };

  const reverseGeocode = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const place = data.features[0];
        const context = place.context || [];
        
        let city = '';
        let state = '';
        let country = '';
        let postcode = '';
        
        context.forEach((item: any) => {
          if (item.id.startsWith('place')) {
            city = item.text;
          } else if (item.id.startsWith('region')) {
            state = item.text;
          } else if (item.id.startsWith('country')) {
            country = item.text;
          } else if (item.id.startsWith('postcode')) {
            postcode = item.text;
          }
        });
        
        setFormData(prev => ({
          ...prev,
          city,
          state,
          country,
          zipCode: postcode
        }));
      }
    } catch (error) {
      console.error('Error with geocoding:', error);
    }
  };

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
      streetAddress: formData.streetAddress ? '' : 'Street address is required',
      city: formData.city ? '' : 'City is required',
      state: formData.state ? '' : 'State is required',
      zipCode: formData.zipCode ? '' : 'ZIP code is required',
      country: formData.country ? '' : 'Country is required',
      mapboxToken: ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('onboarding-address', JSON.stringify(formData));
      navigate('/onboarding/business-size');
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
      title="Where is your business located?" 
      description="Provide your business address and location details."
    >
      {showMapTokenInput ? (
        <div className="space-y-4 mb-6 p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin className="w-5 h-5" />
            <p className="text-sm">To use the interactive map, please enter your Mapbox token:</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className={errors.mapboxToken ? "border-red-500 flex-1" : "flex-1"}
            />
            <Button 
              type="button" 
              onClick={initializeMap}
              className="bg-cosmic-accent hover:bg-cosmic-accent/90"
            >
              Load Map
            </Button>
          </div>
          {errors.mapboxToken && <p className="text-red-500 text-sm">{errors.mapboxToken}</p>}
          <p className="text-xs text-gray-400">
            You can get a free Mapbox token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-cosmic-accent hover:underline">mapbox.com</a>
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <div 
            ref={mapContainer} 
            className="h-[250px] w-full rounded-lg border border-white/10 shadow-md mb-4" 
          />
          <p className="text-sm text-gray-400">
            Click on the map to set your business location
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            placeholder="123 Business St"
            value={formData.streetAddress}
            onChange={handleChange}
            className={errors.streetAddress ? "border-red-500" : ""}
          />
          {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              name="state"
              placeholder="State/Province"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              placeholder="ZIP/Postal Code"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/onboarding/business-type')}
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

export default OnboardingAddress;
