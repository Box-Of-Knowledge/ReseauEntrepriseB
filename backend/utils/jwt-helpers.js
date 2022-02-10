const jwt = require('jsonwebtoken');
//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, user_name }) {
  const user = { user_id, user_name }; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '120m' });
  return ({ accessToken, refreshToken });
}

module.exports = jwtTokens;