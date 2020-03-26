import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../../Helpers/Recipe";
import Context from "../../../Contexts/Context";
import _ from "lodash";
import "../../../Routes/RecipesRoute/RecipesRoute.css";

export default class CreateRecipe extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  componentDidMount() {
    Recipe.recipeById(_.get(this, "props.match.params.recipeId")).then(
      data => {
        this.setState({ recipe: data });
      }
    );
  }

  handleEditSuccess = () => {
    const { history } = this.props;

    history.push(`/recipes/${this.state.recipe.id}`);
  };

  editSubmit = ev => {
    ev.preventDefault();
    let title = ev.target.title.value;
    let instructions = ev.target.instructions.value.split("\n");
    let ingredients = ev.target.ingredients.value.split(", ");

    this.setState({ error: null });
    Recipe.updateRecipe(
      {
        id: this.state.recipe.id,
        title,
        instructions,
        ingredients        
      },
      this.state.recipe.id
    )
      .then(recipe => {
        if (!recipe.ok) { this.setState({ error: !recipe.ok }) }
        else {
          this.handleEditSuccess();
          title = "";
          instructions = "";
          ingredients = "";
        }
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  owner = () => {
    let instructionsArr = [];
    if (this.state.recipe.instructions) {
      let desc = this.state.recipe.instructions.slice(2);
      let desc1 = desc.slice(0, -2);
      let descarr = desc1.split('","');
      descarr.map(instruction => instructionsArr.push(instruction));
    }
    let error = this.state.error;
    return (
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" to="/" onSubmit={this.editSubmit}>
          {error && <p className="empty-fields-error-message">Fields cannot be empty. Please try again.</p>}
          <label className="field a-field a-field_a2">
            Title:
            <input
              className="field__input a-field__input"
              required
              name="title"
              defaultValue={this.state.recipe.title}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            Ingredients:
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_ingredients"
              defaultValue={
                this.state.recipe.recipe_ingredients &&
                this.state.recipe.recipe_ingredients.join(", ")
              }
            />
            <span className="a-field__label"></span>
          </label>
          <label className="field a-field a-field_a2">
            Instructions:
            <textarea
              className="field__input a-field__input instructionsField"
              required
              type="textfield"
              name="recipe_description"
              defaultValue={instructionsArr.join("\n")}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          
          <div className="btn-row">
            <button className="smallButton">Submit</button>
            <Link to={`/recipes/${this.state.recipe.id}`}>
              <button className="smallButton">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };
  render() {

    return <div className="Edit">
      {this.owner()}
    </div>;
  }
}
