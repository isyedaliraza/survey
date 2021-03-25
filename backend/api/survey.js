const express = require("express")
const router = express.Router()
const db = require("../models")
const Survey = require("../models/survey")(db.sequelize, db.Sequelize.DataTypes)

router.get("", async (req, res) => {
  try {
    const surveys = await Survey.findAll()
    res.json(surveys)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.post("", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.questions ||
    !req.body.isActive ||
    !req.body.expiryDate
  ) {
    return res.sendStatus(500)
  }

  const title = req.body.title
  const questions = JSON.parse(req.body.questions)
  const isActive = JSON.parse(req.body.isActive)
  const expiryDate = new Date(req.body.expiryDate)

  try {
    await Survey.create({
      title: title,
      questions: questions,
      isActive: isActive,
      expiryDate: expiryDate,
    })

    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const survey = await Survey.findByPk(id)

    if (survey !== null) {
      await survey.destroy()
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

module.exports = router
