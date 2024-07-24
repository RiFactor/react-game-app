import "./App.css";
import HomePage from "./pages/HomePage";
// require("dotenv").config;

// Layout for games
// Dark Mode - Chakra UI?
// Games list component
// drop down filters
// side bar
// search bar
// extract .get functions (separate from components)

function App() {
  // ToDo add anything else?
  return (
    <div className="flex max-w-screen">
      <HomePage />
    </div>
  );
}

export default App;
