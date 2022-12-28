const mongoose = require('mongoose');

// thư viện để slug lấy có data giống name*(bỏ dấu và space=>-)
const slug = require('mongoose-slug-generator');

// thư viện có công dụng khi xoá sẽ không xoá hẳn mà thêm deletedAt
const mongooseDelete = require('mongoose-delete');

// thư viện auto increment(chỉnh sửa nội dung bên trong mongoose)
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: {type: Number},
        name: { type: String, require: true },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        video: { type: String },
        deletedAt: { type: Date },
        deleted: { type: Boolean },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// add plugin
Course.plugin(AutoIncrement);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
