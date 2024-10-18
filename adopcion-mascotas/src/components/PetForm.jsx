import { useState } from 'react';

const PetForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre: name, tipo: type, raza: breed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Nombre de la Mascota:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" 
          required 
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Tipo de Mascota:</label>
        <input 
          type="text" 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" 
          required 
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Raza de la Mascota:</label>
        <input 
          type="text" 
          value={breed} 
          onChange={(e) => setBreed(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" 
          required 
        />
      </div>
      <button 
        type="submit" 
        className="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600 transition-colors"
      >
        Crear Mascota
      </button>
    </form>
  );
};

export default PetForm;
