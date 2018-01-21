let thunk = store => next => action => {
        console.log('thunk:::::', store.getState());
        return typeof action === "function"
            ? action(store.dispatch, store.getState)
            : next(action);
    };
    
export default thunk;