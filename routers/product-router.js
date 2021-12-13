const express = require('express')
const router = express.Router()
const ProductModel = require('../models/product-model')

router.get("/", (req, res) => {
    ProductModel.find({}, (err, product) => {
        if (!err)
            res.status(200).json(product)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

module.exports = router