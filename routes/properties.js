var propertySchema = require('../schemas/propertySchema.js');

exports.list = function(req, res) {
    propertySchema.listProperties(res.locals.community, 123, function(err, properties) {
        res.render('properties', {properties: properties});
    }); 
};

exports.add = function(req, res) {
    var address = {
        streetAddress: req.param('streetAddress'),
        city: req.param('city'),
        state: req.param('state'),
        zip: req.param('zip'),
        country: req.param('country')
    };
    propertySchema.addProperty(req.param('name'), req.param('description'), address, res.locals.community, function(err, newProperty) {
        if (err) return handleError(err);
        res.redirect('/property');
    });
};

exports.remove = function(req, res) {
    res.send("removing " + req.param("id") + "!");
};

exports.update = function(req, res) {
    res.send("updating " + req.param("id"));
};

exports.details = function(req, res) {
    propertySchema.model.findById(req.param("id"), function(err, property) {
        res.render("property_detail", {property: property});
    });
};
