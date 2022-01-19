import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Pagination, Rate } from "antd";

import { useUser } from "../context/UserContext";
import { Nav } from "./Nav";
import { LoadingSpinner } from "./LoadingSpinner";

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [pageSize, setpageSize] = useState(0);

  const { user } = useUser();

  const getProducts = async (page = 1) => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const { data } = await axios.get(`/product/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.products.length > 0) {
        setProducts(data.products);
        setPage(data.information.page);
        settotalData(data.information.totalDocs);
        setpageSize(data.information.limit);
        setshowMessage(false);
      } else {
        setProducts([]);
        setshowMessage(true);
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
      console.log("error in getProducts", error.message);
    }
  };

  const onChangePage = (page) => {
    getProducts(page);
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  return (
    <>
      {<Nav />}

      <div className="container mt-2 font-monospace">
      <h2 className="text-center mb-5 mt-3 fw-bold">Products</h2>
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
            <p className="mb-0"></p>
          </div>
        ) : (
          
          <div className="row card-deck font-monospace">
            {products.map((prod) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                key={prod._id}
              >
                <div className="card h-100 card-custon ">
                  <div className="d-flex justify-content-center aling-items-center">
                    <img
                      src={prod.image}
                      className="card-img-top mt-1"
                      style={{ height: 150 }}
                      alt="..."
                    />
                  </div>
                  <hr />
                  <div className="card-body">
                    <h5 className="card-title text-center ">{prod.name}</h5>
                    <p className="card-text truncate-text " >
                      {prod.description}
                    </p>
                    <h6 className="card-text">
                      $ {prod.price.toLocaleString()}
                    </h6>
                    <p className="ant-rate-text card-text">
                      <Rate disabled allowHalf value={prod.raiting} />
                    </p>
                    <p className="card-text">
                      <small className="text-muted">{prod.user.name}</small>
                    </p>
                    <div className="card-footer d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#productModal"
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
        )}

        {(!showMessage && !loading) && (
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

      {/* Modal */}
      <div
        className="modal font-monospace "
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header p-2">
              <h5 className="modal-title" id="productModalLabel">
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
              <div className="card h-100 border-0">
                <div className="d-flex justify-content-center mt-1">
                  <img
                    src={product.image}
                    className="card-img-top "
                    style={{ height: 150 }}
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="fw-bold">Description</h5>
                  <p className="card-text fs-6">{product.description}</p>
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
          </div>
        </div>
      </div>
    </>
  );
};
