import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PetCard from '../components/PetCard';
import OwnerCard from '../components/OwnerCard'; // Importa el OwnerCard
import OwnerForm from '../components/OwnerForm';
import ModalCreatePet from '../components/ModalCreatePet'; // Modal para crear mascota
import ModalEditPet from '../components/ModalEditPet'; // Modal para editar mascota
import ModalEditOwner from '../components/EditModalOwner'; // Modal para editar propietario
import { PetContext } from '../context/PetContext';
import { OwnerContext } from '../context/OwnerContex';
import { createOwner, updateOwner, deleteOwner } from '../services/ownerService';

const AdoptPage = () => {
  const { pets, removePet, editPet } = useContext(PetContext);
  const { owners, setOwners } = useContext(OwnerContext);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null); // Estado para propietario seleccionado
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [showEditOwnerForm, setShowEditOwnerForm] = useState(false); // Controla el modal de editar propietario
  const [showPetForm, setShowPetForm] = useState(false); // Para controlar el modal de crear mascota
  const [showEditPetForm, setShowEditPetForm] = useState(false); // Para controlar el modal de editar mascota

  const navigate = useNavigate(); // Hook para navegar

  // Función para manejar la navegación al hacer clic en el botón de regresar
  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  // Manejo de adopción
  const handleAdopt = (pet) => {
    setSelectedPet(pet);
    setShowOwnerForm(true);
  };

  // Manejo de eliminación de mascota
  const handleDeletePet = (id) => {
    if (id) {
      removePet(id);
      toast.success('Mascota eliminada con éxito');
    } else {
      console.error('ID de la mascota es undefined');
      toast.error('Error al eliminar la mascota');
    }
  };

  // Manejo de edición de mascota
  const handleEditPet = (pet) => {
    setSelectedPet(pet); // Guarda la mascota seleccionada
    setShowEditPetForm(true); // Abre el modal de edición
  };

  // Abre el modal para crear propietario
  const openCreateOwnerModal = () => {
    setSelectedPet(null);
    setShowOwnerForm(true);
  };

  // Abre el modal para editar propietario
  const openEditOwnerModal = (owner) => {
    setSelectedOwner(owner); // Establece el propietario seleccionado
    setShowEditOwnerForm(true); // Abre el modal de edición
  };

  // Abre el modal para crear mascota
  const openCreatePetModal = () => {
    setShowPetForm(true);
  };

  // Cierra el modal de crear mascota
  const closeCreatePetModal = () => {
    setShowPetForm(false);
  };

  // Cierra el modal de editar propietario
  const closeEditOwnerModal = () => {
    setShowEditOwnerForm(false);
  };

  // Cierra el modal de editar mascota
  const closeEditPetModal = () => {
    setShowEditPetForm(false);
  };

  // Manejo de edición de propietario
  const handleEditOwner = async (updatedOwner) => {
    await updateOwner(selectedOwner.propietarioId, updatedOwner);
    setOwners((prevOwners) =>
      prevOwners.map((owner) =>
        owner.propietarioId === selectedOwner.propietarioId ? updatedOwner : owner
      )
    );
    setShowEditOwnerForm(false); // Cierra el modal después de guardar
    toast.info('Propietario actualizado con éxito');
  };

  // Manejo de eliminación de propietario
  const handleDeleteOwner = async (ownerId) => {
    await deleteOwner(ownerId);
    setOwners((prevOwners) => prevOwners.filter((owner) => owner.propietarioId !== ownerId));
    toast.success('Propietario eliminado con éxito');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Adoptar Mascota</h1>

      {/* Botón de regresar */}
      <div className="mb-4">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Regresar
        </button>
      </div>

      {/* Botones para crear propietario y mascota */}
      <div className="text-center mb-6">
        <button
          onClick={openCreateOwnerModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Propietario
        </button>
      </div>

      {/* Sección de mascotas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mascotas Disponibles</h2>
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard
                key={pet.mascotaId}
                pet={pet}
                onAdopt={() => handleAdopt(pet)}
                onEdit={() => handleEditPet(pet)}
                onDelete={() => handleDeletePet(pet.mascotaId)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No hay mascotas disponibles.</p>
        )}
      </div>

      {/* Sección de propietarios */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Propietarios</h2>
        {owners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {owners.map((owner) => (
              <OwnerCard
                key={owner.propietarioId}
                owner={owner}
                onEdit={() => openEditOwnerModal(owner)}
                onDelete={handleDeleteOwner}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No hay propietarios registrados.</p>
        )}
      </div>

      {/* Modal para crear propietario */}
      <Modal
        isOpen={showOwnerForm}
        onRequestClose={() => setShowOwnerForm(false)}
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      >
        <OwnerForm
          pets={pets}
          onSubmit={(ownerData) => {
            createOwner({
              nombreCompleto: ownerData.nombreCompleto,
              direccion: ownerData.direccion,
              correoElectronico: ownerData.correoElectronico,
              mascota: ownerData.mascota,
            });
            setShowOwnerForm(false);
            toast.success('Propietario creado con éxito');
          }}
        />
        <button
          onClick={() => setShowOwnerForm(false)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cerrar
        </button>
      </Modal>

      {/* Modal para crear mascota */}
      <ModalCreatePet isOpen={showPetForm} onRequestClose={closeCreatePetModal} />

      {/* Modal para editar mascota */}
      <ModalEditPet
        isOpen={showEditPetForm}
        onRequestClose={closeEditPetModal}
        petToEdit={selectedPet}
      />

      {/* Modal para editar propietario */}
      <ModalEditOwner
        isOpen={showEditOwnerForm}
        onRequestClose={closeEditOwnerModal}
        ownerToEdit={selectedOwner}
        pets={pets} // Pasa las mascotas al modal
        onSubmit={handleEditOwner}
      />

      <ToastContainer />
    </div>
  );
};

export default AdoptPage;
