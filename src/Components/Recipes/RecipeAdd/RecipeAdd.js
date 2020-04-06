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

  handleChange = (event) => {    
    this.setState({
      [event.target.name]: event.target.value   });
      console.log(event);
  }

  createSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const {
      title,      
      ingredients,
      instructions,
      meal_type, 
      cuisine_type
    } = this.state;

    

    this.setState({ error: null });

    Recipe.createRecipe({
      title: title,
      ingredients: ingredients.split(', '),
      instructions: instructions.split('. '),      
      meal_type: meal_type,
      cuisine_type: cuisine_type
    })
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          title.value = "";
          ingredients.value = "";
          instructions.value = "";          
          meal_type.value = "";
          cuisine_type.value ="";
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
        <header className="Creation-Header" id="add-recipe-header" aria-label="create new recipe">
          <h2>New Recipe: </h2>
        </header>
        <form className="Creation-Form" onSubmit={this.createSubmit}>
          {error && <p className="empty-fields-error-message">Fields cannot be empty. Please try again.</p>}

          <label className="field a-field a-field_a2" aria-label="recipe title">
            Title: 
            <input
              className="field__input a-field__input"
              required
              name="title"
              onChange = {this.handleChange}
            />
            <span className="a-field__label-wrap"><span className="a-field__label"></span></span>
          </label>
          <label className="field a-field a-field_a2" aria-label="recipe ingredients">
            Ingredients: <div className="inputParam">(separate by commas)</div>
            <input
              className="field__input a-field__input"
              required
              type="text"
              maxLength="60"
              name="ingredients"
              onChange = {this.handleChange}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2" aria-label="recipe instructions">
            Instructions: <div className="inputParam">(separate by period)</div> <textarea
              className="field__input a-field__input instructionsField"
              required
              type="text"
              maxLength="300"
              name="instructions"
              onChange = {this.handleChange}
            ></textarea>
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>          
          <label htmlFor="filter_recipeType" name="meal_type">
            Meal Type:
            <br></br>
            <select className="dropDown" name="meal_type" onChange={this.handleChange} value={this.state.meal_type}>
              <option value></option>
              <option value="Breakfast" aria-label="Breakfast">Breakfast</option>
              <option value="Lunch" aria-label="Lunch">Lunch</option>
              <option value="Dinner" aria-label="Dinner">Dinner</option>
              <option value="Dessert" aria-label="Dessert">Dessert</option>
              <option value="Snack" aria-label="Snack">Snack</option>
              <option value="Breads and Crackers" aria-label="Breads and Crackers">Breads and Crackers</option>
              <option value="Side Dish" aria-label="Side Dish">Side Dish</option>
              <option value="fat-bombs" aria-label="Fat Bombs">Fat Bombs</option>
            </select>
          </label>
        
        <div className="FilterOptions__option">
          <label htmlFor="filter_cuisine_type" name="cuisine_type">
            Cuisine Type:
            <br></br>
            <select className="dropDown" name="cuisine_type" onChange={this.handleChange} value={this.state.cuisine_type}>            
                <option value></option>
                <option value="Universal" aria-label="Univeral">Universal</option>
                <option value="American" aria-label="American">American</option>
                <option value="Chinese" aria-label="Chinese">Chinese</option>
                <option value="French" aria-label="French">French</option>
                <option value="German" aria-label="German">German</option>
                <option value="Greek" aria-label="Greek">Greek</option>
                <option value="Indian" aria-label="Indian">Indian</option>
                <option value="Irish" aria-label="Irish">Irish</option>
                <option value="Italian" aria-label="Italian">Italian</option>
                <option value="Japanese" aria-label="Japanese">Japanese</option>                        
                <option value="Korean" aria-label="Korean">Korean</option>
                <option value="Mexican" aria-label="Mexican">Mexican</option>
                <option value="Middle Eastern" aria-label="Middle Eastern">Middle Eastern</option>
                <option value="Russian" aria-label="Russian">Russian</option>                        
                <option value="Spanish" aria-label="Spanish">Spanish</option>               
                <option value="Thai" aria-label="Thai">Thai</option>
                <option value="Vietnamese" aria-label="Vietnamese">Vietnamese</option>   
            </select>
          </label>
          <div className="btn-row">
            {/* <Link to="/recipes"> */}
            <div>
              <button className="medButton" type="submit" aria-label="Create it">Create It!</button>
            </div>
            {/* </Link> */}
            <Link to="/recipes">
              <button className="medButton" aria-label="back">Back</button>
            </Link>
          </div>
          </div> 
        </form>
      </div>
    );
  }
}


