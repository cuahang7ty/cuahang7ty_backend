const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DonHang
const billReceiptSchema = new Schema({
    barcode: {
        type: String,
    },
    ngayLap: {
        type: Date,
    },
    khachHang_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    chiTietDonHangs: [
        {
            matHang_id:
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            giaBan: {
                type: Number,
            },
            soLuong: {
                type: Number,
            },
            giamGia: {
                type: Number
            }
        }
    ],
})

const BillReceipt = mongoose.model('BillReceipt', billReceiptSchema);
module.exports = BillReceipt;
