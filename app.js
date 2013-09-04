
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var communities = require('./routes/communities');
var properties = require('./routes/properties');
var http = require('http');
var path = require('path');
var swig = require('swig');
//var expressValidator = require('express-validator');

var app = express();

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
app.get('/property', properties.list);
app.post('/property', properties.add);
app.get('/property/:id', properties.details);
app.post('/property/:id', properties.update);
app['delete']('/property/:id', properties.remove);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
