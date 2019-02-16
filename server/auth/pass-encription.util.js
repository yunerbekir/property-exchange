const crypto = require('crypto');

module.exports = {
    encript: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    },
    areEqual: (plainPassword, encriptedPassword) => {
        return this.encript(plainPassword) === encriptedPassword;
    }
};
