import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashboardRoute.css';


class DashboardRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div id="dashboard-container">
                <ul id="dashboard-links-list">
                    <Link
                        className="dashboard-link-text"
                        to={"/pantry"}>
                        <li className="dashboard pantry">
                            <p className="pantrytag">
                                Stock It!
                            </p>
                        </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/recipes"}>
                        <li className="dashboard recipes">
                            <p className="recipetag">
                                Cook It!
                            </p>
                        </li>
                    </Link>  
                    <Link
                        className="dashboard-link-text"
                        to={"/"}>
                        <li className="dashboard recipes">
                            <p className="recipetag">
                                Plan It!
                                {/* Future Meal Planning! */}
                            </p>
                        </li>
                    </Link> 
                    <Link
                        className="dashboard-link-text"
                        to={"/"}>
                        <li className="dashboard recipes">
                            <p className="recipetag">
                                Shop It!
                                {/* Future Recipe List!! */}
                            </p>
                        </li>
                    </Link>                   
                </ul>
            </div >
        );
    }
}

export default DashboardRoute;