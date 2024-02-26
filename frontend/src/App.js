
import Aplication from "./components/Aplication";
import Acces from "./components/Acces";
import SignUp from "./components/Acces/SignUp";
import FormContact from "./components/Aplication/FormContact";

import { useContextState } from "./contexts/StateProvider"; 

import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import { ME } from './graphql/queries';
import { useQuery } from '@apollo/client';
import UpdateContactForm from "./components/Aplication/UpdateContactForm";

const App = () => {

  const [state, dispatch] = useContextState();
  const {data, loading} = useQuery(ME, {
    fetchPolicy: "cache-and-network"
  })

  useEffect(() => {
    if (!loading && data && data.me !== null) {
      dispatch({ type: 'setUser', user: data.me });
    }
  }, [data, loading, dispatch]);
  
{/* <>
        <Notify errorMessage={errorMessage} />
        <Acces setToken={setToken} setError={notify} />
      </> */}


  return (
    <Routes>
      <Route path="/" element = { state.user ? <Aplication /> : <Acces />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/createContact" element={<FormContact />}/>
      <Route path="/updateContact" element={<UpdateContactForm />}/>
    </Routes>
  );
}

export default App;
