// petService.js
const BASE_URL = "http://localhost:8080/api/mascotas";

// Obtener todas las mascotas
export const getAllPets = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// Crear una nueva mascota
export const createPet = async (pet) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  return await response.json();
};

// Actualizar una mascota existente
export const updatePet = async (petId, pet) => {
  const response = await fetch(`${BASE_URL}/${petId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  
  if (!response.ok) {
    throw new Error(`Error al actualizar mascota: ${response.statusText}`);
  }

  return await response.json();
};


// Eliminar una mascota
export const deletePet = async (petId) => {
  await fetch(`${BASE_URL}/${petId}`, {
    method: "DELETE",
  });
};
