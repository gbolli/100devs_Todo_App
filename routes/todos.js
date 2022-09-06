const express = require('express')
const router = express.Router()

const todosController = require('../controllers/todos')

router.get('/', todosController.getTodos)
router.post('/createTodo', todosController.createTodo)
router.put('/markComplete', todosController.markComplete)
router.put('/markIncomplete', todosController.markIncomplete)
router.delete('/deleteItem', todosController.deleteItem)

module.exports = router