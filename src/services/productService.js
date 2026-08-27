const API = 'https://dummyjson.com';

export const getProductById = async (id) => {
  const response = await fetch(`${API}/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
};
