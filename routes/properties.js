var propertySchema = require('../schemas/propertySchema.js'),
    mongoose = require("mongoose");

exports.list = function(req, res) {
    propertySchema.listProperties(res.locals.community, 123, function(err, properties) {
        res.render('properties', {locals: res.locals, properties: properties});
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
        if (err) return handleError(err); //TODO: yeah, what?
        res.redirect('/properties');
    });
};

exports.restrict = function(req, res, next) {
    propertySchema.model.findOne({'_id': req.param('id'), 'admins': 123}, function(err, property) {
        if (err || !property) {
            res.status(403).send("Not allowed");
        }
        else {
            res.locals.property = property;
            next();
        }
    });
}

exports.remove = function(req, res) {
    propertySchema.model.findByIdAndRemove(res.locals.property, function(err, property) {
        res.redirect('/properties');
    });
};

exports.update = function(req, res) {
    res.locals.property.set(req.body).save(function(err, property) {
        res.json(200, property);
    });
};

exports.details = function(req, res) {
    console.log(res.locals);
    res.render("property-detail", {locals: res.locals, property: res.locals.property});
};
