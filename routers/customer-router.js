const express = require('express')
const router = express.Router()
const CustomerModel = require('../models/customer-model')

router.get("/", (req, res) => {
    CustomerModel.find({}, (err, customer) => {
        if (!err)
            res.status(200).json(customer)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

router.post('/add', async (req, res) => {
    const { body } = req
    console.log(body)
    try {
        var customer = new CustomerModel(body)
        var result = await customer.save()
        console.log('add customer success!', body)
        res.send(result)
    } catch (err) {
        console.log('add customer failed', err)
        res.status(500).send(err)
    }
})

router.put('/update/:_id', async (req, res) => {
    const { body } = req
    CustomerModel.findByIdAndUpdate(req.params._id, { $set: body }, err => {
        if (!err) {
            console.log('update customer success')
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('update customer failed')
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    CustomerModel.findByIdAndDelete(req.params._id, err => {
        if (!err) {
            console.log('delete customer success')
            res.status(200).json({ msg: 'Đã xóa đối tượng' })
        }
        else {
            console.log('delete customer failed',err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

module.exports = router