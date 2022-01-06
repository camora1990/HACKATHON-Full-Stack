import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register}/>
    </Router>
  );
}

export default App;
