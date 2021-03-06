import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { AdminProducts } from "./components/AdminProducts";
import { AdminUser } from "./components/AdminUser";
import { Login } from "./components/Login";
import { MyProducts } from "./components/MyProducts";
import { Products } from "./components/Products";
import { Register } from "./components/Register";
import { useUser } from "./context/UserContext";
import "antd/dist/antd.css";

function App() {
  const { user } = useUser();
  const Public = (props) => {
    return user.login ? <Redirect to="/products" /> : <Route {...props} />;
  };
  const Private = (props) => {
    return user.login ? <Route {...props} />:<Redirect to="/" />

  };

  return (
    <Router>
      <Public path="/" exact component={Login} />
      <Public path="/register" exact component={Register} />
      <Private path="/products" exact component={Products} />
      <Private path="/my-products" exact component={MyProducts} />
      <Private path="/admin-products" exact component={AdminProducts} />
      <Private path="/admin-users" exact component={AdminUser} />
    </Router>
  );
}

export default App;
