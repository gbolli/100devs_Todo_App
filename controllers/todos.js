const Todo = require("../models/Todo")

module.exports = {
    getTodos: async (req, res) => {
        try {
            const items = await Todo.find({ userId: req.user.id })
            const remaining = await Todo.countDocuments({ userId: req.user.id, completed: false})
            res.render('todos', { items, remaining })
        } catch (error) {
            console.error(error)
        }
    },
    createTodo: async (req, res) => {
        try {
            await Todo.create({
                todo: req.body.todoItem,
                completed: false,
                userId: req.user.id
            })
            console.log('Todo added')
            res.redirect('/todos')
        } catch (error) {
            console.error(error)
        }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate(
                { _id: req.body.itemIdFromJS },
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
                { _id: req.body.itemIdFromJS },
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
            await Todo.findOneAndDelete({ _id: req.body.itemIdFromJS })
            console.log(`Item Deleted`)
            res.json(`Item Deleted`)
        } catch (error) {
            console.error(error)
        }
        
    }
}
