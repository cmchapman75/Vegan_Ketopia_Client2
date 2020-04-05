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
                            <button className="dashboard">Stock It!</button>                            
                        </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/recipes"}>
                        <li className="dashboard recipes">
                        <button className="dashboard">Cook It!</button>
                        </li>
                    </Link>  
                    <Link
                        className="dashboard-link-text"
                        to={"/"}>
                        <li className="dashboard recipes">
                        <button className="dashboard">Coming soon: <br></br>Plan It!</button>
                        </li>
                    </Link> 
                    <Link
                        className="dashboard-link-text"
                        to={"/"}>
                        <li className="dashboard recipes">
                        <button className="dashboard">Coming soon: <br></br>Shop It!</button>

                        </li>
                    </Link>                   
                </ul>
            </div >
        );
    }
}

export default DashboardRoute;