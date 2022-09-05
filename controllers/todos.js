const Todo = require("../models/Todo")

module.exports = {
    getTodos: async (req, res) => {
        try {
            const items = await Todo.find()
            // TODO: count completed
            res.render('todos', { items })
        } catch (error) {
            console.error(error)
        }
        
    },
    createTodo: async (req, res) => {
        try {
            await Todo.create({
                todo: req.body.todoItem,
                completed: false
            })
            console.log('Todo added');
            res.redirect('/todos');
        } catch (error) {
            console.error(error)
        }
    }
}