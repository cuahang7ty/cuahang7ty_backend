const express = require('express')
const router = express.Router()
const KeywordModel = require('../models/keyword-model')

router.get("/", (req, res) => {
    KeywordModel.find({}, (err, keywords) => {
        if (!err)
            res.status(200).json(keywords)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

router.post('/add', async (req, res) => {
    const { body } = req
    try {
        var keyword = new KeywordModel(body)
        var result = await keyword.save()
        console.log('add keyword success!', body)
        res.send(result)
    } catch (err) {
        console.log('add keyword failed', err)
        res.status(500).send(err)
    }
})

router.put('/update/:_id', async (req, res) => {
    const { body } = req
    KeywordModel.findByIdAndUpdate(req.params._id, { $set: body }, err => {
        if (!err) {
            console.log('update keyword success')
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('update keyword failed')
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    KeywordModel.findByIdAndDelete(req.params._id, err => {
        if (!err) {
            console.log('delete keyword success')
            res.status(200).json({ msg: 'Đã xóa đối tượng' })
        }
        else {
            console.log('delete keyword failed', err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})


module.exports = router