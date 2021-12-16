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

router.post('/add', async (req, res) => {
    const { body } = req
    try {
        var product = new ProductModel(body)
        var result = await product.save()
        console.log('add product success!', body)
        res.send(result)
    } catch (err) {
        console.log('add product failed', err)
        res.status(500).send(err)
    }
})

router.put('/edit/:_id', async (req, res) => {
    const { body } = req
    ProductModel.findByIdAndUpdate(req.params._id, { $set: body }, (err, product) => {
        if (!err) {
            console.log('edit product success', product)
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('edit product failed')
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    ProductModel.findByIdAndDelete(req.params._id, err => {
        if (!err) {
            console.log('delete product success')
            res.status(200).json({ msg: 'Đã xóa đối tượng' })
        }
        else {
            console.log('delete product failed',err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

module.exports = router