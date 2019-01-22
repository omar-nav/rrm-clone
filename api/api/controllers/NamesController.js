module.exports = {
  insertName: (req, res) => {
    console.log("Insert name!")
    console.log(req.body)
    const { name } = req.body
    NamesService.insertNameToDB(name)
  },
  getNames: (req, res) => {
    console.log("Get names!")
    console.log(req.body)
    NamesService.getNamesFromDB(res)
  }
}
