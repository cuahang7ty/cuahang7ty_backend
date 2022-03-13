const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DonHang
const billSchema = new Schema({
    barcode: {
        type: String,
    },
    dateTime: {
        type: Date,
    },
    khachHang_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    billDetails: [
        {
            product_id:
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            retailPrice: {
                type: Number,
            },
            costPrice: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
            giamGia: {
                type: Number
            }
        }
    ],
})

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
