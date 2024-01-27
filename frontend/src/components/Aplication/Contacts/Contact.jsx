import React, { useRef } from "react";

import { useDispatchContact } from "../../../contexts/ContactProvider";

const styles = {
    container: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        margin: "5px",
        marginBottom: "10px",
        width: "100%",
        border: "none",
    },
    item: {
        marginLeft: "8px",
        borderBottom: "2px solid grey",
        width: "100%"
    },
    image:{
        width: 60,  // Ajusta según tus preferencias
        height: 60,  // Ajusta según tus preferencias
        borderRadius: 30,  // La mitad del ancho y alto para hacer un círculo
    }
};

const  Contact = ({contact})=> {
    const buttonRef = useRef(null);

    const dispatch = useDispatchContact();

    const handleMouseOver = () => {
        buttonRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    };

    const handleMouseOut = () => {
        buttonRef.current.style.backgroundColor = "transparent";
    };

    const onCLick = () => {
        dispatch({ type: "setContact", contact: contact });
    }

    return(
        <button 
            ref={buttonRef}
            style={styles.container}
            onClick={onCLick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <img style={styles.image} src={contact.user.imageURL} alt={`contact ${contact.name}`}/>
            <div style={styles.item}>
                <h3>{contact.name}</h3>
            </div>
        </button>
    );
}

export default Contact