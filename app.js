var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var expressSanitizer = require('express-sanitizer');
var session = require('express-session');
var flash = require('connect-flash');
var RedisStore = require('connect-redis')(session);
var config = require('./config');
var bodyExpressSanitizer = require('./lib/middleware/sanitizer');

module.exports = function (redis) {
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(expressLayouts);

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(expressSanitizer());
    app.use(bodyExpressSanitizer());

    app.use(session({
        store: new RedisStore({
            client: redis
        }),
        secret: config.server.secret,
        resave: false,
        saveUninitialized: true
    }));
    app.use(flash());

    app.use(function (req, res, next) {
      res.locals.user = req.user;

      var flash = req.flash();
      res.locals.success = flash.success || '';
      res.locals.info = flash.info || '';
      res.locals.error = flash.error || '';

      next();
    });

    require('./config/passport')(app);

    var access = require('./config/roles')(app);

    app.use('/', require('./routes/index')(access));
    app.use('/admin', require('./routes/admin')(access));
    app.use('/admin/seasons', require('./routes/admin_seasons')(access));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                layout: false,
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            layout: false,
            message: err.message,
            error: {}
        });
    });

    return app;
};
