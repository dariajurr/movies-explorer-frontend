import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({getMovies, searchParams={}}) {
  const location = useLocation();
  const [locPath, setLocPath] = useState(location.pathname);
  const [windowWidth, setWindiwWidth] = useState(window.innerWidth);
  const [keyWords, setSeyWords] = React.useState(searchParams.keyWords || '');
  const [isShort, setIsShort] = React.useState(searchParams.isShort || false);

  useEffect(() => {
    setLocPath(location.pathname);
    window.addEventListener("resize", function () {
        setWindiwWidth(window.innerWidth);
      });
    }, [windowWidth]);

    function handleChangeInput(e) {
      setSeyWords(e.target.value);
    };

    function handleChangeCheckbox(e) {
      setIsShort(e.target.checked);
    };

    function onSearchClick(e) {
      e.preventDefault();
      getMovies(keyWords, isShort, locPath);
    }

  return (
    <section className='searchForm'>
        <form className='searchForm__form' name="search-form" onSubmit={onSearchClick}>
          <div className='searchForm__search-items'>
            <input className="searchForm__input"name='keyWord' type="text" placeholder="Фильм" onChange={handleChangeInput} value={keyWords}></input>
            <button className="searchForm__btn" type="submit">&#10095;</button>
            {windowWidth > 705 && <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} checked={isShort}/>}
          </div>         
          { windowWidth < 705 && <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} checked={isShort}/>}
        </form>
    </section>
  );
}

export default SearchForm;