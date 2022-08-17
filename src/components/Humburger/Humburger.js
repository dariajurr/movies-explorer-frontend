import React from 'react';
import './Humburger.css';
import { PopUpContext } from '../../contexts/PopUpContext';

function Humburger() {
  const { handleNavPopupClick } = React.useContext(PopUpContext);

  return ( 
    <button className="humburger" onClick={handleNavPopupClick}>
      <span className="humburger__item"></span>
      <span className="humburger__item"></span>
      <span className="humburger__item"></span>
    </button>
  );
}

export default Humburger;