import  { useEffect } from 'react';
import { useLocation } from 'wouter';

function Rediriguir() {
  const [location,setLocation] = useLocation();

  useEffect(() => {
    if(location === '/')
    setLocation('/login');
  }, [setLocation]);

  return null; 
}

export default Rediriguir;
