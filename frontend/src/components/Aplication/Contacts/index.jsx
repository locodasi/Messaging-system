import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import useContacts from "../../../hooks/useContacts";

import Contact from './Contact';

const classes = {
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: "#fff",
    },
    inline: {
        display: 'inline',
    },
}

const Contacts = () => {

    const {contacts, loading, error } = useContacts()
    
    if(loading){
        return(<></>)
    }

    if(error && error.graphQLErrors[0].message === "Not authenticated"){
        if (localStorage.getItem("messasegin-user-token") !== null){
            localStorage.removeItem("messasegin-user-token");
        }
        window.location.reload();
    }

    return (
        <List style={classes.root}>
            {contacts.map(item => (
                <div key={item.id}>
                    <Contact contact={item} />
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );
}

export default Contacts;
