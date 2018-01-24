let initialState = null;

export default(state=initialState,action)=>{

    let {type, payload} = action;
    
    switch(type) {

        // case 'SET_AUTH_TOKEN':
        // // console.log(payload);
        // return {token:payload.token};

        case "SET_AUTH_USER":
        // console.log('auth reducer, payload.user', payload)
        return {user:payload.user};

        case 'DELETE_AUTH_TOKEN':
        return initialState;
        
        default:
        return state;
    }
}