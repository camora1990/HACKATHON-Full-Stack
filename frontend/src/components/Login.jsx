import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "./LoadingSpinner";

export const Login = () => {
  const inicialState = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const [userData, setUserData] = useState(inicialState);
  const { userLogin ,loading} = useUser();


  const login = async (e) => {

    e.preventDefault();
    await userLogin(userData, history);
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
              <h2 className="text-uppercase text-center mb-5">login</h2>
              <form className="form-floating" onSubmit={login}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control border border-primary"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required={true}
                    value={userData.email}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
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
                    value={userData.password}
                    required={true}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        password: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mb-4 form-control p-0 btn-login"
                  style={{ fontSize: 23 }}
                >
                  Sign in
                </button>

                <div className="text-center">
                  <p>
                    Not a member? <Link to="/register">Register</Link>
                  </p>
                  <p>or sign up with:</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1 social-media  "
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1 social-media"
                  >
                    <i className="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1 social-media"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1 social-media"
                  >
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
            {/* {loading && (
              <div className="card-footer d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
