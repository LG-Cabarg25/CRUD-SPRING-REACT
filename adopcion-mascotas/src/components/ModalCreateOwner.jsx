import Modal from 'react-modal';
import OwnerForm from './OwnerForm';

const ModalCreateOwner = ({ isOpen, onRequestClose, pets, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded shadow-lg max-w-md mx-auto my-20"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4">Crear Propietario</h2>
      <OwnerForm pets={pets} onSubmit={onSubmit} />
      <button
        onClick={onRequestClose}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Cerrar
      </button>
    </Modal>
  );
};

export default ModalCreateOwner;
