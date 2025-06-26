import { GlobalProvider } from "./context/GlobalContext";
import { SpinnerProvider } from "./context/SpinnerContext";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const env = import.meta.env.VITE_ENV;
  console.log("Entorno actual:", env, "API:", apiUrl);
  return (
    <GlobalProvider>
      <SpinnerProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SpinnerProvider>
    </GlobalProvider>
  );
}

export default App;
