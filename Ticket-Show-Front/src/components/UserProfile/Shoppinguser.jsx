import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function MyShopping() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Obtener las compras almacenadas desde el localStorage
    const userId = user ? user.uid : null;
    const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];
    // Filtrar las compras del usuario actual basado en su ID
    const userPurchases = savedPurchases.filter((purchase) => purchase.userId === userId);

    // Ordenar las compras por fecha (la más reciente primero)
    userPurchases.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Actualizar el estado con las compras del usuario actual
    setPurchases(userPurchases);
    
  }, [user]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  // Filtrar las compras que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePurchases = purchases.slice(startIndex, endIndex);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
    <div className="max-w-7xl w-full">
      <h2 className="text-1xl font-semibold text-gray-400  mb-4">Mis Compras</h2>
      <div className="w-full max-w-7xl">
        {visiblePurchases.length > 0 ? (
          visiblePurchases?.map((purchase) => (
            <div className="bg-white max-w-7xl   flex justify-center items-center text-sm md:flex w-full md:max-w-xs md:m-2 border shadow-md rounded-lg">
              <div className="w-1/3 md:w-40">
                <img
                  src={purchase.image}
                  alt=""
                  className="w-full flex justify-center items-center h-auto w-full object-cover rounded-lg"
                />
              </div>
              <div className="md:ml-4 md:text-left  flex flex-col mt-2 md:mt-0">
                <h1 className="font-bold text-primaryColor">{purchase.name}</h1>
                <p className="text-gray-400 font-medium">
                  Fecha de compra:{" "}
                  {new Date(purchase.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 font-medium">
                  Cantidad de boletos: {purchase.quantity}
                </p>
                <p className="text-gray-400 font-medium">
                  Monto total de compras: {purchase.total}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se han realizado compras aún.</p>
        )}
        <div className="flex justify-center text-xs mt-4">
          <p>
            Página {currentPage} de {totalPages}
          </p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 text-sm bg-primaryColor text-white px-4 py-2 rounded-lg"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-primaryColor text-sm text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

