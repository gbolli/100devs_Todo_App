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
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate(
                { todo: req.body.itemFromJS },
                { completed: true }
            )
            console.log(`Item marked complete`)
            res.json(`Item marked complete`)
        } catch (error) {
            console.error(error)
        }
    },
    markIncomplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate(
                { todo: req.body.itemFromJS },
                { completed: false }
            )
            console.log(`Item marked incomplete`)
            res.json(`Item marked incomplete`)
        } catch (error) {
            console.error(error)
        }
    },
    deleteItem: async (req, res) => {
        try {
            await Todo.findOneAndDelete({ todo: req.body.itemFromJS })
            console.log(`Item Deleted`)
            res.json(`Item Deleted`)
        } catch (error) {
            console.error(error)
        }
        
    }
}
