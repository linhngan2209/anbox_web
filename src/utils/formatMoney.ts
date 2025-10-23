export const formatPrice = (price: number | string) => {
  const number = typeof price === 'string' ? parseFloat(price) : price;
  return number.toLocaleString('vi-VN');
};