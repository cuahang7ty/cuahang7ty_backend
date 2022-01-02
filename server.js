require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const corsOptions = { origin: '*', credentials: true } //access-control-allow-credentials:true optionSuccessStatus:200, }

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect database
console.log(process.env.DB_LOCAL_URL)
mongoose.connect(process.env.DB_HOST_URL || process.env.DB_LOCAL_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('ERROR! : ', err));

//routers ===============================================================
const productRouter = require('./routers/product-router')
app.use('/api/product', productRouter);

const customerRouter = require('./routers/customer-router')
app.use('/api/customer', customerRouter);

const billReceiptRouter = require('./routers/billReceipt-router')
app.use('/api/billReceipt', billReceiptRouter);

const keywordRouter = require('./routers/keyword-router')
app.use('/api/keyword', keywordRouter);

//=======================================================================

app.get('/', function (req, res) {
    res.json('welcome to backend cuahang7ty' + process.env.DB_LOCAL)
})

app.listen(process.env.PORT || process.env.PORT, function () {
    console.log('Server is running on Port:', process.env.PORT || process.env.PORT);
})

module.exports = app

/*
QUI ƯỚC CHUNG:
    phía client không được đưa về 1 object trùng lắp ở database mà phải đưa object đó về 1 _id
    khi nào cần, backend sẽ dùng _id đó truy tìm object tương ứng để trả về client
*/