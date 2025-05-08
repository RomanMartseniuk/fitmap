import React, { createContext, useState, ReactNode } from 'react';

interface CitiesContextProps {
   error: string;
   setError: (arg: string) => void;
}

export const CitiesContext = createContext<CitiesContextProps>({ error: '', setError: () => {} });

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [error, setError] = useState<string>('');

   const handleSetError = (err: string) => {
      setError(err);
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
   }

   return (
      <CitiesContext.Provider value={{ error, setError: handleSetError }}>
         {children}
      </CitiesContext.Provider>
   );
};
