'use strict';

module.exports = function () {
    return function (req, res, next) {
        res.locals.user = req.user;

        var flash = req.flash();
        res.locals.success = flash.success || '';
        res.locals.info = flash.info || '';
        res.locals.error = flash.error || '';

        res.locals.mainNav = '';
        res.locals.subNav = '';

        res.locals.activeNav = function (activeItem, item) {
            return activeItem && activeItem === item ? ' class="active"' : '';
        };

        next();
    };
};
