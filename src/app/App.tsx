function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const env = import.meta.env.VITE_ENV;
  console.log("Entorno actual:", env, "API:", apiUrl);
  return null;
}

export default App;
