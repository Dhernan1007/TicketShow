import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useMyShopping = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Obtener las compras almacenadas desde el localStorage
    const userId = user ? user.uid : null;
    const savedPurchases = JSON.parse(localStorage.getItem('userPurchases')) || [];
    // Filtrar las compras del usuario actual basado en su ID
    const userPurchases = savedPurchases.filter((purchase) => purchase.userId === userId);

    // Actualizar el estado con las compras del usuario actual
    setPurchases(userPurchases);
  }, [user]);

  // Asegurar que los campos existan y proporcionar valores predeterminados si están faltando
  const purchasesWithDefaults = purchases.map((purchase) => ({
    ...purchase,
    stock: purchase.stock ?? 0,
    quantity: purchase.quantity ?? 0,
    monto: purchase.monto ?? 0,
    departement: purchase.departement ?? '',
    totalBoletos: purchase.totalBoletos ?? 0,
    total: purchase.total ?? 0,
    name:purchase.name,
    hasPurchased: true, // Indicar que el usuario ha realizado compras
  }));

  return {
    purchases: purchasesWithDefaults,
    totalBoletosVendidos: purchasesWithDefaults.reduce((acc, purchase) => acc + purchase.quantity, 0),
    totalIngresos: purchasesWithDefaults.reduce((acc, purchase) => acc + purchase.total, 0),
  };
};

export default useMyShopping;
