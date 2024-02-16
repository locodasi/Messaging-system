import Contacts from "./Contacts";

import { useStateContextState } from "../../contexts/StateProvider";

import Chat from "./Chat";

const  Aplication = ()=> {

    const state = useStateContextState();


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