const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//KhachHang
const customerSchema = new Schema({
    tenKhachHang: {
        type: String,
        //required: true
    },
    soDienThoai: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    level: {
        type: Number
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
