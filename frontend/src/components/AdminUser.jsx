import { Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Nav } from "./Nav";

export const AdminUser = () => {
  const initialUserEdit = {
    id: "",
    name: "",
    isAdmin: false,
    userEmail: "",
    status: true,
  };
  const { user } = useUser();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showMessage, setshowMessage] = useState(false);
  const [users, setusers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [pageSize, setpageSize] = useState(0);
  const [userEdit, setuserEdit] = useState(initialUserEdit);
  const [initialEmail,setinitialEmail] = useState("")
  const [loadingEditUser ,setloadingEditUser] = useState(false)

  const getUsers = async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/user/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPage(data.information.page);
      settotalData(data.information.totalDocs);
      setpageSize(data.information.limit);
      setusers(data.users);
      setLoading(false);

      data.users.length > 0 ? setshowMessage(false) : setshowMessage(true);
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
      console.log("error in getUsers", error.message);
    }
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`/user/delete-user/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          getUsers();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted!, User has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
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
          console.log("error in deleteUser", error.message);
        }
      }
    });
  };

  const updateUser = async (id, editUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          setloadingEditUser(true);
          editUser.userEmail == initialEmail && delete editUser.userEmail
          await axios.put(`/user/update-user/${id}`, editUser, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setloadingEditUser(false);
          document.getElementById('closeModalEditUser').click()
          getUsers();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted!, User has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          setloadingEditUser(false);

          if (!error.response.data.ok) {
            return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
          console.log("error in deleteUser", error.message);
        }
      }
    });
  };

  const actions = (e) => {
    e.preventDefault()

    updateUser(userEdit.id, userEdit);
  };

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/products");
    } else {
      getUsers(page);
    }
  }, []);

  const onChangePage = (page) => {
    getUsers(page);
  };

  return (
    <>
      <Nav />
      <div className="container mt-2 font-monospace">
        <h2 className="text-center mb-5 mt-3 fw-bold">Admin users</h2>
        {loading ? (
          <LoadingSpinner />
        ) : showMessage ? (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Oops...! {user.name}</h4>
            <p className="fs-6">There are no user available yet</p>
            <hr />
          </div>
        ) : (
          <div
            className="tab-pane fade show active"
            id="compara"
            role="tabpanel"
            aria-labelledby="compara-tab"
          >
            <div className="table-responsive">
              <table
                className="table table-striped table-dark table-bordered table-hover shadow bg-body rounded alingn-middle"
                style={{ minWidth: 1000 }}
              >
                <thead className="text-center">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col ">EMAIL</th>
                    <th scope="col">ISADMIN</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((element, index) => (
                    <tr className="table-light text-center" key={element._id}>
                      <td>{index + 1}</td>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.isAdmin ? "Yes" : "No"}</td>
                      <td>{element.status ? "Active" : "Inactive"}</td>
                      <td>
                        <div className="d-flex w-100 justify-content-evenly">
                          {element._id !== user.id && (
                            <button
                              className="custom-btn"
                              onClick={() => {
                                deleteUser(element._id);
                              }}
                            >
                              <i className="fas fa-trash-alt fw-bold"></i>
                            </button>
                          )}

                          <button className="custom-btn">
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#editUserModal"
                              className="fas fa-pen fw-bold"
                              onClick={() => {
                                setuserEdit({
                                  id: element._id,
                                  name: element.name,
                                  isAdmin: element.isAdmin,
                                  userEmail: element.email,
                                  status: element.status,
                                });
                                setinitialEmail(element.email)
                              }}
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!showMessage && !loading && (
          <div className="my-5 d-flex justify-content-center">
            <Pagination
              current={page}
              total={totalData}
              PageSize={pageSize}
              onChange={onChangePage}
            />
          </div>
        )}
      </div>

      <div
        className="modal font-monospace"
        id="editUserModal"
        tabIndex="-1"
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-relative">
        {loadingEditUser && (
            <div className="loading-custom position-absolute  translate-middle top-50 start-0 translate-middle-y w-100">
              <LoadingSpinner />
            </div>
          )}
          <div className="modal-content">
            <div className="modal-header p-2">
              <h5 className="modal-title" id="editUserModalLabel">
                Edit user
              </h5>
              <button
                className="btn-close"
                id="closeModalEditUser"
                type="button"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card-h-100 border-0">
                <div className="card-body">
                  <form onSubmit={actions}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border"
                        placeholder="Name"
                        value={userEdit.name}
                        id="floatingName"
                        onChange={(e) => {
                          setuserEdit({
                            ...userEdit,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingName">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control border"
                        placeholder="Email"
                        value={userEdit.userEmail}
                        id="floatingEmail"
                        onChange={(e) => {
                          setuserEdit({
                            ...userEdit,
                            userEmail: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingEmail">Email</label>
                    </div>
                    {userEdit.id !== user.id && (
                      <>
                        <div className="form-check form-switch mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={userEdit.isAdmin}
                            onChange={(e) => {
                              setuserEdit({
                                ...userEdit,
                                isAdmin: e.target.checked,
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Is admin
                          </label>
                        </div>
                        <div className="form-check form-switch mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={userEdit.status}
                            onChange={(e) => {
                              setuserEdit({
                                ...userEdit,
                                status: e.target.checked,
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            {userEdit.status ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </>
                    )}
                    <button className="btn btn-primary form-control btn-save">
                      Edit User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
