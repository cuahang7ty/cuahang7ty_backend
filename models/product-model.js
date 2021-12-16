const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    barcode: {
        type: String,
        //required: true
    },
    productName: {
        type: String,
    },
    unitPrice: {
        type: Number,
    },
    stock: {
        type: Number,
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
