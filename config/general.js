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
    },
    psql: {
      host: 'localhost',
      port: 5432,
      username: 'pgrating',
      password: 'pgrating',
      database: 'rating'
    },
    sequelize: {
      logging: console.log,
      define: {
        underscored: true,
        underscoredAll: true,
      }
    }
  },

  production: {
    sequelize: {
      logging: false
    }
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

if (global.process.env.HEROKU_POSTGRESQL_CRIMSON_URL) {
  var match = process.env.HEROKU_POSTGRESQL_CRIMSON_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  config.production.psql = {
    host: match[3],
    port: match[4],
    username: match[1],
    password: match[2],
    database: match[5]
  };
}

var options = {};
if (global.process.env.NODE_ENV) {
  options.env = global.process.env.NODE_ENV.toLowerCase();
}

module.exports = new Settings(config, options);
