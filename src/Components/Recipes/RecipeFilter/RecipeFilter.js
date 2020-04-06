import React, { Component } from 'react';
import './RecipeFilter.css';

// child of RecipeSearch --creates dropdowns for Recipe Search Page
class RecipeFilter extends Component {
  render() {
    const { handleFilterChange, handleFilterChangeCuisine } = this.props;
    return (
      <div className="FilterOptions">
        <div className="FilterOptions__option">
          <label htmlFor="filter_recipeType" aria-label="meal type">
            Meal Type:
            <br></br>
            <select className="dropDown"
              // checked={filterOptions === "All"}
              onChange={e => handleFilterChange(e.target.value)}>
              <option value="all"></option>              
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
        </div>
        <div className="FilterOptions__option">
          <label htmlFor="filter_cuisine_type" aria-label="cuisine type">
            Cuisine Type:
            <br></br>
            <select className="dropDown"
                // checked={filterOptionsCuisine === "All"}
                onChange={e => handleFilterChangeCuisine(e.target.value)}>
                <option value="all"></option>
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
        </div>
      </div>
    );
  }
}

export default RecipeFilter;