class Auth {
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
  
    signup = (name, password, email) => {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({name, password, email})
      })
      .then(res => res.json())
      .catch((err) => console.log(err));
    }; 
  
    
    signin = (password, email) => {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({password, email})
      })
      .then(res => res.json())
      .catch((err) => console.log(err));
    }; 
  
    valid = (JWT) => {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${JWT}`
        }
      })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
    };
  }
  
  const auth = new Auth({
    baseUrl: 'https://api.dariajurr.nomoredomains.sbs',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default auth;