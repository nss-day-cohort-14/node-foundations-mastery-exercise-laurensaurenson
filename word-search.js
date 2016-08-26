const { createReadStream } = require('fs');
const limitLength = require('./limit-ten');
const es = require('event-stream');

const [,, searchedWord, ..._] = process.argv;

if (!searchedWord) {
  console.log(`Usage: word-search.js [searchterm]`);
} else {
  console.log(`Usage: word-search.js ${searchedWord}`);
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
}