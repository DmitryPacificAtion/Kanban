const crypto = require('crypto');

export function makeHash(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}
