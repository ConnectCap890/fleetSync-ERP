const {randomBytes} = require('crypto');

function generateUniqueId() {
  return randomBytes(3).toString('hex');
}

module.exports = generateUniqueId;