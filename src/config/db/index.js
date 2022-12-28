// thư viện để kết nối db
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
    console.log('Connected to mongodb');
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_edu_dev');
        console.log('Connected to mongodb');
    } catch (error) {
        console.log('failed to connect to mongodb');
    }
}
module.exports = { connect };
