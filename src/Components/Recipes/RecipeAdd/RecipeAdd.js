import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../../Helpers/Recipe";
import './RecipeAdd.css'


export default class RecipeAdd extends React.Component {
  static defaultProps = {
    currentUser: {},
    location: {},
    history: {
      push: () => { }
    }
  };

  handleCreationSuccess = () => {
    const { history } = this.props;
    history.push("/recipes");
  };

  state = { error: null };

  handleChange  = (event) => {
    this.setState({value:
      event.target.value});
  }

  createSubmit = e => {
    e.preventDefault();
    const {
      title,      
      ingredients,
      instructions,
      mealType, 
      cuisineType
    } = this.state;

    

    this.setState({ error: null });
    // let recipeIngredients = ingredients.value.split(', ');

    Recipe.createRecipe({
      title: title.value,
      ingredients: ingredients.value.split(', '),
      instructions: instructions.value.split('. '),      
      mealType: mealType.value,
      cuisineType: cuisineType.value
    })
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          title.value = "";
          instructions.value = "";
          ingredients.value = "";
          mealType.value = "";
          cuisineType.value ="";
          this.handleCreationSuccess();
        }
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    let error = this.state.error;
    return (

      <div className="Creation">
        <header className="Creation-Header" id="add-recipe-header">
          New Recipe
        </header>
        <form className="Creation-Form" onSubmit={this.createSubmit}>
          {error && <p className="empty-fields-error-message">Fields cannot be empty. Please try again.</p>}

          <label className="field a-field a-field_a2">
            Title: 
            <input
              className="field__input a-field__input"
              required
              name="title"
              placeholder="Title"
              onChange = {this.handleChange}
            />
            <span className="a-field__label-wrap"><span className="a-field__label"></span></span>
          </label>
          <label className="field a-field a-field_a2">
            Ingredients: <div className="inputParam">(separate by commas)</div>
            <input
              className="field__input a-field__input"
              required
              type="text"
              maxLength="60"
              name="recipe_ingredients"
              placeholder="Recipe ingredients"
              onChange = {this.handleChange}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            Instructions: <div className="inputParam">(separate by period)</div> <textarea
              className="field__input a-field__input instructionsField"
              required
              type="text"
              maxLength="300"
              name="recipe_description"
              placeholder="Recipe description"
              onChange = {this.handleChange}
            ></textarea>
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>          
          <label htmlFor="filter_recipeType">
            Recipe Type:
            <select className="recipeTypeFilter"
              >
              <option value></option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
              <option value="Breads and Crackers">Breads and Crackers</option>
              <option value="Side Dish">Side Dish</option>
              <option value="fat-bombs">Fat Bombs</option>
            </select>
          </label>
        
        <div className="FilterOptions__option">
          <label htmlFor="filter_cuisineType">
            Cuisine Type:
            <select>            
                <option value></option>
                <option value="Universal">Universal</option>
                <option value="American">American</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Indian">Indian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>                        
                <option value="Korean">Korean</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Russian">Russian</option>                        
                <option value="Spanish">Spanish</option>               
                <option value="Thai">Thai</option>
                <option value="Vietnamese">Vietnamese</option>   
            </select>
          </label>
          <div className="btn-row">
            <div>
              <button className="medButton" type="submit">Create recipe</button>
            </div>
            <Link to="/recipes">
              <button className="medButton">Cancel</button>
            </Link>
          </div>
          </div> 
        </form>
      </div>
    );
  }
}


