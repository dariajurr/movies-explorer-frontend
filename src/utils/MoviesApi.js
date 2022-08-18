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
  
    getMovies() {
      return fetch(`${this._baseUrl}/beatfilm-movies`, {
        headers: this._getHeaders(),
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