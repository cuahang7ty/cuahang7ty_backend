const express = require('express')
const router = express.Router()
const ProductModel = require('../models/product-model')
const KeywordModel = require('../models/keyword-model')

router.get("/", (req, res) => {
    ProductModel.find({}, (err, products) => {
        if (!err)
            res.status(200).json(products)
        else
            res.status(400).json({ msg: 'Không tìm thấy dữ liệu' })
    })
})

router.get("/get/:_id", (req, res) => {
    ProductModel.findById(req.params._id, (err, product) => {
        if (!err)
            res.status(200).json(product)
        else
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
    })
})

router.post('/add', async (req, res) => {
    const { body } = req
    try {
        var product = new ProductModel(body)
        console.log('1', product)
        product = await product.save()
        await addNewKeywordForNewProduct(product.productName, product._id)
        console.log('add product success!')
        res.send(product)
    } catch (err) {
        console.log('add product failed', err)
        res.status(500).send(err)
    }
})

addNewKeywordForNewProduct = (productName, product_id) => {
    const keywords = productName.toLowerCase().split(' ')
    const promises = keywords.map(keyword => {
        return new Promise(async resolve => {
            const keywordFound = await KeywordModel.findOne({ primaryKey: keyword })
            if (keywordFound !== null) {
                keywordFound.product_ids.push(product_id)
                keywordFound.save()
                console.log('updated _id for keyword', keywordFound)
            }
            else {
                newKeyword = new KeywordModel({
                    primaryKey: keyword,
                    secondKeys: [],
                    product_ids: [product_id]
                })
                newKeyword.save()
                console.log('added new keyword', newKeyword)
            }
            resolve(keyword)
        })
    })
    Promise.all(promises).then(keywords => {
        return keywords
    })
}

router.put('/update/:_id', async (req, res) => {
    const { body } = req
    ProductModel.findByIdAndUpdate(req.params._id, { $set: body }, err => {
        if (!err) {
            console.log('update product success')
            res.status(200).json({ msg: 'Đã sửa đối tượng' })
        }
        else {
            console.log('update product failed')
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
            console.log('delete product failed', err)
            res.status(400).json({ msg: 'Đối tượng không tồn tại!' })
        }
    })
})

/*

frontend truyền về 1 đoạn transcript
từ transcript cắt ra lấy các keyword
tìm trong collection keyword có primaryKey nào trùng với 1 trong các keyword đã cắt ra
nếu trùng trả về mảng product_ids chứa _id của các mặt hàng có primaryKey tương ứng
gộp các phần tử của các mảng product_ids về cùng 1 mảng results
thằng _id nào bị trùng nhiều nhất trong results sẽ là product có khả năng đúng nhất

*/

router.put("/get/keywords", async (req, res) => {
    const { transcript } = req.body
    const keywordsToSearch = transcript.toLowerCase().split(' ')

    const promises = keywordsToSearch.map(keyword => {
        return new Promise((resolve, reject) => {
            KeywordModel.findOne({ "primaryKey": keyword }, async (err, key) => {
                if (!err) {
                    if (key !== null){
                        resolve(key.product_ids)
                    }
                    else {
                        //tim theo secondKeys cua tat ca keyword, neu co bat ki secondKey nao phu hop, tra ve product_ids cua keyword do
                        // searchBySecondKeys(keywordsToSearch)
                        const resultsSearchingBySecondKeys = await searchBySecondKeys(keywordsToSearch)
                        resolve(...resultsSearchingBySecondKeys)
                    }
                }
                else
                    reject(err)
            })
        })
    })
    Promise.all(promises).then(async results => {
        let newArr = await getProduct_idFound(results)
        newArr = await findDuplicatedProduct_id(newArr)
        const finalResult = await replaceProduct_idByProduct(newArr)
        res.status(200).json(finalResult)
    })
})

const searchBySecondKeys = (keywordsToSearch) => {
    return new Promise(resolve => {
        KeywordModel.find({
            $nor: [
                { secondKeys: { $exists: false } },
                { secondKeys: { $size: 0 } },
            ]
        }, (err, keywords) => {
            const promises = keywords.map(keyword => {
                return new Promise(resolve => {
                    keywordsToSearch.map(keywordToSearch => {
                        if(keyword !== undefined){
                            const { secondKeys } = keyword
                            const flag = secondKeys.find(secondKey => secondKey === keywordToSearch)
                            console.log({ flag })
                            resolve(keyword.product_ids)
                        }
                        else
                            resolve()
                    })
                })
            })
            Promise.all(promises).then(results => {
                // console.log(results)
                // res.status(200).json(results)
                resolve(results)
            })
        })
    })
}

//coi chung ngay nao do bi bat dong bo
const getProduct_idFound = (product_ids) => {
    return new Promise(resolve => {
        let productFounds = []
        product_ids.map(_ids => {
            if (_ids !== undefined && _ids !== null) {
                productFounds = [...productFounds, ..._ids]
            }
        })
        resolve(productFounds)
    })
}

const findDuplicatedProduct_id = (array) => {
    return new Promise(resolve => {
        let newArr = []
        for (var i = 0; i < array.length; i++) {
            let count = 0
            for (var j = i + 1; j < array.length; j++) {
                if (array[i]._id.equals(array[j]._id)) {
                    count++
                    array.splice(j, 1)
                }
            }
            newArr.push({
                _id: array[i],
                count: count
            })
        }
        newArr = arrangeTheCountOfProduct_id(newArr)
        resolve(newArr)
    })
}

const arrangeTheCountOfProduct_id = (array) => {
    return array.sort((firstItem, secondItem) => secondItem.count - firstItem.count)
}

const replaceProduct_idByProduct = (arr) => {
    return new Promise(resolve => {
        const promises = arr.map(element => {
            return new Promise(resolve => {
                ProductModel.findById(element._id, (err, product) => {
                    resolve({
                        product: product,
                        count: element.count
                    })
                })
            })
        })
        Promise.all(promises).then(products => resolve(products))
    })
}

module.exports = router