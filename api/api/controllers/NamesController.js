
module.exports = {
  insertName: (req, res) => {

    console.log('Insert name!')
    console.log(req.body)
    const { name } = req.body
    NamesService.insertNameToDB(name)
  }
}
