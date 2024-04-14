const bcrypt = require('bcrypt');

const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const validaPassword = (password, passwordConHash) => bcrypt.compareSync(password, passwordConHash);

module.exports = {
    generaHash,
    validaPassword
};
