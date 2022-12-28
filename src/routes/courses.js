const express = require('express');

// phân chia router
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
// router.get('/create', courseController.middleWare, courseController.create);
router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormAction);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.patch('/:id/restore', courseController.restore);
router.put('/:id', courseController.update);
router.get('/:slug', courseController.show);

module.exports = router;
