import {useState} from 'react';

const useToggle = (initialActiveId = null) => {
  const [activeId, setActiveId] = useState(initialActiveId);

  const toggle = (id) => {
    if (activeId !== id) {
      setActiveId(null); 
      setTimeout(() => {
        setActiveId(id); 
      }, 0); 
    } else {
      setActiveId(null); 
    }
  };

  return [activeId, toggle];
};

export default useToggle;
