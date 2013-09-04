exports.load = function(req, res, next) {
    var host = req.host;
    var community = host.match(/([\S]*)\.community-cottage\.com/)[1];
    res.locals.community = community.toLowerCase();
    next();
}
