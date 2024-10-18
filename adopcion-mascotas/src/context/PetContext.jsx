import { createContext, useState, useEffect } from 'react';
import { getAllPets, createPet, updatePet, deletePet } from '../services/petService'; // Asegúrate de importar `updatePet` y `deletePet`

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsFromServer = await getAllPets();
        setPets(petsFromServer);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const addPet = async (newPet) => {
    try {
      const createdPet = await createPet(newPet);
      setPets([...pets, createdPet]);
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  const removePet = async (id) => {
    try {
      await deletePet(id);
      setPets(pets.filter(pet => pet.id !== id));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const editPet = async (id, updatedPetData) => {
    try {
      const updatedPet = await updatePet(id, updatedPetData);
      setPets(pets.map(pet => (pet.id === id ? updatedPet : pet)));
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <PetContext.Provider value={{ pets, addPet, removePet, editPet, loading }}>
      {children}
    </PetContext.Provider>
  );
};
