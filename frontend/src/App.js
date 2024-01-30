
import Aplication from "./components/Aplication";
import Acces from "./components/Acces";
import SignUp from "./components/Acces/SignUp";
import FormContact from "./components/Aplication/FormContact";

import { useStateContextState } from "./contexts/StateProvider";

import { Routes, Route } from "react-router-dom";


const App = () => {

  const state = useStateContextState();
{/* <>
        <Notify errorMessage={errorMessage} />
        <Acces setToken={setToken} setError={notify} />
      </> */}

  return (
    <Routes>
      <Route path="/" element = { state.user ? <Aplication /> : <Acces />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/createContact" element={<FormContact />}/>
    </Routes>
  );
}

export default App;
