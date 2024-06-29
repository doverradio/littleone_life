const crypto = require('crypto');

exports.generateRandomPassword = (length = 16) => {
    return crypto.randomBytes(length).toString('hex'); // Generate a hex string of the specified length
};
