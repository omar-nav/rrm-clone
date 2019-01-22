const MongoClient = require("mongodb").MongoClient
const test = require("assert")
const url = "mongodb://localhost:27017"
const dbName = "rrmclone"

module.exports = {
  insertNameToDB: name => {
    console.log("Inserting to DB!")

    MongoClient.connect(
      url,
      (err, client) => {
        test.equal(null, err)
        // Create a collection we want to drop later
        const col = client.db(dbName).collection("names")
        // Insert a bunch of documents
        col.insert(
          [
            {
              name: name
            }
          ],
          { r: 1 },
          (err, result) => {
            test.equal(null, err)
            // Show that duplicate records got dro
            console.log(result)
            client.close()
          }
        )
      }
    )
  },
  getNamesFromDB: res => {
    console.log("getting from DB!")

    MongoClient.connect(
      url,
      (err, client) => {
        test.equal(null, err)
        // Create a collection we want to drop later
        const col = client.db(dbName).collection("names")
        // get all documents
        col
          .find({
            //blank query
          })
          .toArray((err, result) => {
            if (err) {
              console.warn(err.message) // returns error if no matching object found
            } else {
              console.log(result)
              res.status(200).send({ result })
            }
            client.close()
          })
      }
    )
  }
}
