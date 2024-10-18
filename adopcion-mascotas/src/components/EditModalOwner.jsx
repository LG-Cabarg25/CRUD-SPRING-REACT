import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditModalOwner = ({ isOpen, onRequestClose, ownerToEdit, onSubmit }) => {
  const [owner, setOwner] = useState({
    nombreCompleto: '',
    direccion: '',
    correoElectronico: '',
    mascota: null,
  });

  useEffect(() => {
    if (ownerToEdit) {
      setOwner({
        nombreCompleto: ownerToEdit.nombreCompleto || '',
        direccion: ownerToEdit.direccion || '',
        correoElectronico: ownerToEdit.correoElectronico || '',
        mascota: ownerToEdit.mascota || null,
      });
    }
  }, [ownerToEdit]);

  const handleChange = (e) => {
    setOwner({
      ...owner,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(owner); // Envía la información editada al controlador
    onRequestClose(); // Cierra el modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded shadow-lg max-w-md mx-auto my-20"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4">Editar Propietario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombreCompleto"
          value={owner.nombreCompleto}
          onChange={handleChange}
          placeholder="Nombre Completo"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="direccion"
          value={owner.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="correoElectronico"
          value={owner.correoElectronico}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Guardar Cambios
        </button>
      </form>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
      >
        Cerrar
      </button>
    </Modal>
  );
};

export default EditModalOwner;
