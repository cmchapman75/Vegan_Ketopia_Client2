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

  handleChange(event) {
    // this.setState({value:
    //   event.target.value});
  }

  createSubmit = e => {
    e.preventDefault();
    const {
      title,
      instructions,
      ingredients,
    } = this.state;

    

    this.setState({ error: null });
    let recipeIngredients = ingredients.value.split(', ');

    Recipe.createRecipe({
      title: title.value,
      instructions: instructions.value.split('. '),
      ingredients: recipeIngredients,
    })
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          title.value = "";
          instructions.value = "";
          ingredients.value = "";
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
          <div className="btn-row">
            <div>
              <button className="medButton" type="submit">Create recipe</button>
            </div>
            <Link to="/recipes">
              <button className="medButton">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}


// render() {
//   return (
//      <div className="recipeAddForm">
//          <form id="add-recipe" className="recipe-form">
//              <div className="form-section">
//                  <label className="recipe-name">Recipe Name: </label>
//                  <input type="text" name="recipe-name" placeholder="Coconut Flatbread" required></input>
//              </div>
//              <div className="form-section">
//                  <label className="recipe-ingredients">Ingredients: </label>
//                  <textarea name="recipe-ingredients" rows="25" placeholder="1 Cup Coconut Flour" required></textarea>
//              </div>
//              <div className="form-section">
//                  <label className="recipe-instructions">Instructions: </label>
//                  <textarea name="recipe-instructions" rows="45" placeholder="Simmer over low heat" required></textarea>
//              </div>
//          </form>
//           <div className="cuisine-type">
//              <select>
//                  <option value="Mexican">Mexican</option>
//                  <option value="Korean">Korean</option>
//                  <option value="Chinese">Chinese</option>
//                  <option value="Japanese">Japanese</option>
//                  <option value="Thai">Thai</option>
//                  <option value="Vietnamese">Vietnamese</option>
//                  <option value="Russian">Russian</option>
//                  <option value="Italian">Italian</option>
//                  <option value="Spanish">Spanish</option>
//                  <option value="French">French</option>
//                  <option value="German">German</option>
//                  <option value="Greek">Greek</option>
//              </select>
//         </div>

//         <div className="Meal Type">
//              <select>
//                  <option value="breakfast">Breakfast</option>
//                  <option value="lunch">Lunch</option>
//                  <option value="dinner">Dinner</option>
//                  <option value="dessert">Dessert</option>
//                  <option value="snack">Snack</option>
//                  <option value="fat-bombs">Fat Bombs</option>
//              </select>
//         </div>

//       </div>

//          // Future options
//        /* <div class="nutrition-info-container" class="form-section">
//          <label for="serving-size">Serving Size</label>
//          <input type="number" name="serving-size" placeholder="79">
//          <label for="calories">Calories</label>
//          <input type="number" name="Calories" placeholder="0">
//          <label for="total-fat">Total Fat</label>
//          <input type="number" name="total-fat" placeholder="0">
//          <label for="cholesterol">Cholesterol</label>
//          <input type="number" name="cholesterol" placeholder="0">
//          <label for="sodium">sodium</label>
//          <input type="number" name="sodium" placeholder="0">
//          <label for="total-carbs">Total Carbohydrates</label>
//          <input type="number" name="total-carbs" placeholder="6g">
//          <label for="net-carbs">Net Carbs</label>
//          <input type="number" name="net-carbs" placeholder="2g">
//          <label for="dietary-fiber">Dietary Fiber</label>
//          <input type="number" name="dietary-fiber" placeholder="4g">
//          <label for="total-sugars">Total Sugars</label>
//          <input type="number" name="total-sugars" placeholder="2g">
//          <label for="protein">Protein</label>
//          <input type="number" name="protein" placeholder="4g">
//          <label for="vitamin-d">Vitamin D</label>
//          <input type="number" name="viewport" placeholder="0%">
//          <label for="vitamin-c">Vitamin C</label>
//          <input type="number" name="vitamin-c" placeholder="0%">
//          <label for="calcium">Calcium</label>
//          <input type="number" name="calcium" placeholder="2%">
//          <label for="iron">Iron</label>
//          <input type="number" name="iron" placeholder="10%">
//          <label for="potassium">Potassium</label>
//          <input type="number" name="potassium" placeholder="0%">
//        </div>


//        <div class="marco-type">
//          <select>
//          <option value="fat">Fat</option>
//          <option value="protein">Protein</option>
//          <option value="carbohydrates">Carbohydrates</option>           
//        </select>
//        </div> */


//      //    </div>
        
//     );
// }