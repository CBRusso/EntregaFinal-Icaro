const bcrypt = require("bcrypt");

const salt = 10;

const passwordEncrypt = (password) => {
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

const passwordCompare = (password, hashed) => {
  const match = bcrypt.compareSync(password, hashed); 
  return match;
};

module.exports = { passwordEncrypt, passwordCompare };