"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCandidateAuth } from '@/context/CandidateAuthContext';
import Link from 'next/link';

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
    <div className='w-full  flex flex-col  p-6 '>
      <header className='ml-auto border-b'>
        <h1>Welcome, {candidateName}</h1>
        <Link href={"/test"}>Menu</Link> | <button onClick={logout}>Logout</button> | 
      </header>
      <main>{children}</main>
    </div>
  );
};

export default TestPageLayout;
