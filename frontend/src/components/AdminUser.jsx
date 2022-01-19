import { Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Nav } from "./Nav";

export const AdminUser = () => {
  const initialUserEdit = {
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
                  {users.map((elemt, index) => (
                    <tr className="table-light text-center" key={elemt._id}>
                      <td>{index + 1}</td>
                      <td>{elemt.name}</td>
                      <td>{elemt.email}</td>
                      <td>{elemt.isAdmin ? "Sí" : "No"}</td>
                      <td>{elemt.status ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="d-flex w-100 justify-content-evenly">
                          <button className="custom-btn">
                            <i className="fas fa-trash-alt fw-bold"></i>
                          </button>
                          <button className="custom-btn">
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#newProductModal"
                              className="fas fa-pen fw-bold"
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
    </>
  );
};
