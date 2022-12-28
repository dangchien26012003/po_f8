const date = require('date-and-time');
const moment = require('moment');
module.exports = {
    multipleMongooseToObject: function (mongoose) {
        
        return mongoose.map((mongoose) => {
            const courseItem = mongoose.toObject();
            courseItem.createdAt = moment(courseItem.createdAt).format("DD/MM/YYYY")
            return courseItem
        });
        // chuyển từng phần tử của mảng courses thành object thông thường và gán lại cho courses
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
