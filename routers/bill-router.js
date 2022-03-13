const express = require('express')
const router = express.Router()
const BillModel = require('../models/bill-model')

router.get("/", (req, res) => {
    BillModel.find({}, (err, bill) => {
        if (!err)
            res.status(200).json(bill)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

router.post('/add', async (req, res) => {
    const { body } = req
    try {
        var bill = new BillModel(body)
        var result = await bill.save()
        console.log('add bill success!', body)
        res.send(result)
    } catch (err) {
        console.log('add bill failed', err)
        res.status(500).send(err)
    }
})

router.put('/update/:_id', async (req, res) => {
    const { body } = req
    BillModel.findByIdAndUpdate(req.params._id, { $set: body }, err => {
        if (!err) {
            console.log('update bill success')
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('update bill failed')
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    BillModel.findByIdAndDelete(req.params._id, err => {
        if (!err) {
            console.log('delete bill success')
            res.status(200).json({ msg: 'Đã xóa đối tượng' })
        }
        else {
            console.log('delete bill failed', err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

module.exports = router