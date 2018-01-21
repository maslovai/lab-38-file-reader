let initialState = [];

export default (state=initialState, action) => {

  let {type, payload} = action;

  switch(type) {

    case 'INIT':
        console.log("INIT");
        return payload || initialState;

    case 'CREATE':
        return [...state, payload];

    case 'UPDATE':
        return state.map(note => note._id === payload._id ? payload : note);

    case 'DELETE':
        return state.filter(note =>{
            console.log('type', typeof note._id)
            console.log('in reducer delete:::', note, payload)
            return note._id !== payload._id
        }) 

    case 'RESET':
        return initialState;

    default:
        return state;
  }

};