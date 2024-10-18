import { useState, useContext } from 'react';
import Modal from 'react-modal';
import PetForm from './PetForm';
import { PetContext } from '../context/PetContext';

const ModalCreatePet = ({ isOpen, onRequestClose }) => {
  const { addPet } = useContext(PetContext);
  const [showForm, setShowForm] = useState(isOpen);

  const handleCreatePet = (newPet) => {
    addPet(newPet);
    setShowForm(false);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={showForm}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear una nueva mascota</h2>
        <PetForm onSubmit={handleCreatePet} />
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

export default ModalCreatePet;
