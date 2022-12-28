// import model db
const Course = require('../models/Course');

// import hàm sử lý object do db trả về
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // get me/stored-courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                name: req.query.type
            })
        }

        // thực hiện 2 hàm  cùng cùng lúc và trả về giá trị lần lượt trong then và render sang trang ................
        Promise.all([Course.countDocumentsDeleted(), courseQuery]).then(
            ([countDeleted, courses]) =>
                res.render('me/stored-courses', {
                    countDeleted,
                    courses: multipleMongooseToObject(courses),
                }),
        );
    }

    // get me/trash-courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses)   }),
            )    
            .catch(next);
    }
}

// exports class vào module
module.exports = new MeController();
