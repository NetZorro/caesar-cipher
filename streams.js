const { Transform, pipeline } = require("stream");
const caesarCipher = require("./caesar-cipher.js");

/**
 * Реализует поток трансформации данных согласно алгоритму цезаря.
 */
class CaesarTransformStream extends Transform {
  constructor(shift, action) {
    super(shift, action);
    this.shift = shift;
    this.action = action;

    if (this.action.toUpperCase() == "DECODE") {
      this.shift = this.shift * -1;
    }
  }

  _transform(chunk, enc, callback) {
    const original = chunk.toString();
    const transformed = caesarCipher.encode(original, this.shift);
    callback(null, transformed);
  }
}

module.exports = { CaesarTransformStream };
