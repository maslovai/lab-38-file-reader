import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import SignInForm from './signin';

const renderIf = (test, component, alternative) => {
    return test ? component : alternative
}

class Auth extends React.Component{
    constructor(props){
        super(props)
        // console.log("in auth:::",this.props.auth)
    }
    componentWillMount(){
        this.props.authSignin()   
    }
    
    render(){
        return(
            <div>{
                renderIf(
                    this.props.auth,
                    this.props.children,
                    <SignInForm auth = {this.props.auth} handleSignIn={this.props.authSignin} handleSignUp={this.props.authSignup}/>
                )
            }
            </div>
        )
        console.log("in auth render::::",handleSignIn);
    }
}
const mapStateToProps =(state)=>({
    auth:state.auth
})

const mapDispatchToProps = (dispatch, getState)=>({
    authSignin: user=>dispatch(actions.authSignin(user)),
    authSignup : user=>dispatch(actions.authSignup(user)),
    authSignout: ()=>dispatch(actions.authSignout(user))
})
    
export default connect(mapStateToProps, mapDispatchToProps)(Auth, SignInForm)