import React from 'react';

const Legend = () => {
  return (
    <div className='legendParent'>
      <div className='legendTitle'>
        <p>Lower Metrics</p> <p>Higher Metrics</p>
      </div>
      <div className='legendBoxes'>
        <div className='legendBox'></div>
        <div className='legendBox'></div>
        <div className='legendBox'></div>
        <div className='legendBox'></div>
      </div>
    </div>
  );
};

export default Legend;
