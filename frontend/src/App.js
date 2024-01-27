import Aplication from "./components/Aplication";

import { ContactProvider } from "./contexts/ContactProvider";

const App = () => {
  return (
    <ContactProvider>
        <Aplication />
    </ContactProvider>
  );
}

export default App;
