"use client";
import { DropletIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface DeviceContextProps {
  device: string;
}

const DeviceContext = createContext<DeviceContextProps>({ device: 'laptop' });

export const useDeviceContext = () => useContext(DeviceContext);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [device, setDevice] = useState('laptop');

  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mobile') || userAgent.includes('tablet')) {
      setDevice('phone');
    } else {
      setDevice('laptop');
    }
  };

  useEffect(() => {
    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);
  const router = useRouter()
  if (device === 'phone') {
    router.push("/notfound")
  }

  return (
    <DeviceContext.Provider value={{ device }}>
      {children}
    </DeviceContext.Provider>
  );
};
