import React from "react";
import RecipeHelper from "../../../Helpers/Recipe";
import TokenService from '../../../Helpers/Token'
import config from '../../../config';
import './RecipeList.css';
import _ from "lodash";


export default class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recipeId: ""
    };
  }

  componentDidMount() {
    this.getRecipeInstructions();
  }

  backToSearch = () => {
    this.props.history.push("/recipes/search")
  }

  getRecipeInstructions = () => {
    let recipeId = _.get(this, "props.location.state.recipeId");
    let URL = `${config.API_ENDPOINT}/api/recipes/${recipeId}`;
    const authToken = TokenService.getAuthToken();

    fetch(URL,  {      
      headers: {
        "content-type": "application/json",        
        'Authorization': `Bearer ${authToken}`
      }      
    })          
      .then(res => {
        // console.log(res);
        if (!res.ok) {
          throw new Error(res.statusText);
        }        
        return res.json();        
      })        
      .then(recipe => {
        this.setState({
          recipe: recipe,
          recipeId: recipeId,
          ingredients: recipe.Ingredients,
          instructions: recipe.Instructions,
          meal_type: recipe.meal_type,
          cuisine_type: recipe.cuisine_type

        });
      })
      .catch(err => {
        this.setState({
          error: "Does Not Exist"
        });
      });
  };

  handleCreationSuccess = () => {
    window.location.pathname = "/recipes"
  };

  addRecipe = () => {
    let instructionsSet = [];
    let ingredientsSet = [];
    let meal_type = '';
    let cuisine_type = '';
    if (this.state.instructions) {
      this.state.instructions.steps.map(instruction =>
        instructionsSet.push(instruction.step)
      );
    }
    else {
      instructionsSet = ["Instructions N/A"];
    }
    this.state.ingredients.map(ing => ingredientsSet.push(ing.name));
    let recipeObj = {
      title: this.state.recipe.title,
      recipe_description: instructionsSet,
      recipe_ingredients: ingredientsSet,
      meal_type: meal_type,
      cuisine_type: cuisine_type

    };
    RecipeHelper.createRecipe(recipeObj)
      .then(recipe => {
        this.handleCreationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {

    let instructionsArr = [];
    if (this.state.instructions) {
      this.state.instructions.steps.map(instruction =>
        instructionsArr.push(instruction.step)
      );
    }
    return (
      <div className="view" id="recipeView">
        <div className="image-container">
          {/* <div
            className="image"
            style={{ backgroundImage: `url(${this.state.recipe.image})` }}
          /> */}
        </div>
        <p className="recipeTitleHeader">Recipe:</p>
        <p className="recipeTitle">{this.state.recipe.title}</p>
        <p className="recipeHeaders">Recipe Ingredients:</p>
        <p className="recipeInfo">
          {this.state.ingredients &&
            this.state.ingredients.map(ingredient => `${ingredient.name}, `)}
        </p>

        <p className="recipePageHeader">Recipe Instructions: </p>
        <section className="recipeInfo instructions">
          {instructionsArr.map(inst => (
            <p key={inst}>{inst}</p>
          ))}
        </section>
        
        <div className="buttonGroupSearch">
          <button className="medButton" onClick={this.addRecipe}>Add It!</button>
          <button className="medButton" onClick={this.backToSearch}>Back</button>
        </div>
      </div>
    );
  }
}

