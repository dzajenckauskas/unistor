var jwt = require("jsonwebtoken");

let secret = process.env.jwtSecret;

export function createJWT(expiration, data) {
  const token = jwt.sign({ data }, secret, {
    expiresIn: expiration,
  });
  return token;
}

export function verifyJWT(token) {
  let answer = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  return answer;
}
