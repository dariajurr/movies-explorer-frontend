import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filterCheckbox">      
        <input type="checkbox" className="filterCheckbox__checkbox"></input>
        <span className="filterCheckbox__switch"></span>
        <span className="filterCheckbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;