import { Pagination, Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Nav } from "./Nav";

export const MyProducts = () => {
  const initialProduct = {
    name: "",
    description: "",
    price: "",
    raiting: 0,
    image: "",
    img: "",
  };
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [showMessage, setshowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(initialProduct);
  const [isEdit, setisEdit] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [idProduct, setidProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [pageSize, setpageSize] = useState(0);

  const getMyProducts = async (page) => {

    const { token, id } = user;
    try {
      const { data } = await axios.get(`/product/${id}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(data.products);
      data.products.length > 0 ? setshowMessage(false) : setshowMessage(true);
      setPage(data.information.page);
      settotalData(data.information.totalDocs);
      setpageSize(data.information.limit);
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

  const deleteProd = async (id) => {
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
          await axios.delete(`/product/delete-product/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          getMyProducts();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted!, Your product has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          if (!error.response.data.ok) {
            return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
          console.log("error in deleteProd", error.message);
        }
      }
    });
  };

  const validateFormatImg = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      if (!/\.(jpeg|jpg|png|svg|JPG|PNG|SVG)$/i.test(files[0].name)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo no tiene un formato valido",
        });
        e.target.value = "";
      } else {
        setProduct({
          ...product,
          image: URL.createObjectURL(files[0]),
          img: files[0],
        });
      }
    }
  };
  const actions = async (e) => {
    e.preventDefault();
    setLoadingProduct(true);
    const formData = new FormData();
    product.imd !== "" && formData.append("img", product.img);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("raiting", product.raiting);
    isEdit ? updateProduct(formData) : createProduct(formData);
  };

  const createProduct = async (formData) => {
    try {
      await axios.post("/product/create-product", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      getMyProducts();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been saved.",
        showConfirmButton: false,
        timer: 2000,
      });
      setProduct(initialProduct);
      document.getElementById("closeMOdalProduct").click();
      setLoadingProduct(false);
    } catch (error) {
      setLoadingProduct(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      console.log("error in createProduct", error.message);
    }
  };
  const updateProduct = async (formData) => {
    try {
      await axios.put(`/product/update-product/${idProduct}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getMyProducts();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been edit.",
        showConfirmButton: false,
        timer: 2000,
      });
      setProduct(initialProduct);
      document.getElementById("closeMOdalProduct").click();
      setLoadingProduct(false);
    } catch (error) {
      setLoadingProduct(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      console.log("error in createProduct", error.message);
    }
  };

  const onChangePage = (page) => {
    getMyProducts(page);
  };

  useEffect(() => {
    setLoading(true);

    getMyProducts(page);
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
              <a
                href="#"
                className="alert-link"
                data-bs-toggle="modal"
                data-bs-target="#newProductModal"
                onClick={() => {
                  setisEdit(false);
                }}
              >
                here
              </a>{" "}
              to create product
            </p>
          </div>
        ) : (
          <div className="tab-content-mt3" id="myTabContent">
            <button
              className="btn bg-dark text-light mb-3 "
              data-bs-toggle="modal"
              data-bs-target="#newProductModal"
              onClick={() => {
                setisEdit(false);
              }}
            >
              {" "}
              Create new product
            </button>
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
                            <i
                              className="fas fa-trash-alt fw-bold"
                              onClick={(e) => {
                                deleteProd(prod._id);
                              }}
                            ></i>
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#newProductModal"
                              className="fas fa-pen fw-bold"
                              onClick={(e) => {
                                setisEdit(true);
                                setidProduct(prod._id);
                                setProduct({
                                  name: prod.name,
                                  description: prod.description,
                                  price: prod.price,
                                  raiting: prod.raiting,
                                  image: prod.image,
                                  img: "",
                                });
                              }}
                            ></i>
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
        id="newProductModal"
        tabIndex="-1"
        aria-labelledby="newProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-relative">
          {loadingProduct && (
            <div className="loading-custom position-absolute  translate-middle top-50 start-0 translate-middle-y w-100">
              <LoadingSpinner />
            </div>
          )}
          <div className="modal-content">
            <div className="modal-header p-2">
              <h5 className="modal-title" id="newProductModalLabel">
                {isEdit ? "Edit product" : "Create new product"}
              </h5>
              <button
                id="closeMOdalProduct"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setProduct(initialProduct);
                  document.getElementById("formFileProduct").value = "";
                }}
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="card h-100 border-0">
                <div className="d-flex justify-content-center mt-1">
                  {product.image && (
                    <img
                      src={product.image}
                      className="card-img-top "
                      style={{ height: 150 }}
                      alt="..."
                    />
                  )}
                </div>
                <div className="card-body">
                  <form onSubmit={actions}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border"
                        placeholder="Name product"
                        id="floatingInput"
                        value={product.name}
                        required={!isEdit}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingInput">Name product</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        id="floatingPrice"
                        className="form-control"
                        placeholder="price"
                        value={product.price}
                        required={!isEdit}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            price: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div>
                      <label htmlFor="rate">Rate</label> <br />
                      <Rate
                        id="rate"
                        allowHalf
                        className="mb-3"
                        value={product.raiting}
                        onChange={(value) => {
                          setProduct({ ...product, raiting: value });
                        }}
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        name="description"
                        id="floatingDescription"
                        cols="30"
                        rows="20"
                        className="form-control"
                        placeholder="Description"
                        style={{ height: 120, resize: "none" }}
                        value={product.description}
                        required={!isEdit}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            description: e.target.value,
                          });
                        }}
                      ></textarea>
                      <label htmlFor="floatingDescription">Description</label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formFileProduct" className="form-label">
                        Add image product
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFileProduct"
                        onChange={validateFormatImg}
                        required={!isEdit}
                      />
                    </div>
                    <button className="btn btn-primary form-control btn-save">
                      {!isEdit ? "Save product" : "Edit product"}
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
