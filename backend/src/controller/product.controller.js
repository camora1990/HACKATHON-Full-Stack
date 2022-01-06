const { request, response, json } = require("express");
const { productModel } = require("../model");
const { uploadFile } = require("../helpers/img-upload.helpers");
const { deleImgLocal } = require("../helpers/delete-img.helpers");

const createProduct = async (req = request, res = response) => {
  const { name, description, price, raiting } = req.body;
  const user = req.body.user || req.body.payload.id;
  try {
    const product = new productModel({
      name,
      description,
      price,
      raiting,
      user,
    });

    const filename = await uploadFile(req.files);
    product.saveUrlImg(filename);
    await product.save();

    res.status(201).json({
      ok: true,
      status: 201,
      product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const listProducts = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  const { payload } = req.body;

  try {
    if (payload.isAdmin) {
      const { docs: products, ...information } = await productModel.paginate(
        {},
        {
          limit,
          page,
          populate: { path: "user", select: { name: 1, email: 1, isAdmin: 1 } },
        }
      );

      res.status(200).json({ ok: true, status: 200, products, information });
    } else {
      const { docs: products, ...information } = await productModel.paginate(
        { user: payload.id },
        {
          limit,
          page,
          populate: { path: "user", select: { name: 1, email: 1, isAdmin: 1 } },
        }
      );

      res.status(200).json({ ok: true, status: 200, products, information });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    await deleImgLocal(product.imageName);
    res.status(200).json({
      ok: false,
      status: 200,
      message: "Product was delete successfully!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  const { name, description, price, raiting } = req.body;
  const { id } = req.params;
  const user = req.body.user;
  try {
    const product = await productModel.findById(id);

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.raiting = raiting || product.raiting;

    product.user = user || product.user;

    if (req.files) {
      const filename = await uploadFile(req.files);
      await deleImgLocal(product.imageName);
      product.saveUrlImg(filename)
    }

    await product.save();
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Product update succefully",
      product
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
};
