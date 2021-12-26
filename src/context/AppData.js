import { createContext, useState } from 'react';

export const AppDataContext = createContext();

const AppDataProvider = (props) => {
  const [areas, setAreas] = useState();

  return (
    <AppDataContext.Provider value={{ areas, setAreas }}>
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
