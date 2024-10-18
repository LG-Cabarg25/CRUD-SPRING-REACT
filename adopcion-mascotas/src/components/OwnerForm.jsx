import React, { useState } from 'react';

const OwnerForm = ({ pets, onSubmit }) => {
  const [owner, setOwner] = useState({ nombreCompleto: '', direccion: '', correoElectronico: '', mascota: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({
      ...owner,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setOwner({
      ...owner,
      mascota: { mascotaId: e.target.value },  // Asegurando que mascota tenga un objeto con mascotaId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(owner);  // Enviar el objeto owner con mascota
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombreCompleto"
        placeholder="Nombre Completo"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="correoElectronico"
        placeholder="Correo Electrónico"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        name="mascota"
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Selecciona una mascota</option>
        {pets.map((pet) => (
          <option key={pet.mascotaId} value={pet.mascotaId}>
            {pet.nombre}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Adoptar
      </button>
    </form>
  );
};

export default OwnerForm;
