import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserContext = createContext();
const inicialUserState = {
  login: false,
  token: "",
  name: "",
  isAdmin: "",
  id: "",
};
export const UserProvider = (props) => {
  const [user, setUser] = useState(inicialUserState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("user"));
    if (initial) {
      if (initial.login) {
        setUser(initial);
      } else {
        setUser(inicialUserState);
      }
    } else {
      setUser(inicialUserState);
    }
  }, []);

  const userLogin = async (user, history) => {
    try {
      debugger
      setLoading(true);
      const { data } = await axios.post("/login", user);

      if (data.ok) {
        const userLoged = {
          login: true,
          token: data.token,
          name: data.name,
          isAdmin: data.isAdmin,
          id: data.id,
        };
        localStorage.setItem("user", JSON.stringify(userLoged));
        setUser(userLoged);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome ${data.name} !!`,
          showConfirmButton: false,
          timer: 2000,
        });
        history.push("/products");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      console.log("error in userLogin", error.message);
    }
  };

  const registerUser = async (user, history) => {
    debugger
    try {
      setLoading(true);
      const { data } = await axios.post("/user/register", user);
      if (data.ok) {
        const userLoged = {
          login: true,
          token: data.token,
          name: data.name,
          isAdmin: data.isAdmin,
          id: data.id,
        };
        localStorage.setItem("user", JSON.stringify(userLoged));
        setUser(userLoged);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome ${data.user.name} !!`,
          showConfirmButton: false,
          timer: 2000,
        });
        history.push("/products");
        setLoading(false);
      }
    } catch (error) {
      debugger
      setLoading(false);
      if (!error.response.data.ok) {
        let errors
        error.response.data.errors.forEach(element => {
          errors += element.msg
        })
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errors,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      console.log("error in registerUser", error.message);
    }
  };

  const logout = () => {
    setUser(inicialUserState);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    userLogin,
    registerUser,
    logout,
    loading,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
      throw new Error("Error in useUser")
  }

  return context
}
