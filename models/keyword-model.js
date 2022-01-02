const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//KhachHang
const keywordSchema = new Schema({
    primaryKey: {
        type: String,
        //required: true
    },
    secondKeys: [
        {
            type: String,
        }
    ],
    product_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ]
})

const Keyword = mongoose.model('Keyword', keywordSchema);
module.exports = Keyword;
