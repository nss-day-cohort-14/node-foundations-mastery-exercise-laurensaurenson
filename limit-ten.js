const { Transform } = require('stream');

const ts = Transform();

let wordCount = 0;

ts._transform = (buff, enc, cb) => {
  if (wordCount < 10) {
    // counts as each word is added
    wordCount++;
    // if there are less than 10 words 
    // // send to add to final array
    cb(null, `${buff.toString()}\n`);
  } else {
    // else don't send
    cb();
  }
}

module.exports = ts;