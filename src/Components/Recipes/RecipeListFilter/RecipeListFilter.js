import React, { Component } from 'react';
import './RecipeListFilter.css';
import RecipeDetail from '../RecipeDetail/RecipeDetail';

class RecipeFilter extends Component {
  //runs the filters and mapping over the recipes table in the database--child of RecipeSearch
  render() {
    //Line below to be implemented when I can figure out proper query for the back end. 
    // const { searchTerms, filterOptions, filterOptionsCuisine } = this.props;
    const { searchTerm } = this.props;
    if (searchTerm === " ") {
      return 'No matching results'
    }
    const recipeList = this.props.recipes

    
    //Filters below to be implemented when I can figure out proper query for the back end. 
    
    // .filter(recipe => (recipe.recipeType === filterOptions || filterOptions === 'All'))
    //     .filter(recipe => (recipe.cuisineType === filterOptionsCuisine || filterOptionsCuisine === 'All'))
    .filter(recipe => {
      return recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
    })
        .map((recipe, key) => <RecipeDetail {...recipe} key={key} />);
        
        
        console.log(this.props.recipes);
        // console.log(filterOptions);
        // console.log(filterOptionsCuisine);
    return (
      <div className="FilterableList">
        {recipeList}

      </div>
    );
  }
}

RecipeFilter.defaultProps = {
  recipes: []
};


export default RecipeFilter;