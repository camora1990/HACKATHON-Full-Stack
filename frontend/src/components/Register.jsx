import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";

export const Register = () => {
  const inicialUser = {
    name: "",
    email: "",
    password: "",
  };
  const history = useHistory();
  const { registerUser, loading } = useUser();
  const [user, setUser] = useState(inicialUser);
  const register = async (e) => {
    e.preventDefault();
    await registerUser(user, history);
  };
  return (
    <div className="container h-100 mt-5 ">
      <div className="d-flex row justify-content-center aling-items-center h-100">
        <div className="col-12 col-md-9 col-lg-6 col-xl-4 position-relative">
          <div className="card card-custon">
            {loading && (
              <div className="loading-custom position-absolute  translate-middle top-50 start-0 translate-middle-y w-100">
                <LoadingSpinner />
              </div>
            )}
            <div className="card-body p-4">
              <h2 className="text-uppercase text-center mb-5">Register</h2>
              <form onSubmit={register}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border border-primary"
                    id="floatingInput"
                    placeholder="Name"
                    value={user.name}
                    required={true}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        name: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control border border-primary"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required={true}
                    value={user.email}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        email: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control border border-primary"
                    id="floatingPassword"
                    placeholder="Password"
                    required={true}
                    value={user.password}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        password: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="text-center">
                  <p>
                    do you have an account? <Link to="/">Sign in</Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control btn-login"
                  style={{ fontSize: 21 }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
