const express = require('express');

const menu = require("../db/menu");

const router = express.Router();

router.get('/menu', (req, res) => {
    res.status(200).send(menu.get.menu())
})

router.get('/meals', (req, res) => {
    res.status(200).send(menu.get.meals())
})

//TODO: Status codes!!
router.get('/menu/:week', (req, res) => {
    var week = req.params.week
    res.status(200).send(menu.get.menu(week))
})

router.post('/meal', (req, res) => {
    var operationStatus = menu.create.meal(req.body.meal)
    res.status(operationStatus).send()
})

router.put('/meal', (req, res) => {
    var operationStatus = menu.update.meal(req.body.id, req.body.newMeal)
    res.status(operationStatus).send()
})

router.delete('/meal', (req, res) => {
    var operationStatus = menu.remove.meal(req.body.meal)
    res.status(operationStatus).send()
})

module.exports = router;