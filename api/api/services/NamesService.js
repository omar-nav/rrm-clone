const MongoClient = require("mongodb").MongoClient
const test = require("assert")
const url = "mongodb://localhost:27017"
const dbName = "rrmclone"
const ObjectID = require("mongodb").ObjectID

module.exports = {
  insertNameToDB: (name, res) => {
    console.log("Inserting brand new name to DB!")

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
            res.status(200).send({ msg: "nombre agregado" })
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
              res
                .status(200)
                .send({ result: result, msg: "aqui van todos los nombres!!" })
            }
            client.close()
          })
      }
    )
  },
  getSpecificNameFromDB: (req, res) => {
    console.log(req.allParams())
    // console.log("getting specific name from DB! Which is " + req.param("id"))

    MongoClient.connect(
      url,
      (err, client) => {
        test.equal(null, err)
        // Create a collection we want to drop later
        const col = client.db(dbName).collection("names")
        // get all documents
        col
          .find({
            //query for that specific _id
            _id: ObjectID(req.allParams().id)
          })
          .toArray((err, result) => {
            if (err) {
              console.warn(err.message) // returns error if no matching object found
            } else {
              console.log("result", result)
              res.status(200).send({
                result: result[0].name,
                msg: "aqui va el nombre con ese _id!!"
              })
            }
            client.close()
          })
      }
    )
  },
  insertNewNameToDB: (req, res) => {
    console.log("Inserting new name to DB!")

    MongoClient.connect(
      url,
      (err, client) => {
        test.equal(null, err)
        // Create a collection we want to drop later
        const col = client.db(dbName).collection("names")
        // get all documents
        col.findOneAndUpdate(
          //query for that specific _id
          { _id: ObjectID(req.allParams().id) },
          { $set: { name: req.allParams().newName } },
          { upsert: true },
          (err, result) => {
            if (err) {
              console.warn(err.message) // returns error if no matching object found
            } else {
              console.log("result", result)
              res.status(200).send({
                result: result,
                msg: "cambie el nombre!!"
              })
            }
            client.close()
          }
        )
      }
    )
  }
}
