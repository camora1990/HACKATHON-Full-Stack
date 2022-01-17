import React from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Nav } from "./Nav";

export const AdminUser = () => {
  const { user } = useUser();
  const history = useHistory();
  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/products");
    }
  }, []);
  return <Nav />;
};
