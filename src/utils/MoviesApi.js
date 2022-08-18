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
  
    getMovies() {
      return fetch(`${this._baseUrl}/beatfilm-movies`, {
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  }
  
  const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default MoviesApi;