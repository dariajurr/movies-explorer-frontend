import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({handleChangeCheckbox, checked}) 
{
  function onChangeCheckbox(e) {
    handleChangeCheckbox(e);
  };

  return (
    <label className="filterCheckbox">      
        <input type="checkbox" className="filterCheckbox__checkbox" name='shortMovie' onChange={onChangeCheckbox} checked={checked}></input>
        <span className="filterCheckbox__switch"></span>
        <span className="filterCheckbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;