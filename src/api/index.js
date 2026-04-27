import API_BASE_URL from './config';

export const registerVendor = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/vendors/register`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(formData)
  });
  return res.json();
};

export const loginVendor = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/vendors/login`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(formData)
  });
  return res.json();
};

export const getVendor = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/vendors/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const getFoodItems = async (lat, lng) => {
  const res = await fetch(`${API_BASE_URL}/food-items?lat=${lat}&lng=${lng}`);
  return res.json();
};

export const createFoodItem = async (itemData, token) => {
  const res = await fetch(`${API_BASE_URL}/food-items`, {
    method : 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(itemData)
  });
  return res.json();
};

export const updateFoodStatus = async (id, status, token) => {
  const res = await fetch(`${API_BASE_URL}/food-items/${id}/status`, {
    method : 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  return res.json();
};

export const uploadImage = async (imageFile, token) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method : 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body   : formData
  });
  return res.json();
};

export const saveToken = (token, vendor) => {
  localStorage.setItem('token',  token);
  localStorage.setItem('vendor', JSON.stringify(vendor));
};

export const getToken      = () => localStorage.getItem('token');
export const getVendorInfo = () => JSON.parse(localStorage.getItem('vendor'));
export const logout        = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('vendor');
};

export const getMyListings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/vendors/me/listings`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};