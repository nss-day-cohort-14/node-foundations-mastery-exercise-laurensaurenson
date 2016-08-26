const { createReadStream } = require('fs');
const limitLength = require('./limit-ten');
const es = require('event-stream');

const [,, searchedWord, ..._] = process.argv;

createReadStream('/usr/share/dict/words')
  .pipe(es.split())
  .pipe(es.map(function (data, cb) { 
    if (data.startsWith(`${searchedWord}`)) {
      cb(null, `${data} `)
    } else {
      cb()
    }
  }))
  .pipe(limitLength)
  .pipe(process.stdout);

// const 

// this is the main file

// accept one argument: searched word

// use this file to search for words: 
// // /usr/share/dict/words

// 1- createReadStream

// 2- split()

// 3- map()

// limit-ten will contain Transform
// return only 10 words
// then pipe to process.stdout