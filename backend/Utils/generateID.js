const {randomBytes} = require('crypto');

function generateUniqueId() {
  return randomBytes(16).toString('hex');
}

module.exports = generateUniqueId;