import React from 'react';

import {connect} from 'react-redux';
import * as actions from './actions'
import Auth, {renderIf} from '../auth/auth';

const photoToDataUrl = file => {
    return new Promise((resolve, reject) =>{
      let reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));
      return file ? reader.readAsDataURL(file) : reject(new Error('USAGE ERROR: requires file'));
    })
}

class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        let initialState={
            username:'',
            avatar:'',
            avatarFile:''
        }
        console.log('in profile, props:', this.props)
        this.state = Object.assign(initialState, this.props.profile)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    componentWillReceiveProps(){
        this.setState(this.props.profile)
    }

    handleChange(e) { 
        this.setState( {[e.target.name]:e.target.value} );  
        console.log(this.state)  
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.updateUser(Object.assign({}, this.props.profile, this.state));
        console.log(this.state)
    }

    handleImage(e){

    }

render(){
    
    return(
        <Auth>
            <h2>Welcome {this.props.profile.username}</h2>
            <form className = "profile" onSubmit = {this.handleSubmit}>
            
            <label>
            <span>Name</span>
                <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
            />   
            </label>
            
            <label>
                <figure>
                    <img src = {this.state.avatar}/>
                    <figcaption>Current Avatar</figcaption>
                </figure>
            </label>
            <label>
                <figure>
                    <img src = {this.state.preview}/>
                    <figcaption>Preview Avatar</figcaption>
                </figure>
            </label>
            <input 
                name="avatar"
                type="file"
                onChange={this.handleImage}
            />
            <button 
                type="submit">
                Save Profile
            </button>
            </form>
        </Auth>
    )
}
}

const mapStateToProps = state => ({
    profile:state.profile
 });
 
 const mappDispatchToProps = (dispatch, getState) => ({
     updateUser: user => dispatch(actions.updateUser(user))
 });
 
 export default connect(mapStateToProps,mappDispatchToProps)(Profile);