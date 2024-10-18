import { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import PetForm from './PetForm';
import { PetContext } from '../context/PetContext';

const ModalEditPet = ({ isOpen, onRequestClose, petToEdit }) => {
  const { editPet } = useContext(PetContext);
  const [petData, setPetData] = useState({
    nombre: '',
    tipo: '',
    raza: '',
  });

  // Cargar los datos de la mascota a editar cuando se abra el modal
  useEffect(() => {
    if (petToEdit) {
      setPetData({
        nombre: petToEdit.nombre,
        tipo: petToEdit.tipo,
        raza: petToEdit.raza,
      });
    }
  }, [petToEdit]);

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (petToEdit) {
      editPet(petToEdit.mascotaId, petData); // Edita la mascota con los datos actualizados
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Mascota</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la Mascota"
            value={petData.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo de Mascota"
            value={petData.tipo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            name="raza"
            placeholder="Raza de la Mascota"
            value={petData.raza}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Actualizar Mascota
          </button>
        </form>
        <button
          onClick={onRequestClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEditPet;
