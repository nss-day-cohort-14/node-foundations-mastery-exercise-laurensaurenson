const { createReadStream } = require('fs');
const limitLength = require('./limit-ten');
const es = require('event-stream');

const [,, searchedWord, ..._] = process.argv;

if (!searchedWord) {
  // displayed if no searchterm given
  console.log(`Usage: word-search.js [searchterm]`);
} else {
  createReadStream('/usr/share/dict/words')
    // splits string object on \n into an array of substrings
    .pipe(es.split())
    // checks if word begins with search term
    .pipe(es.map(function (data, cb) { 
      if (data.startsWith(`${searchedWord}`)) {
        cb(null, `${data}`)
      } else {
        cb()
      }
    }))
    // limit to ten words shown
    .pipe(limitLength)
    // prints
    .pipe(process.stdout);
}