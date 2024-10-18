import { useState, useEffect } from 'react';
import { getAllOwners } from '../services/ownerService';

const useFetchOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await getAllOwners();
        setOwners(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  return { owners, loading, error };
};

export default useFetchOwners;
