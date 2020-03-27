import config from "../config";
import TokenService from './Token'

const AuthHelper = {
  createUser(newUser) {
    console.log(config);
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteAccount(username) {
    return fetch(`${config.API_ENDPOINT}/api/users/${username}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    });
  },
  getCurrentUser(token) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  getPublicAccountData(username) {
    return fetch(`${config.API_ENDPOINT}/api/users/${username}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`

      },
      body: JSON.stringify(credentials)
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  refreshToken() {
    console.trace('refreshToken spam?');
    return fetch(`${config.API_ENDPOINT}/api/auth/token`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default AuthHelper;
