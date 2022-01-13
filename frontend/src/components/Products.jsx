import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Rate } from "antd";
import "antd/dist/antd.css";
import { useUser } from "../context/UserContext";
import { Nav } from "./Nav";

export const Products = () => {
  const initialProduct = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    raiting: 0,
    user: "",
    userEmail: "",
    image: "",
  };
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(initialProduct);
  const [showMessage, setshowMessage] = useState(false);

  const { user } = useUser();

  const getProducts = async (token) => {
    try {
      const { data } = await axios.get("/product/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.products.length > 0) {
        setProducts(data.products);
        setshowMessage(false);
      } else {
        setProducts([]);
        setshowMessage(true);
      }
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      console.log("error in getProducts", error.message);
    }
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    getProducts(token);
  }, []);

  return (
    <>
      {<Nav />}

      <div className="container mt-3">
        <div className="row card-deck">
          {products.map((prod) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2"
              key={prod._id}
            >
              <div className="card h-100">
                <img
                  src={prod.image}
                  className="card-img-top img-thumbnail"
                  style={{ height: 200 }}
                  alt="..."
                />
                <div className="card-body">
                  <h4 className="card-title text-center">{prod.name}</h4>
                  <p className="card-text truncate-text">{prod.description}</p>
                  <h5 className="card-text">$ {prod.price.toLocaleString()}</h5>
                  <span className="ant-rate-text">
                    <Rate disabled allowHalf value={prod.raiting} />
                  </span>
                  <p className="card-text">
                    <small className="text-muted">{prod.user.name}</small>
                  </p>
                  <div className="card-footer d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={(e) => {
                        setProduct({
                          _id: prod._id,
                          name: prod.name,
                          description: prod.description,
                          price: prod.price,
                          raiting: prod.raiting,
                          user: prod.user.name,
                          userEmail: prod.user.email,
                          image: prod.image,
                        });
                      }}
                    >
                      Veiw details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {product.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top img-thumbnail"
                  style={{ height: 200 }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="fw-bold">Description</h5>
                  <p className="card-text ">{product.description}</p>
                  <h5 className="card-text">
                    $ {product.price.toLocaleString()}
                  </h5>
                  <span className="ant-rate-text">
                    <Rate allowHalf disabled value={product.raiting} />
                  </span>
                  <p className="card-text">
                    <small className="text-muted">{product.user}</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
