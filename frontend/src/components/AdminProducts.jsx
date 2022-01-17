import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { Nav } from "./Nav";

export const AdminProducts = () => {
  const { user } = useUser();
  const history = useHistory();
  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/products");
    }
  }, []);
  return <Nav />;
};
