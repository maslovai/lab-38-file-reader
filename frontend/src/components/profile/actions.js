import superagent from 'superagent';
import cookies from 'react-cookies';

export const updateUser = user => dispatch=>{
    let token = cookies.load("auth");
    console.log('in edit user', user)
    superagent
    .put(`${__API_URL__}/user/${user._id}`)
    .set("Authorization", "Bearer "+ token)
    .field('username', user.username)
    .attach('avatar', user.avatarFile)
    .then(res => {
        dispatch(updateUserAction(res.body))
    })
    .catch(err => {
        console.error("error", err)
    })
    
}

const updateUserAction = user =>({
    type:"UPDATE_USER",
    payload:user
})