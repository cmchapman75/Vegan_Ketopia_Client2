import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing";

import PublicRoute from "./Components/PublicRoute/PublicRoute";
import LoginRoute from "./Routes/LoginRoute/LoginRoute";
import NewAccountRoute from "./Routes/NewAccountRoute/NewAccountRoute";

import PrivateRoute from "./Components/PrivateOnly/PrivateRoute";
import DashboardRoute from "./Routes/DashboardRoute/DashboardRoute";
import PantryRoute from "./Routes/PantryRoute/PantryRoute";
import RecipesRoute from "./Routes/RecipesRoute/RecipesRoute";
import RecipeSearch from "./Components/Recipes/RecipeSearch/RecipeSearch";
import RecipeDetail from "./Components/Recipes/RecipeDetail/RecipeDetail";

import RecipeList from "./Components/Recipes/RecipeList/RecipeList";

import NotFoundRoute from "./Routes/NotFoundRoute/NotFoundRoute";

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isLoggedIn: false,
      recipes: [],
      hasError: false
    };
  }

  render() {
    

    return (
      <div className="App">
        <main>
          <Header user={this.state.currentUser} />
          <Switch>
            <PublicRoute
              exact
              path={"/"}
              component={Landing}
            />
            <PublicRoute
              exact
              path={"/register"}
              component={NewAccountRoute}
            />
            <PublicRoute
              exact
              path={"/login"}
              component={LoginRoute}
            />
            <PrivateRoute
              exact
              path={"/home"}
              component={DashboardRoute}
            />
            <PrivateRoute
              exact
              path={"/pantry"}
              component={PantryRoute}
            />  
            <PrivateRoute
              exact
              path={"/recipes"}
              component={RecipesRoute}
            />
            <PrivateRoute
              exact
              path={"/recipes/search"}
              component={RecipeSearch}
            />            
            <PrivateRoute
              exact
              path={"/recipes/:recipeId"}
              component={RecipeDetail}
            />            
            <PrivateRoute
              exact
              path={"/recipes/search/:recipeId"}
              component={RecipeList}
            />   
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
