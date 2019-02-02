module.exports = {
  insertName: (req, res) => {
    console.log("Insert name!")
    console.log(req.body)
    const { name } = req.body
    NamesService.insertNameToDB(name, res)
  },
  getNames: (req, res) => {
    console.log("Get names!")
    console.log(req.body)
    NamesService.getNamesFromDB(res)
  },
  getSpecificName: (req, res) => {
    console.log("get single name")
    NamesService.getSpecificNameFromDB(req, res)
  },
  sendNewName: (req, res) => {
    console.log("sending da new name")
    NamesService.insertNewNameToDB(req, res)
  },
  deleteNameById: (req, res) => {
    console.log("deleting name by its id")
    NamesService.deleteNameFromDB(req, res)
  }
}
