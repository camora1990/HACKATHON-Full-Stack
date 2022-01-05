const { model, Schema } = require("mongoose");
const mongoseePaginate = require('mongoose-paginate-v2')
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    raiting: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
    },
    imageName: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoseePaginate)
productSchema.methods.saveUrlImg = function (filName = null) {
  const url = process.env.URL_BASE;
  this.image = `${url}/public/${filName}`;
  this.imageName = filName;
};

module.exports = model("product", productSchema);
