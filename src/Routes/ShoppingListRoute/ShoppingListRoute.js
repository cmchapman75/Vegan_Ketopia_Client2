import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../Helpers/Token";
import "./ShoppingListRoute.css";

class ShoppingListRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            addIngredients: false,
            error: null
        };
    }


    getIngredients = () => {
        console.log("Lets shop!");
        const url = `${config.API_ENDPOINT}/api/ingredients`;
        const authToken = TokenService.getAuthToken();
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
          .then(res => res.json())
          .then(data => {
              return this.setState({
                  lists: data
              });
          });
    };
    setStateErrorTrue = () => {
        this.setState({
            error: true
        })
    }
    renderLists = () => {
        const ingredients = this.state.ingredients;
        if (ingredients.length > 0) {
            return ingredients.map(ingredient => {
                return (
                    <div key={ingredient.id}>
                        
                    </div>
                )
            })

        }
    }
}