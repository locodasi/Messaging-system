import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

import useContacts from "../../../hooks/useContacts";

import Contact from './Contact';

import { useContextState } from '../../../contexts/StateProvider';
import { useNavigate } from 'react-router-dom';

const classes = {
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: "#fff",
        border: "1px solid grey"
    },
    headerContacts:{
        backgroundColor: "#e0e0e0",
        padding: "10px",
        display: "flex",
        flexDirection: "row"
    },
    inline: {
        display: 'inline',
    },
}

const Contacts = () => {

    const {contacts, loading, error } = useContacts()

    const [state, dispatch] = useContextState();

    const navigate = useNavigate();

    if(loading){
        return(<></>)
    }

    if(error && error.graphQLErrors[0].message === "Not authenticated"){
        if (localStorage.getItem("messasegin-user-token") !== null){
            localStorage.removeItem("messasegin-user-token");
        }
        window.location.reload();
    }

    const logOut = () => {
        localStorage.removeItem('messasegin-user-token');
        dispatch({ type: "cleanUser" });
        navigate("/");
    }

    const createContact = () => {
        navigate("/createContact");
    }

    return (
        <List style={classes.root}>
            <div style={classes.headerContacts}>
                <ListItemAvatar>
                    <Avatar alt={`You`} src={state.user.imageURL} />
                </ListItemAvatar>
                <Button onClick={createContact}>
                    <svg
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        preserveAspectRatio="xMidYMid meet"
                        fill="none"
                    >
                        <title>New contact</title>
                        <path
                            d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
                            fill="currentColor"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
                            fill="currentColor"
                        />
                    </svg>
                </Button>
                <Button onClick={logOut}>
                    Cerrar Sesión
                </Button>
            </div>
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
