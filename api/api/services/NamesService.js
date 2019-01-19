const MongoClient = require('mongodb').MongoClient;
const test   = require('assert');
const url    = 'mongodb://localhost:27017';
const dbName = 'rrmclone';

module.exports = {
  insertNameToDB: (name) => {
    console.log('Inserting to DB!')

    MongoClient.connect(url, (err, client) => {
      test.equal(null, err);
      // Create a collection we want to drop later
      const col = client.db(dbName).collection('names');
      // Insert a bunch of documents
      col.insert([
        {
          name: name
        }
      ], {w:1}, (err, result) => {
        test.equal(null, err);
        // Show that duplicate records got dro
        console.log(result)
        client.close();
      });
    });
  }
}
