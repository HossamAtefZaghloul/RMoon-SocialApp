import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000; 
 //
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
//
    if (decodedToken.exp < currentTime) {
      
      localStorage.removeItem('token');
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
