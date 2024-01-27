import Contacts from "./Contacts";

import { useStateContact } from "../../contexts/ContactProvider";

const  Aplication = ()=> {

    const state = useStateContact();
    console.log(state)
    return(
        <div style={{display: "flex"}}>
            <Contacts />
            <div style={{backgroundColor: "#888879", width: "70%"}}>
                {state.contact ? <h1>hola</h1> : <h1>adios</h1>}
            </div>
        </div>
    );
}

export default Aplication