var url = require('url');
var Settings = require('settings');

var config = {
    common: {
        server: {
            secret: 'power overwhelming',
            port: 3000
        },
        redis: {
            port: 6379,
            hostname: 'localhost',
            username: null,
            password: null
        }
    },

    production: {

    }
};

if (global.process.env.REDISTOGO_URL) {
    var rtg = url.parse(global.process.env.REDISTOGO_URL);
    config.production.redis = {
        port: rtg.port,
        hostname: rtg.hostname,
        username: rtg.auth.split(':')[0],
        password: rtg.auth.split(':')[1],
    };
}

var options = {};
if (global.process.env.NODE_ENV) {
    options.env = global.process.env.NODE_ENV.toLowerCase();
}

module.exports = new Settings(config, options);
