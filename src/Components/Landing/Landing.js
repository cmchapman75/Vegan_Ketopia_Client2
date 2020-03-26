import React from "react";
import { Link } from "react-router-dom";
// import homePage from "../../Assets/homePage.gif";
// import pantryLanding from '../../Assets/pantryLanding.gif';
// import recipeDetail from '../../Assets/recipeDetail.gif';
import "./Landing.css";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item branding">
          </div>
          <div className="flex-item"></div>
        </header>
        <section id="landingDocumentation">
          <div className="site-description">
          <h2 className="Landing-Slogan">
            The Cruelty Free Keto Recipe Stop!
          </h2>
          <h3 className="intro-info">What is Vegan Ketopia</h3>
                    <p className="intro-container">
                    Vegan Ketopia is your one stop for healthy and tasty vegan keto meals.
            You will have the ability to search for recipes using ingredients, macros, meal type
            or cuisine type.  You will have the ability to add any of your favorite recipes to
            the app, as well as mark your favorites.
                    </p>

            <div className="login-signup">
              <div className="LoginBtn">
                <label className="login-label">Login: </label>
                <Link className="login-btn" to="/login">
                Enter to find the tastiest recipes!
                </Link>
              </div>
              <div className="RegistrationBtn">
                <label className="registration-label">Sign Up:</label>
                <Link className="registration-btn" to="/register">
                  Come Join the Fun!
                </Link>
              </div>
            </div>
            {/* <h4>Please test out our site using the username of 'Guestuser' and the password of !1asdf@@@M</h4> */}
            <div className="sampleImages">
              {/* <img src={pantryLanding} className="landingSamples" alt="Pantry Landing" id="recipe-search" />
              <img src={homePage} className="landingSamples" alt="Home Page" id="pantry-add-form" />
              <img src={recipeDetail} className="landingSamples" alt="Recipe Detail" id="meal-planning-add-button" /> */}
            </div>
          </div>
        </section>
        <section id="Landing-Buttons">
          <hr id="Connect-Divider" />
          <div id="buttons"></div>
        </section>
      </div>
    );
  }
}
