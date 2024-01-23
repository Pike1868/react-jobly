import React from "react";
import "../src/assets/App.css";
import NavBar from "./components/NavBar";
import RouteList from "./routes/RouteList";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <main className="App">
        <NavBar />
        <RouteList />
      </main>
    </UserProvider>
  );
}

export default App;
