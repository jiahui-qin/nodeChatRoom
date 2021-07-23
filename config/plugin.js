// eslint-disable-next-line strict
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.security = {
  // eslint-disable-next-line eggache/no-unexpected-plugin-keys
  xframe: {
    enable: false,
  },
};
// eslint-disable-next-line eggache/no-override-exports
module.exports.passport = {
  enable: true,
  package: 'egg-passport',
};

// eslint-disable-next-line eggache/no-override-exports
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
