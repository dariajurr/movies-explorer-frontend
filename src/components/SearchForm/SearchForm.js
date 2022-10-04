import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { PopUpContext } from '../../contexts/PopUpContext';

function SearchForm({getMovies, searchParams={}}) {
  const { width } = React.useContext(PopUpContext);
  const [isValid, setIsValid] = useState(true);
  const [keyWords, seKeyWords] = useState(searchParams.keyWords || '');
  const [isShort, setIsShort] = useState(searchParams.isShort || false);

    function handleChangeInput(e) {
      setIsValid(true);
      seKeyWords(e.target.value);
    };

    function handleChangeCheckbox(e) {
      setIsShort(e.target.checked);
      getMovies(keyWords, e.target.checked);
    };

    function onSearchClick(e) {
      e.preventDefault();

      if (keyWords.trim()) {
        getMovies(keyWords, isShort);
      } else {
        setIsValid(false);
      }
      
    }

  return (
    <section className='searchForm'>
        <form className='searchForm__form' name="search-form" onSubmit={onSearchClick} noValidate>
          <div className='searchForm__search-items'>
            <input 
            className='searchForm__input'
            name='keyWord' 
            type="text" 
            placeholder='Фильм'
            onChange={handleChangeInput} 
            value={keyWords} 
            required></input>
            <button className="searchForm__btn" type="submit">&#10095;</button>
            
            {width > 705 && <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} checked={isShort}/>}
          </div>       
          <p className='searchForm__input_error'>{!isValid && 'Нужно ввести ключевое слово'}&nbsp;</p>  
          {width < 705 && <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} checked={isShort}/>}
          
        </form>
    </section>
  );
}

export default SearchForm;