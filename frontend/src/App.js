import { useState, useEffect } from "react";

import Aplication from "./components/Aplication";
import Acces from "./components/Acces";

import { ContactProvider } from "./contexts/ContactProvider";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("messasegin-user-token")
    if(token){
      setToken(token)
    }
  },[])

  if (!token) {
    return (
      <>
        <Acces setToken={setToken}/>
      </>
    )
  }

{/* <>
        <Notify errorMessage={errorMessage} />
        <Acces setToken={setToken} setError={notify} />
      </> */}

  return (
    <ContactProvider>
        <Aplication />
    </ContactProvider>
  );
}

export default App;
