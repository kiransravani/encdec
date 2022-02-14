import * as crypto from "crypto";


export default class StringTools {
  /**
   * Remove HTML tags from a string
   * @param str
   * @returns {*|Object|string|void|never}
   */
  static stripHtml(str) {
    return str.replace(/<[^>]*>?/gm, '');
  }

  /**
   * Generate a random string
   * @param length - defaults to 28 if empty
   * @returns {string}
   */
  static random(length) {
    length = length || 28;
    let possible = this.range('A', 'Z').concat(this.range('a', 'z')).concat(this.range('0', '9'));
    let randomString:any = [];
    while (randomString.length < length) {
      let index = Math.floor(
        ((Math.random() * (possible.length - 1)) + 1)
      );
      randomString.push(possible[index]);
    }
    return randomString.join('');
  }

  /**
   * Mimics PHP range();
   * @param start
   * @param stop
   * @returns {Array}
   */
  static range(start, stop) {
    let result:any = [];
    for (let idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
      result.push(String.fromCharCode(parseInt(idx)));
    }
    return result;
  };

  /**
   * Hashes stuff
   * @param password
   * @param salt
   * @returns {string}
   */
  static hmac(password, salt) {
    salt = salt || '';
    return crypto
      .createHmac('sha512', salt)
      .update(password)
      .digest('hex');
  }

  /**
   * Compoare hashed password (hmac)
   * @param password
   * @param salt
   * @param hash
   * @returns {boolean}
   */
  static hmacCompare(password, salt, hash) {
    return (hash.toString() === this.hmac(password.toString(), salt.toString()));
  }

  static intOrNull(val) {
    let tempVal = parseInt(val)
    return (tempVal !== 0 && tempVal != 0 && !isNaN(tempVal)) ? tempVal : null
  }

}

module.exports = StringTools;
