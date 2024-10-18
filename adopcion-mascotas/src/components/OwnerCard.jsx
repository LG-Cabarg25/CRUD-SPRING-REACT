import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const OwnerCard = ({ owner, onEdit, onDelete }) => {
  return (
    <div className="p-6 w-full bg-gray-800 text-white rounded-xl shadow-lg border border-gray-600 m-2 flex flex-col justify-between space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-200 mb-2">{owner.nombreCompleto}</h3>
        <p className="text-gray-400">Dirección: {owner.direccion}</p>
        <p className="text-gray-400">Email: {owner.correoElectronico}</p>
        <p className="text-gray-400">
          Mascota adoptada: {owner.mascota ? owner.mascota.nombre : 'No asociada'}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(owner)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center space-x-2"
        >
          <FaEdit /> <span>Editar</span>
        </button>
        <button
          onClick={() => onDelete(owner.propietarioId)}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <FaTrashAlt /> <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default OwnerCard;
