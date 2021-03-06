import config from "../config";
import TokenService from "./Token";

const RecipeHelper = {
  createRecipe(newRecipe) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(newRecipe)
    })
  },
  
  recipeByIngredient(ingredient) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/recipes/${ingredient}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      );
  },

  recipeById(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/recipes/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getRecipeOwnerData(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/recipe/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  search(term) {
    return fetch(`${config.API_ENDPOINT}/api/recipes/search/${term}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  delete(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
  },

  getRecipes() {
    const url = `${config.API_ENDPOINT}/api/recipes`;
    const authToken = TokenService.getAuthToken();
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateRecipe(updatedData, id) {
    const authToken = TokenService.getAuthToken()
    return fetch(`${config.API_ENDPOINT}/api/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedData)
    });
  }
};

export default RecipeHelper;
