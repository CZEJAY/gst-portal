"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCandidateAuth } from '@/context/CandidateAuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TestPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, candidateName, logout, image } = useCandidateAuth();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthChecked(true);
    } else {
      const candidateData = localStorage.getItem('candidateAuth'); // Adjust this key to match your local storage key
      if (candidateData) {
        setIsAuthChecked(true);
        // Optionally, you can update the context or state with the retrieved data
      } else {
        router.push('/test/candidate-login');
      }
    }
  }, [isAuthenticated, router]);

  if (!isAuthChecked) {
    return null; // Show a loader or placeholder until auth check is complete
  }

  return (
    <div className='w-full  flex flex-col gap-6'>
      <header className='ml-auto border-b flex items-center justify-between bg-transparent backdrop-blur-lg sticky z-50 w-full p-3 shadow-md top-0'>
        <div className=" flex items-center gap-2">
          <div className="">
          <img src={image} alt={candidateName} className="w-10 h-10 rounded-full"/>
          </div>
          <div className="text-lg font-bold">{candidateName}</div>
        </div>
        <div className="">
        <Button asChild>
        <Link href={"/test"}>Menu</Link>  
        </Button> | <Button onClick={logout}>Logout</Button> 
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default TestPageLayout;
