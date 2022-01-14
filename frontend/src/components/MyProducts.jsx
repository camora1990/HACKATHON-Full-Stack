import { Spin } from "antd";
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
      products.length > 0 ? setshowMessage(false) : setshowMessage(true);
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
              <a href="#" class="alert-link">
                here
              </a>{" "}
              to create product
            </p>
          </div>
        ) : (
          <div>aaa</div>
        )}
      </div>
    </>
  );
};
