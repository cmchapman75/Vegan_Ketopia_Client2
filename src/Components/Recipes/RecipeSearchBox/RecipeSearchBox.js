import React, { Component } from 'react';
import './RecipeSearchBox.css';



//contains the ingredient search feature for Recipe Search
class RecipeSearchBox extends Component {
  
  render() {
    return (
      <div className="searchRecipe" id="SearchBox">
        <form 
            className="searchArea" 
            onSubmit={e => 
            this.props.handleSubmit(e)}>
           
          <label htmlFor="ingredient-search">Search: </label>         
          <input 
            type="text"
            name="ingredient_search"
            id="ingredient-search-field"
            placeholder="Broccoli or Zucchini" 
            value={this.props.term}
            onChange={e => 
                this.props.handleUpdate(e.target.value)}/>
          <button 
            id="searchButton" 
            type="submit">Search</button>         
         </form>
      </div>   
    );
  }
}

export default RecipeSearchBox;