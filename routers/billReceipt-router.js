const express = require('express')
const router = express.Router()
const BillReceiptModel = require('../models/billReceipt-model')

router.get("/", (req, res) => {
    BillReceiptModel.find({}, (err, billReceipt) => {
        if (!err)
            res.status(200).json(billReceipt)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

router.post('/add', async (req, res) => {
    const { body } = req
    try {
        var billReceipt = new BillReceiptModel(body)
        var result = await billReceipt.save()
        console.log('add billReceipt success!', body)
        res.send(result)
    } catch (err) {
        console.log('add billReceipt failed', err)
        res.status(500).send(err)
    }
})

router.put('/update/:_id', async (req, res) => {
    const { body } = req
    BillReceiptModel.findByIdAndUpdate(req.params._id, { $set: body }, err => {
        if (!err) {
            console.log('update billReceipt success')
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('update billReceipt failed')
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    BillReceiptModel.findByIdAndDelete(req.params._id, err => {
        if (!err) {
            console.log('delete billReceipt success')
            res.status(200).json({ msg: 'Đã xóa đối tượng' })
        }
        else {
            console.log('delete billReceipt failed', err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

module.exports = router