import { useContext, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import GoogleMapComponent from './components/GoogleMapComponent';
import Legend from './components/Legend';
import Navbar from './components/Navbar';
import RankingList from './components/RankingList';
import { AppDataContext } from './context/AppData';
import SelectedAreaProvider from './context/SelectedArea';
import SelectedMetricProvider from './context/SelectedMetric';
import { getData } from './utils';

function App() {
  const { setAreas } = useContext(AppDataContext);

  useEffect(() => {
    (async () => {
      setAreas(await getData());
    })();
  }, []);
  return (
    <div className='App container'>
      <Navbar />
      <SelectedMetricProvider>
        <Dropdown />
        <SelectedAreaProvider>
          <GoogleMapComponent />
          <RankingList />
        </SelectedAreaProvider>
      </SelectedMetricProvider>
      <Legend />
    </div>
  );
}

export default App;
