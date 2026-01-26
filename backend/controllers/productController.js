import { json } from "express";
import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    // Add product logic here
    // console.log(req.body)
    const {
      name,
      description,
      price,
      category,
      Subcategory:subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resourse_type: "image",
        });
        return result.secure_url;
      }),
    );
    
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    // List products logic here
    const products = await productModel.find({});
    res.json({ success: true, message: "Products fetched", products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const removeProduct = async (req, res) => {
  try {
    // Remove product logic here
    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const singleProduct = async (req, res) => {
  try {
    // single products logic here
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, message: "Products fetched", product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, removeProduct, addProduct, singleProduct };
