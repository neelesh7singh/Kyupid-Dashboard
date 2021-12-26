import { createContext, useState } from 'react';

export const SelectedMetricContext = createContext();

const SelectedMetricProvider = (props) => {
  const [selectedMetric, setSelectedMetric] = useState('proUserCount');

  return (
    <SelectedMetricContext.Provider
      value={{ selectedMetric, setSelectedMetric }}
    >
      {props.children}
    </SelectedMetricContext.Provider>
  );
};

export default SelectedMetricProvider;
