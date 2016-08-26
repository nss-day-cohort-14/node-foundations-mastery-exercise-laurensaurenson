const { Transform } = require('stream');

const ts = Transform();

let wordCount = 0;

ts._transform = (buff, enc, cb) => {
  if (wordCount < 10) {
    wordCount++;
    cb(null, `${buff.toString()}\n`);
  } else {
    cb();
  }
}

module.exports = ts;