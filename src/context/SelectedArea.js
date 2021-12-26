import { createContext, useState } from 'react';

export const SelectedAreaContext = createContext();

const SelectedAreaProvider = (props) => {
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <SelectedAreaContext.Provider value={{ selectedArea, setSelectedArea }}>
      {props.children}
    </SelectedAreaContext.Provider>
  );
};

export default SelectedAreaProvider;
