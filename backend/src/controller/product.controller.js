const { request, response } = require("express");
const { productModel } = require("../model");
const path = require("path");
const { uploadFile } = require("../helpers/img-upload.helpers");

const createProduct = async (req = request, res = response) => {
  const { name, description, price, raiting } = req.body;
  const user = req.body.userId || req.body.payload.id;

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

module.exports = {
  createProduct,
};
