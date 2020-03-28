import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AuthHelper from "../../Helpers/Auth";

import "./NewAccount.css";

class NewAccount extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: null,            
            username: '',
            email_address: '',
            password: ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.createSubmit = this.createSubmit.bind(this);
      }
    // static defaultProps = {
    //     location: {},
    //     history: {
    //         push: () => { }
    //     },        
    // };
    
    state = { error: null};
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCreationSuccess = () => {
        const { history } = this.props;
        history.push("/login");
    };

    

    createSubmit = e => {
        e.preventDefault();
        const { username, email_address, password } = e.target;
        console.log(username, email_address, password);

        this.setState({ error: null });

        AuthHelper.createUser({
            username: username.value,
            email_address: email_address.value,
            password: password.value
        })
        .then(user => {
            username.value = "";
            email_address.value = "";
            password.value = "";
            this.handleCreationSuccess();
        })
        .catch(res => {
            this.setState({ error: res.error });
        });
    };

    // componentDidMount() {
    //     this.
    // }
    render() {
        let error = this.state.error;
        return(
            <div className="account-creation">
                <header className="creation-header"></header>
                <form className="creation-form" onSubmit={this.createSubmit}>
                    <div role={"alert"}>
                        {error && <p className="red" id="error-message">{this.state.error}</p>}                        
                    </div>
                    <label className="field-label">
                        Username:
                    </label>
                    <input
                        className="field-input"
                        required
                        name="username"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                        // placeholder="Username"
                    />
                    <label className="field-label">
                        Email Address:
                    </label>
                    <input 
                        className="field-input"
                        required
                        name="email_address"
                        value={this.state.email_address}
                        onChange={e => this.handleChange(e)}
                        // placeholder="Email Address"
                    />  
                    <label className="field-label">
                        Password:    
                    </label>  
                    <input 
                        className="field-input"
                        required
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                        // placeholder="Password"
                    />  
                    <div className="button-con">
                        <button className="medButton" id="create-button">Create</button>
                        <br />
                        <Link to="/Login">
                            <button className="medButton">Already a Ketopian?</button>
                        </Link>                    
                    
                    </div>  

                </form>
            </div>
        )
    }

}


export default NewAccount;