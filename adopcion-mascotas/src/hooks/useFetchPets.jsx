import { useState, useEffect } from 'react';
import { getAllPets } from '../services/petService'; // Asegúrate de que esta función sea importada correctamente

const useFetchPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAllPets(); // Usamos 'getAllPets' en lugar de 'getPets'
        setPets(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return { pets, loading, error };
};

export default useFetchPets;
