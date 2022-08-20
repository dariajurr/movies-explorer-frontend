import React from 'react';
import { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [windowWidth, setWindiwWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", function () {
        setWindiwWidth(window.innerWidth);
      });
    }, [windowWidth]);

  return (
    <section className='searchForm'>
        <form className='searchForm__form' name="search-form">
          <div className='searchForm__search-items'>
            <input className="searchForm__input" type="text" placeholder="Фильм" required></input>
            <button className="searchForm__btn" type="submit">&#10095;</button>
            {windowWidth > 705 && <FilterCheckbox/>}
          </div>         
          { windowWidth < 705 && <FilterCheckbox/>}
        </form>
    </section>
  );
}

export default SearchForm;