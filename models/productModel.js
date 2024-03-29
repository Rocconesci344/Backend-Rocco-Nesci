import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean
});

const Product = mongoose.model('Product', productSchema);

export default Product;
