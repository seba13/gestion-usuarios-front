import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./router/RouterApp";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter></AppRouter>
      </AuthProvider>
      {/* <FormLogin></FormLogin> */}
    </>
  );
}

export default App;
