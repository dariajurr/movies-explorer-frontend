async function filterMovie(data, keyWords, isShort) {

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

function getDuration (duration) {
  const hours = Math.trunc(duration/60);
  const minutes = duration%60; 
  
  return `${hours} ч ${minutes} м`
}

function handleMessage(error, arr) {
  if (error) {
    return `Во время запроса произошла ошибка.
      Возможно, проблема с соединением или сервер недоступен.
      Подождите немного и попробуйте ещё раз`;
  } else if (!error && arr.length === 0) {
    return "Ничего не найдено";
  }
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
  getDuration,
  handleMessage,
  setLocal, 
  getLocal
};