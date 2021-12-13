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
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
