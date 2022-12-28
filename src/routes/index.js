// import tuyến đường
const newRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newRouter);
    app.use('/', siteRouter);
}

module.exports = route;
