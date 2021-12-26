import React, { useContext } from 'react';
import { SelectedMetricContext } from '../context/SelectedMetric';

const Dropdown = () => {
  const { selectedMetric, setSelectedMetric } = useContext(
    SelectedMetricContext
  );

  return (
    <div className='dropDown'>
      <select
        defaultValue={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        className='form-select'
      >
        <option value='proUserCount'>Pro User</option>
        <option value='userCount'>User Count</option>
        <option value='maleCount'>Male User</option>
        <option value='femaleCount'>Female User</option>
        <option value='maleFemalRatio'>Male:Femal Ratio</option>
        <option value='avgAge'>Average Age</option>
        <option value='avgMatch'>Average Matchs</option>
      </select>
    </div>
  );
};

export default Dropdown;
