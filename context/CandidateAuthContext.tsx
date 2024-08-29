"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";

interface CandidateAuthContextProps {
  isAuthenticated: boolean;
  candidateName: string;
  image: string;
  id: string;

  login: (name: string, id: string, image: string) => void;
  logout: () => void;
}

const CandidateAuthContext = createContext<
  CandidateAuthContextProps | undefined
>(undefined);

export const CandidateAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [id, setId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Check if the candidate is already logged in (auth data in localStorage)
    const storedAuthData = localStorage.getItem("candidateAuth");
    if (storedAuthData) {
      const { name, id, image, isAuthenticated: localAuthState } = JSON.parse(storedAuthData);
      setCandidateName(name);
      setIsAuthenticated(localAuthState);
      setImage(image)
      setId(id)
    }
  }, []);

  const login = (name: string, id: string, image: string) => {
    setCandidateName(name);
    setIsAuthenticated(true);
    localStorage.setItem("candidateAuth", JSON.stringify({ name, id, image, isAuthenticated:  true }));


    router.push("/test"); // Redirect to quiz page after login
  };

  const logout = () => {
    setCandidateName("");
    setIsAuthenticated(false);
    localStorage.removeItem("candidateAuth");
    router.push("/test/candidate-login"); // Redirect to login page after logout
  };

  return (
    <CandidateAuthContext.Provider
      value={{ isAuthenticated, candidateName, id, image, login, logout }}
    >
      {children}
    </CandidateAuthContext.Provider>
  );
};

export const useCandidateAuth = (): CandidateAuthContextProps => {
  const context = useContext(CandidateAuthContext);
  if (!context) {
    throw new Error(
      "useCandidateAuth must be used within a CandidateAuthProvider"
    );
  }
  return context;
};
