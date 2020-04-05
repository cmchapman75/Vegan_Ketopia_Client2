import React from "react";
import TokenService from '../../../Helpers/Token'
import config from '../../../config';
import { Link } from "react-router-dom";

// import Header from '../../Header/Header'
import RecipeSearchBox from '../RecipeSearchBox/RecipeSearchBox'
import RecipeFilter from '../RecipeFilter/RecipeFilter'
// import RecipeListFilter from '../RecipeListFilter/RecipeListFilter'

import './RecipeSearch.css';



export default class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchTerm: '',
      filterOptions: '',
      filterOptionsCuisine: '',
      searchResults: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    //Code below to expand to multiple search terms. 
    // let searchArray = this.state.searchTerms.split(' ')
    // let searchTerms = searchArray.join(',+')
    this.setState({ error: null });
    const searchInput = this.state.searchTerm;
    const baseUrl = `${config.API_ENDPOINT}/api/recipes/search`;
    const authToken = TokenService.getAuthToken();
    //create full url from all search terms.
    const fullSearchUrl = this.fullQuery(baseUrl, searchInput);

    fetch(fullSearchUrl,  {      
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
        .then(recipeResultObj => {
          console.log(recipeResultObj);
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
    console.log(searchInput);
    const { filterOptions, filterOptionsCuisine } = this.state;
    let queryParams = [];    
    if (searchInput !== "") {
      queryParams.push("q=" + searchInput);
     }
     if (filterOptions !== "") {
      queryParams.push("meal_type=" + filterOptions);
     }
     if (filterOptionsCuisine !== "") {
       queryParams.push("cuisine_type=" + filterOptionsCuisine);
     }    
    let fullQuery = queryParams.join("&");
    const fullUrl = baseURL + "?" + fullQuery;
    return fullUrl;
  };

  updateSearchTerm(term) {
    this.setState({
      searchTerm: term
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

    //Line below to be implemented when I can figure out correct query for server.
    // const { recipes, searchTerm, filterOptions, filterOptionsCuisine } = this.state;
    // const { recipes, searchTerm } = this.state;
    return (
      <div className="searchRecipe">
        <h1>Recipe Search</h1>
        <p id="larger-search-text">Search our delicious and cruelty free recipes!</p>
        <p id="recipe-search-text">
          For best results, please use whole words as search terms. <br />Please use one search term at a time.
        </p>
        <br />
        

        <RecipeFilter
          handleFilterChange={options => this.updateFilterOptions(options)}
          handleFilterChangeCuisine={optionsCuisine => this.updateFilterOptionsCuisine(optionsCuisine)} />
        <RecipeSearchBox 
          handleSubmit={this.handleSubmit}
          handleUpdate={term => this.updateSearchTerm(term)} />
        <Link to="/recipes">
              <button className="medButton">Cancel</button>
        </Link>
        {/* <RecipeListFilter 
          recipes={recipes}
          searchTerm={searchTerm}
          //To be implemented later.
           filterOptions={filterOptions}
          filterOptionsCuisine={filterOptionsCuisine} 
          /> */}
    
         <section className="recipeResults">
          {this.displaySearchResults()}
         </section>

      </div>
    )
  }

}