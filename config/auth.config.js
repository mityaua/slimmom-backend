module.exports = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: 60, //3600  1hour
  jwtRefreshExpiration: 120, //86400   24hour
};
