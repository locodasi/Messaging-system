import React, { useContext, createContext, useReducer } from 'react';

const StateContext = createContext();

const StateRedurcer = (state, action) => {
    switch(action.type){
        case "setContact": {
            return {
                ...state,
                contact:action.contact
            }
        }
        case "setUser": {
            localStorage.setItem('messasegin-user-token', action.user.value);
            return {
                ...state,
                user:action.user
            }
        }
        case "cleanUser": {
            localStorage.removeItem('messasegin-user-token');
            return {
                ...state,
                user:null
            }
        }
        default: {
            return state;
        }
    }
}

const StateProvider = ({children}) => {

    const [state, dispatch] = useReducer(StateRedurcer, {contact: null, user: null});
    return (
        <StateContext.Provider value={[state,dispatch]}>
            {children}
        </StateContext.Provider>
    )
};

const useContextState = () => {
    const context = useContext(StateContext);
    if(context === undefined) throw new Error("useState  must be used in StateContext");
    return context;
}

const useStateContextState = () => {
    const context = useContext(StateContext);
    if(context === undefined) throw new Error("useStateContextState  must be used in StateContext");
    return context[0]; 
}

const useDispatchState = () => {
    const context = useContext(StateContext);
    if(context === undefined) throw new Error("useDispatchState  must be used in StateContext");
    return context[1]; 
}

export {StateProvider, useContextState, useStateContextState, useDispatchState}