import React from "react";
import { Link } from "react-router-dom";

// import Header from '../../Header/Header'
import RecipeSearchBox from '../RecipeSearchBox/RecipeSearchBox'
import RecipeFilter from '../RecipeFilter/RecipeFilter'
import RecipeListFilter from '../RecipeListFilter/RecipeListFilter'

import './RecipeSearch.css';



export default class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchTerms: '',
      searchResults: [],
      filterOptions: '',
      filterOptionsCuisine: ''
    };
  }

  handleSearch = (searchSubmitEvent, searchInput) => {
    searchSubmitEvent.preventDefault();
    let searchArray = this.state.searchTerms.split(' ')
    let searchTerms = searchArray.join(',+')
    let URL = `http://localhost:8000/api/recipes/getRecipes?ingredients=${searchTerms}`;

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(results => {
        this.setState({
          searchResults: results,
        });
      })
      .catch(err => {
        this.setState({
          error: 'Does Not Exist',
        });
      })
  }

  updateSearchTerm(term) {
    this.setState({
      searchTerms: term
    })
    console.log(term);
  }
  
  updateFilterOptions(options) {
    this.setState({
      filterOptions: options      
    })
    console.log(options);
  }
  
  updateFilterOptionsCuisine(optionsCuisine) {
    this.setState({
      filterOptionsCuisine: optionsCuisine   
    })
    console.log(optionsCuisine);
  }
  // displaySearchResults = () => {
  //   if (this.state.searchResults.length === 0) {
  //     return;
  //   }
  //   else {
  //     return (
  //       <div>
  //         <h2 id="results">Results:</h2>
  //         {this.state.recipes.map(recipe => <li key={recipe.id}>
  //           <Link className="individualResult"
  //             to={{
  //               pathname: `/recipes/search/${recipe.id}`,
  //               state: {
  //                 recipeId: recipe.id
  //               }
  //             }}>
  //             {recipe.title}
  //           </Link>
  //         </li>)}
  //       </div>
  //     )
  //   }
  // }

  render() {

    const { recipes } = this.state;
    return (
      <div className="searchRecipe">
        <p id="larger-search-text">Search our delicious and cruelty free recipes!</p>
        <p id="recipe-search-text">
          For best results, please use whole words as search terms. <br />Feel free to include more than one search term at a time.
        </p>
        <br />
        {/* <form className="searchArea" onSubmit={this.handleSearch}>
          <input id="searchBar" type="text" placeholder="Search by ingredients" onChange={e => this.setState({ searchTerms: e.target.value })}></input>
          <button id="searchButton" type="submit">Search</button>
        </form> */}
        <RecipeSearchBox 
          handleSearch={this.handleSubmit}
          handleUpdate={term => this.updateSearchTerm(term)} />
        <RecipeFilter
          handleFilterChange={options => this.updateFilterOptions(options)}
          handleFilterChangeCuisine={optionsCuisine => this.updateFilterOptionsCuisine(optionsCuisine)} />
        <RecipeListFilter 
          recipes={recipes} />
    
        {/* // <section className="recipeResults">
        //   {this.displaySearchResults()}

        // </section> */}

      </div>
    )
  }

}