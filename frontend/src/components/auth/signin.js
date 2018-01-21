import React from 'react';
import Auth from './auth';

class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:this.props.username||'',
            password:this.props.password||'',
            email:this.props.email||''
        }
        console.log('in sign in', this.props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let handler = e.target.dataset.handler ==="signup" ? this.props.handleSignUp : this.props.handleSignIn ;
        console.log("handler:::",handler);
        handler(this.state);
    }
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            
            <div className = "signinDiv">
                
                <form className = "signInForm" data-handler="signin" onSubmit = {this.handleSubmit}>
                    <label>Registered users sign in:
                        <input type="text" 
                            name="username" 
                            onChange={this.handleChange}
                            requiered = "true"
                            placeholder="type your name">
                        </input>
                    </label>
                    <label>
                        <input type="password" 
                            name="password" 
                            onChange={this.handleChange}
                            requiered = "true"
                            placeholder="password">
                        </input>
                    </label>
                    <button type = "submit">Sign in</button>
                </form>
               
                <form className = "signUpForm" data-handler="signup" onSubmit = {this.handleSubmit} >
                    <label>New users sign up here:
                        <input type="text" 
                            name="username" 
                            onChange={this.handleChange}
                            requiered = "true"
                            placeholder="type your name">
                        </input>
                    </label>
                    <label>
                        <input type="email" 
                            name="email" 
                            onChange={this.handleChange}
                            requiered = "true"                       
                            placeholder="type your email">
                        </input>
                    </label>
                    <label>
                        <input type="password" 
                            name="password" 
                            onChange={this.handleChange}
                            requiered = "true"
                            placeholder="type your password">
                        </input>
                    </label>
                    <button type = "submit">Sign up</button>
                </form>
            </div> 
             
        )
    }
}
export default SignInForm;