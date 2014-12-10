var ConnectRoles = require('connect-roles');

module.exports = function (app) {
    var user = new ConnectRoles({
        failureHandler: function (req, res, action) {
            if (action === 'access if logged in as admin') {
                res.redirect('/login');
            }
        }
    });

    app.use(user.middleware());

    user.use('access if logged in as admin', function (req) {
        return !!req.user;
    });

    return {
        if_logged_in_as_admin: function () {
            return user.can('access if logged in as admin');
        }
    }
};