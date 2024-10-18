import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCreatePet from '../components/ModalCreatePet'; // Importa el nuevo componente ModalCreatePet
import dogImage from '../assets/perrito.png'; // Asegúrate de tener la imagen en esta ruta

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => setShowForm(true);
  const closeModal = () => setShowForm(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-r from-yellow-400 to-red-500">
      {/* Header con botón Crear Mascota */}
      <header className="absolute top-0 left-0 p-6 w-full flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-black font-bold text-4xl ml-4">
            <i className="fas fa-paw"></i> BIENVENIDOS
          </span>
        </div>
        <button
          onClick={handleCreateClick}
          className="bg-[#e5e167] text-[#ac2f2f] text-4xl px-4 py-2 rounded-full shadow hover:bg-gray-200"
        >
          Crear Mascota
        </button>
      </header>

      {/* Contenido central con texto y botón de Adoptar */}
      <div className="flex items-center justify-between w-full max-w-6xl p-8">
        {/* Texto de bienvenida */}
        <div className="text-left space-y-4">
          <h1 className="text-6xl font-extrabold text-black">ADOPCION DE MASCOTAS WEB</h1>
          <p className="text-4xl text-gray-700">Adopta tu compañero de vida</p>
          <Link to="/adoptar">
            <button className="bg-red-500 text-3xl text-white px-6 py-3 mt-4 rounded-full shadow-lg hover:bg-red-600 transition">
              Adoptar
            </button>
          </Link>
        </div>

        {/* Imagen del perro a la derecha */}
        <div className="hidden md:block">
          <img src={dogImage} alt="Perro" className="w-150 h-400" />
        </div>
      </div>

      {/* Modal para crear mascota */}
      {showForm && (
        <ModalCreatePet
          isOpen={showForm}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage;
