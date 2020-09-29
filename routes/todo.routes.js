/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { Router } = require('express');
const Todo = require('../models/todo');

const router = Router();

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos.length) {
      return res.status(400).json({ message: 'Todos not found...' });
    }
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong...' });
  }
});
router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.find({ _id: id });
    if (!todo) {
      return res.status(400).json({ message: 'Todo not found...' });
    }
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong...' });
  }
});
router.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    if (description) {
      const newTodo = await Todo.create({ description, completed: false });
      newTodo.save();
      return res.status(201).json({ message: 'Todo was created' });
    }
    res.status(400).json({ message: 'Todo not created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong...' });
  }
});
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;

    const todo = await Todo.findById({ _id: id });
    if (!todo) {
      return res.status(400).json({ message: 'Todo not found...' });
    }
    if (!description) {
      todo.completed = completed;
      todo.save();
      return res.status(200).json({ message: 'Todo was updated' });
    }
    if (!completed) {
      todo.description = description;
      todo.save();
      return res.status(200).json({ message: 'Todo was updated' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong...' });
  }
});
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById({ _id: id });
    if (!todo) {
      return res.status(400).json({ message: 'Todo not found...' });
    }
    todo.delete();
    return res.status(400).json({ message: 'Todo was delete' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong...' });
  }
});
module.exports = router;
