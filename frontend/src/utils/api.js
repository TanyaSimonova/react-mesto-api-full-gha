class Api {
  constructor(options, token) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _chekValidity(res) {
    if (res.ok) {
      return res.json();
    }
     return Promise.reject(res.status);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._chekValidity);
  }

  getItems = () => {
    return fetch(`${this._url}/cards`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._chekValidity);
  }

  setUser (data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
    .then(this._chekValidity);
  }

  setUserAvatar (data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._chekValidity);
  }

  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
   })
    .then (this._chekValidity);
  }

  addItems(data) {
   return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then (this._chekValidity);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
       method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
     .then (this._chekValidity);
    }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
       method: 'DELETE',
       headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
       }
    })
     .then (this._chekValidity);
  }
}

const api = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

console.log(process.env.REACT_APP_API_URL);

export default api;

