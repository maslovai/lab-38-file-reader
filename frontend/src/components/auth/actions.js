import superagent from 'superagent';
import cookie from 'react-cookies';
let AUTH = `${__AUTH_URL__}`;

export const authSignin = (user={}) => dispatch=>{
    let token = cookie.load("auth");
    console.log("in authSignin , token", token);
    if(token) {
        // console.log('in get with token',token)
        return superagent.get(`${AUTH}/api/validate`)
        .set('Authorization', 'Bearer ' + token)
        .then(res => {
            dispatch(setUser(res.body));
            return res;
        })
        .catch(err => console.error('Authenticaton Error:', err.message));
    };   

    return superagent.get(`${AUTH}/api/signin`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res=>{
        console.log('in actions get, res:::::', res)
        dispatch(setUser(res.body));
        return res
    })
}

export const authSignup = user => dispatch => {
    return superagent.post(`${AUTH}/api/signup`)
    .withCredentials()
    .send(user)
    .then(res=>{
        // console.log("in authSignup .get", res)
        dispatch(setUser(res.body));
        return res;
    })
}

export const authSignout =()=>({
    type:"DLELTE_AUTH_TOKEN"
})

// const setToken= token => ({
//     type:"SET_AUTH_TOKEN",
//     payload:token
// })

const setUser = auth => ({
    type: "SET_AUTH_USER",
    payload: auth
 });