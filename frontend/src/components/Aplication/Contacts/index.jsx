import useContacts from "../../../hooks/useContacts";

import Contact from "./Contact";

const  Contacts = ()=> {
    const {contacts, loading } = useContacts({
        userId: "65b3fe98c3c220c19e14ec8e"
    })

    if(loading){
        return(<></>)
    }

    const styles = {
        container: {
            width: "30%",
            border: "1px solid grey"
        }
    };

    return(
        <div style={styles.container}>
            {contacts.map(item => <Contact key={item.id} contact={item} />)}
        </div>
    );
}

export default Contacts