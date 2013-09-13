/**
 * Module dependencies.
 */

var express = require('express');
var emr = require('express-mongoose-resource');
var routes = require('./routes');
var communities = require('./routes/communities');
var properties = require('./routes/properties');
var cottages = require('./routes/cottages');
var http = require('http');
var path = require('path');
var swig = require('swig');
var swigExposeTag = require("./swigExposeTag")(swig);
//var expressValidator = require('express-validator');

var app = express();

swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('view cache', false);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(expressValidator);
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.all('*', communities.load);
app.get('/', routes.index);
app.get('/properties', properties.list);
app.post('/properties', properties.add);
app.all('/properties/:id*', properties.restrict);
app.get('/properties/:id', properties.details);
app.put('/properties/:id', properties.update);
app.patch('/properties/:id', properties.update);
app.delete('/properties/:id', properties.remove);
app.all('/properties/:id', properties.restrict);
app.post('/properties/:id/cottages', cottages.add);
app.put('/properties/:id/cottages/:cottageId', cottages.update);
app.patch('/properties/:id/cottages/:cottageId', cottages.update);
app.delete('/properties/:id/cottages/:cottageId', cottages.remove);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
