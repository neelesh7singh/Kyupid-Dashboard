import React, { useContext, useState } from 'react';
import { AppDataContext } from '../context/AppData';
import { SelectedAreaContext } from '../context/SelectedArea';
import { SelectedMetricContext } from '../context/SelectedMetric';

const RankingList = () => {
  const { areas } = useContext(AppDataContext);
  const { setSelectedArea } = useContext(SelectedAreaContext);
  const { selectedMetric } = useContext(SelectedMetricContext);
  const [order, setOrder] = useState(0);

  if (!areas) return <></>;

  let areasArr = [];
  Object.keys(areas).forEach((key) => {
    areasArr.push(areas[key]);
  });

  areasArr.sort((a, b) => {
    if (!a) return -1;
    if (!b) return -1;
    if (a[selectedMetric] < b[selectedMetric]) return 1;
    else return -1;
  });
  if (order === 1) areasArr.reverse();

  return (
    <div className='rangeList'>
      <div style={{ fontSize: '1.2em', paddingLeft: '7px' }}>
        Areas according to rank
      </div>
      <div className='heading'>
        <div
          onClick={() => setOrder((order) => 1 - order)}
          className='headingArea'
        >
          Area Name
          {order === 0 && <i class='arrow down'></i>}
          {order === 1 && <i class='arrow up'></i>}
        </div>
        <div>Metric</div>
      </div>
      <ul className='rankingList list-group'>
        {areasArr.map((area) => (
          <li
            className='item'
            key={area.area_id}
            onMouseOver={() => setSelectedArea(area.area_id)}
            onMouseOut={() => setSelectedArea(null)}
          >
            {selectedMetric !== 'maleFemalRatio' && (
              <>
                <div className='areaName'>{area.name}</div>
                <div>{area[selectedMetric]}</div>
              </>
            )}
            {selectedMetric === 'maleFemalRatio' && (
              <>
                <div>{area.name}</div>
                <div>{area.maleFemalRatioText}</div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
