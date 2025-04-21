import { useNavigate } from 'react-router-dom';

export const handleLogout = (navigate) => {
  localStorage.clear();
  navigate('/login');
}; 