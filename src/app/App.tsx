import { GlobalProvider } from "./GlobalContext";
import Router from "./Router";
import { SpinnerProvider } from "./shared/SpinnerContext";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const env = import.meta.env.VITE_ENV;
  console.log("Entorno actual:", env, "API:", apiUrl);
  return (
    <GlobalProvider>
      <SpinnerProvider>
        <Router />
      </SpinnerProvider>
    </GlobalProvider>
  );
}

export default App;