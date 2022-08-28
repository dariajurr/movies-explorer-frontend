async function filterMovie(data, keyWords, isShort) {
    if (!keyWords && !isShort) {
        return data;
    }

    return  data.filter(movie => {
      const str = `${movie.nameRU} ${movie.nameEN}`.toLowerCase();

      if (isShort && movie.duration > 40) {
        return false;
      }

      if (!keyWords && isShort && movie.duration < 40) {
        return true;
      }

      if (!str.includes(keyWords.toLowerCase())) {
        return false;
      }

      return true;
    });
}

function checkSavedMovies(movies, savedMovies) {
  return movies.map(movie => {
    savedMovies.map(el => {
      if (el.movieId === movie.id) 
      {
        movie.isSaved  = true;
        movie.movieId = el._id;
      }
    });
    return movie;
  })
}

function updateIsSaved (arr, id, {isSaved, movieId}) {
  arr.forEach((item) => {
    if (item.id === id) {
      item.isSaved = isSaved;
      item.movieId = movieId;
    }
  });
}

function getLoadStep (width) {
  return width > 1280 ? 3 : 2;
}

function getInitalCount (width) {
  if (width >= 1280) {
    return 12;
  }

  if (width >= 768) {
    return 8;
  }

  return 5;
}

function setLocal(name, items) {
  localStorage.setItem(name, JSON.stringify(items));
}

function getLocal(name) {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name))
  } else {
    return []
  }
}

export { 
  filterMovie, 
  checkSavedMovies, 
  updateIsSaved, 
  getLoadStep,
  getInitalCount,
  setLocal, 
  getLocal
};