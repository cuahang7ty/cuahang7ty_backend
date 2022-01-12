const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//MatHang
const productSchema = new Schema({
    productName: {
        type: String,
    },
    retailPrice: {
        type: Number,
    },
    costPrice: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    describe: {
        type: String,
    },
    dateCreate: {
        type: Number,
    },
    searchedTime: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
