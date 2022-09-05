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
        
    }
}