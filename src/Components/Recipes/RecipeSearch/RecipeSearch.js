import React from "react";
import TokenService from '../../../Helpers/Token'
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
      filterOptions: '',
      filterOptionsCuisine: ''
    };
  }

  handleSubmit = (searchSubmitEvent, searchInput) => {
    searchSubmitEvent.preventDefault();
    this.setState({
      searchTerms: searchInput
    });
    //Code below to expand to multiple search terms. 
    // let searchArray = this.state.searchTerms.split(' ')
    // let searchTerms = searchArray.join(',+')
    
    const baseUrl = "http://localhost:8000/api/recipes/";
    const authToken = TokenService.getAuthToken();
    //create full url from all search terms.
    const fullSearchUrl = this.fullQuery(baseUrl, searchInput);

    fetch(fullSearchUrl,  {      
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      }
    })      
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(results => results.json())
        .then(recipeResultObj => {
          this.setState({
            recipes: recipeResultObj,
            error: null
          });
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
  }

  fullQuery = (baseURL, searchInput ) => {
    // add key later
    const { filterOptions, filterOptionsCuisine } = this.state;
    let queryParams = [];
    
    if (searchInput !== "") {
      queryParams.push("q=" + searchInput);
    }
    if (filterOptions !== "") {
      queryParams.push("mealType=" + filterOptions);
    }
    if (filterOptionsCuisine !== "") {
      queryParams.push("cuisineType=" + filterOptionsCuisine);
    }
    
    let fullQuery = queryParams.join("&");
    const fullUrl = baseURL + "?" + fullQuery;
    console.log(fullQuery);
    return fullUrl;
  };

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

  displaySearchResults = () => {
    if (this.state.recipes.length === 0) {
      return;
    }
    else {
      return (
        <div>
          <h2 id="results">Recipes:</h2>
          {this.state.recipes.map(recipe => <li key={recipe.id}>
            <Link className="individualResult"
              to={{
                pathname: `/recipes/search/${recipe.id}`,
                state: {
                  recipeId: recipe.id
                }
              }}>
              {recipe.title}
            </Link>
          </li>)}
        </div>
      )
    }
  }

  render() {

    const { recipes, searchTerms, filterOptions, filterOptionsCuisine } = this.state;
    return (
      <div className="searchRecipe">
        <p id="larger-search-text">Search our delicious and cruelty free recipes!</p>
        <p id="recipe-search-text">
          For best results, please use whole words as search terms. <br />Please use one search term at a time.
        </p>
        <br />
        {/* <form className="searchArea" onSubmit={this.handleSearch}>
          <input id="searchBar" type="text" placeholder="Search by ingredients" onChange={e => this.setState({ searchTerms: e.target.value })}></input>
          <button id="searchButton" type="submit">Search</button>
        </form> */}
        <RecipeSearchBox 
          handleSubmit={this.handleSubmit}
          handleUpdate={term => this.updateSearchTerm(term)} />
        <RecipeFilter
          handleFilterChange={options => this.updateFilterOptions(options)}
          handleFilterChangeCuisine={optionsCuisine => this.updateFilterOptionsCuisine(optionsCuisine)} />
        <RecipeListFilter 
          recipes={recipes}
          searchTerms={searchTerms}
          filterOptions={filterOptions}
          filterOptionsCuisine={filterOptionsCuisine} />
    
         <section className="recipeResults">
          {this.displaySearchResults()}
         </section>

      </div>
    )
  }

}