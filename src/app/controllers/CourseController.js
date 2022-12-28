const Course = require('../models/Course');

// import hàm 
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // get/course/:slug
    show(req, res, next) {
        Course.findOne({
            slug: req.params.slug,
        })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }




    // middleWare(req, res, next) {
    //     if(["ve1", "ve2"].includes(req.query.ve)){
    //         req.query.action = "cho qua"
    //         return next();
    //     }
    //     res.json({mess: "lỗi"})
    // }
    // // get /course/create
    create(req, res, next) {
        res.render('courses/create');
    }


    // POST /courses/store
    store(req, res, next) {
        // res.json(req.body)

        const course = new Course(formData);

        course.save().then(() => res.redirect('/')).catch(next);
    }
    // get /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
            },
            req.body,
        )
            .then(() => res.redirect('/me/stored-courses'))
            .catch(next);
    }

    // DELETE /courses/id
    destroy(req, res, next) {
        Course.delete({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // DELETE /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // POST /courses/handle-form-actions

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(res.redirect('back'))
                    .catch(next);
                break;
            case 'trashDelete':
                // res.json(req.body)
                Course.deleteMany({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(res.redirect('back'))
                    .catch(next);
                break;
            case 'reStore':
                // res.json(req.body)
                Course.restore({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({
                    error: 'có lỗi xảy ra',
                });
        }
    }
}

module.exports = new CourseController();
