const crypto = require("crypto");

export function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}
