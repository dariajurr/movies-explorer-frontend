class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {    
      
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    _getHeaders() {
      const token = localStorage.getItem('user');
      const jwt = JSON.parse(token).token;
      return {
          'authorization': `Bearer ${jwt}`,
          ...this._headers,
      };
    }
  
    getProfileInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }
  
    getMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);
    }
    
    setProfileInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      })
      .then(res => res.json())
      .catch((err) => console.log(err));
    }; 
  
    setMovies({id, country, director, duration, year, description, image, trailerLink, nameEN, nameRU}) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          country : country || "не указано", 
          director, 
          duration, 
          year, 
          description, 
          image : 'https://api.nomoreparties.co'+image.url, 
          trailerLink, 
          nameRU, 
          nameEN: nameEN || "не указано",
          thumbnail : 'https://api.nomoreparties.co'+image.formats.thumbnail.url,
          movieId : id
      })      
      })
      .then(this._checkResponse);    
    }
  
    deleteMovie(data){
      return fetch(`${this._baseUrl}/movies/${data}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);      
    }
  
    changeLikeStatus(card, isLiked) {
      if (!isLiked) {
        return fetch(`${this._baseUrl}/movies`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: JSON.stringify({
            country : card.country || "не указано", 
            director: card.director, 
            duration: card.duration, 
            year : card.year, 
            description: card.description, 
            image : 'https://api.nomoreparties.co'+ card.image.url, 
            trailerLink: card.trailerLink, 
            nameRU: card.nameRU, 
            nameEN: card.nameEN || "не указано",
            thumbnail : 'https://api.nomoreparties.co'+ card.image.formats.thumbnail.url,
            movieId : card.id
        })      
      })
        .then(this._checkResponse)    
      } else {
        return fetch(`${this._baseUrl}/movies/${card._id || card.movieId}`, {
          method: 'DELETE',
          headers: this._getHeaders(),
        })
        .then(this._checkResponse)
      }
    }
  
    /*setLike(cardID){
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);
    }
    deleteLike(cardID){
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);
    }*/
  }
  
  const api = new Api({
    baseUrl: 'https://api.dariajurr.nomoredomains.sbs',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default api;