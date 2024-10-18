import { createContext, useState, useEffect } from 'react';
import { getAllOwners } from '../services/ownerService';

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const data = await getAllOwners();
      setOwners(data);
    };

    fetchOwners();
  }, []);

  return (
    <OwnerContext.Provider value={{ owners, setOwners }}>
      {children}
    </OwnerContext.Provider>
  );
};
