const BASE_URL = "http://localhost:8080/api/propietarios"; // URL del backend

export const getAllOwners = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener propietarios: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener propietarios:", error);
    throw error;
  }
};

export const createOwner = async (owner) => {
  const response  = await fetch(BASE_URL, {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify(owner),
  });
  return await response.json()
};


export const updateOwner = async (ownerId, owner) => {
  try {
    const response = await fetch(`${BASE_URL}/${ownerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(owner),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar propietario: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar propietario:", error);
    throw error;
  }
};

export const deleteOwner = async (ownerId) => {
  try {
    const response = await fetch(`${BASE_URL}/${ownerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar propietario: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error al eliminar propietario:", error);
    throw error;
  }
};
