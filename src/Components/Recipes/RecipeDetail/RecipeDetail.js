import React from "react";
import RecipeHelper from "../../../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "../../../Contexts/Context";
import './RecipeDetail.css'

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe:this.props.recipe,
      owner: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    if (recipeId) {
    RecipeHelper.recipeById(recipeId).then(
      recipeData => {
        this.setState({
          recipe: recipeData
         
        })
      })
  }
  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeId).then(
      this.props.history.push("/recipes")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="delete-recipe-button-div">
          <button className="medButton" onClick={this.deleteRecipe}>
            Delete Recipe
          </button>
        </div>
      );
    }
  };

  render() {
    if (!this.state.recipe) {
      return <div>No recipe found</div>
    }

    return (
      <div className="view" id="recipeView">  
              
        <p className="recipePageHeader">Title:</p>
        <p className="recipeInfo">{this.state.recipe.title}</p>
        <p className="meal_typeInfo">{this.state.recipe.meal_type}</p>
        <p className="cuisine_typeInfo">{this.state.recipe.cuisine_type}</p>
        <p className="recipeHeaders">Recipe Ingredients:</p>
        <p className="recipeInfo">
          {this.state.recipe.ingredients &&
            this.state.recipe.ingredients.join(', ')}
        </p>

        <p className="recipeHeaders">Recipe Instructions: </p>
        <p className="recipeInfo">
          {this.state.recipe.instructions &&
            this.state.recipe.instructions.join(', ')}
        </p>

       
        <div className="buttonGroup">
          {/* <div>{this.ownerOption()}</div> */}
          <div>{this.deleteOption()}</div>
          <Link to="/recipes">
            <button className="cancel-view medButton">Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}
