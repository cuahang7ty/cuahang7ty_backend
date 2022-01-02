const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//MatHang
const productSchema = new Schema({
    tenMatHang: {
        type: String,
    },
    giaBanLe: {
        type: Number,
    },
    giaNhap: {
        type: Number,
    },
    soLuongTon: {
        type: Number,
    },
    moTa: {
        type: String,
    },
    ngayThem: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
    },
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
