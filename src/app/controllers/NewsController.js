class SiteController {
    // [get] /
    index(req, res) {
        res.render('news');
    }
    // [get] /search
    show(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
