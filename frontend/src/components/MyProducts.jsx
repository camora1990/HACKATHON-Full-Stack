import { Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Nav } from "./Nav";

export const MyProducts = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [showMessage, setshowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const getMyProducts = async () => {
    const { token, id } = user;
    try {
      const { data } = await axios.get(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(data.products);
      data.products.length > 0 ? setshowMessage(false) : setshowMessage(true);

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
      console.log("error in MyProducts", error.message);
    }
  };
  useEffect(() => {
    setLoading(true);

    getMyProducts();
  }, []);
  return (
    <>
      <Nav />{" "}
      <div className="container mt-2 font-monospace">
        <h2 className="text-center mb-5 mt-3 fw-bold">My Products</h2>
        {loading ? (
          <LoadingSpinner />
        ) : showMessage ? (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Oops...! {user.name}</h4>
            <p className="fs-6">
              There are no products available yet, we invite you to create
              products on the platform so that other users can enjoy them
            </p>
            <hr />
            <p className="mb-0">
              click{" "}
              <a href="#" className="alert-link">
                here
              </a>{" "}
              to create product
            </p>
          </div>
        ) : (
          <div className="tab-content-mt3" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="compara"
              role="tabpanel"
              aria-labelledby="compara-tab"
            >
              <div className="table-responsive">
                <table
                  className="table table-striped table-dark table-bordered table-hover shadow bg-body rounded align-middle"
                  style={{ minWidth: 1000 }}
                >
                  <thead className="text-center">
                    <tr>
                      <th scope="col">IMG</th>
                      <th scope="col ">NAME</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">RATE</th>
                      <th scope="col">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr className="table-light text-center" key={prod._id}>
                        <td>
                          <img src={prod.image} alt="" />
                        </td>
                        <td>{prod.name}</td>
                        <td style={{ maxWidth: 300 }}>{prod.description}</td>
                        <td>$ {prod.price.toLocaleString()}</td>
                        <td>
                          <Rate value={prod.raiting} disabled />
                        </td>
                        <td>
                          <div className="d-flex w-100 justify-content-evenly">
                            <i class="fas fa-trash-alt"></i>
                            <i class="fas fa-pen"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
