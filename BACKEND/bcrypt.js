const bcrypt = require("bcrypt");

export async function hashPassword(password) {
   let answer = await bcrypt.hash(password, 10);
   return answer;
}

export async function compareBcrypt(currentPassword, databasePassword) {
   let answer = await bcrypt.compare(currentPassword, databasePassword);
   return answer;
}
