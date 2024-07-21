const crypto = require('crypto');

const encKey = crypto.randomBytes(32).toString('base64');
const sigKey = crypto.randomBytes(64).toString('base64');

console.log('32-byte base64 key:', encKey);
console.log('64-byte base64 key:', sigKey);
