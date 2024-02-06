export function formatCurrency(price: number): string {
  // Formato de moneda sin redondeo y con dos puntos como separadores de miles
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0, // Sin redondeo
  }).format(price);

  // Reemplaza la coma decimal por un punto
  return formattedPrice.replace(/,/, '.');
}
