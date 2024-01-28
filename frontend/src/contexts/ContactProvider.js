import React, { useContext, createContext, useReducer } from 'react';

const ContactContext = createContext();

const ContactRedurcer = (state, action) => {
    switch(action.type){
        case "setContact": {
            return {
                ...state,
                contact:action.contact
            }
        }
        default: {
            return state;
        }
    }
}

const ContactProvider = ({children}) => {

    const [state, dispatch] = useReducer(ContactRedurcer, {contact: null});
    return (
        <ContactContext.Provider value={[state,dispatch]}>
            {children}
        </ContactContext.Provider>
    )
};

const useContact = () => {
    const context = useContext(ContactContext);
    if(context === undefined) throw new Error("useContact  must be used in ContactContext");
    return context;
}

const useStateContact = () => {
    const context = useContext(ContactContext);
    if(context === undefined) throw new Error("useStateContact  must be used in ContactContext");
    return context[0]; 
}

const useDispatchContact = () => {
    const context = useContext(ContactContext);
    if(context === undefined) throw new Error("useDispatchContact  must be used in ContactContext");
    return context[1]; 
}

export {ContactProvider, useContact, useStateContact, useDispatchContact}