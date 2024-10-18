import { FaPaw, FaEdit, FaTrashAlt } from 'react-icons/fa';

const PetCard = ({ pet, onAdopt, onDelete, onEdit }) => (
  <div className="p-6 w-96  bg-gray-800 text-white rounded-xl shadow-lg border border-gray-600 m-2 flex flex-col justify-between space-y-4">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-gray-200 mb-2">{pet.nombre}</h3>
      <p className="text-gray-400">Tipo: {pet.tipo}</p>
      <p className="text-gray-400">Raza: {pet.raza}</p>
    </div>
    <div className="flex justify-between">
      <button
        onClick={onAdopt}
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center justify-center"
      >
        <FaPaw /> <span>Adoptar</span>
      </button>
      <button
        onClick={() => onEdit(pet)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center space-x-2"
      >
        <FaEdit /> <span>Editar</span>
      </button>
      <button
        onClick={() => onDelete(pet.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center justify-center space-x-2"
      >
        <FaTrashAlt /> <span>Eliminar</span>
      </button>
    </div>
  </div>
);

export default PetCard;
