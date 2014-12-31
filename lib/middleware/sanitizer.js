'use strict';

var _ = require('underscore');
 
module.exports = function () {
    return function (req, res, next) {
        if (req.body) {
            _.each(req.body, function (value, key) {
                    req.body[key] = req.sanitize(value);
            });
        }
        return next();
    };
};
