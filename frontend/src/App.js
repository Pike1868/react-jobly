import "../src/assets/App.css";
import NavBar from "./components/NavBar";
import RouteList from "./routes/RouteList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouteList />
    </div>
  );
}

export default App;
