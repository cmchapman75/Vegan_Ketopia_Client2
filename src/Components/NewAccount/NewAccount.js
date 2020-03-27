import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AuthHelper from "../../Helpers/Auth";

import "./NewAccount.css";

class NewAccount extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state ={
    //         error: null,
    //         password: '',
    //         username: '',
    //         emailAddress: ''
    //     }
    
    //     this.handleChange = this.handleChange.bind(this);
    //     this.createSubmit = this.createSubmit.bind(this);
    //   }
    static defaultProps = {
        location: {},
        history: {
            push: () => { }
        },        
    };
    
    state = { error: null};
    // handleChange(event) {
    //     this.setState({[event.target.name]: event.target.value});
    // }

    handleCreationSuccess = () => {
        const { history } = this.props;
        history.push("/login");
    };

    

    createSubmit = e => {
        e.preventDefault();
        const { username, emailAddress, password } = e.target;
        console.log(username, emailAddress, password);

        this.setState({ error: null });

        AuthHelper.createUser({
            username: username,
            emailAddress: emailAddress,
            password: password
        })
        .then(user => {
            username.value = "";
            emailAddress.value = "";
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
                        // onChange={e => this.handleChange(e)}
                        // placeholder="Username"
                    />
                    <label className="field-label">
                        Email Address:
                    </label>
                    <input 
                        className="field-input"
                        required
                        name="emailAddress"
                        value={this.state.emailAddress}
                        // onChange={e => this.handleChange(e)}
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
                        // onChange={e => this.handleChange(e)}
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