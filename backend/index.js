const express = require('express')
const { urlencoded } = require("body-parser")
const cors = require("cors")
const db = require('./models')

const app = express()
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use('/api/surveys', require('./api/survey'))

db.sequelize.sync().then(() => {
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
})