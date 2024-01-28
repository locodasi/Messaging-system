import Contacts from "./Contacts";

import { useStateContact } from "../../contexts/ContactProvider";

import Chat from "./Chat";

const  Aplication = ()=> {

    const state = useStateContact();

    return(
        <div style={{display: "flex"}}>
            <Contacts />
            <div style={{width: "70%"}}>
                {state.contact ? <Chat contact={state.contact}/> : <h1>adios</h1>}
            </div>
        </div> 
    );
}


export default Aplication