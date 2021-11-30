const router = require('express').Router();
const auth = require('../middleware/auth');
const ToDo = require('../models/todo.model');

// http://localhost:4000/todos/ (create todo)
router.post('/', async (req, res) => {
  try {
    console.log(`user is ${req.user}`);
    const { title } = req.body;

    if (!title)
      return res.status(400).json({ msg: 'Not all fields have been entered' });

    const newToDo = new ToDo({
      title,
      userId: req.user,
    });
    const savedToDo = await newToDo.save();
    res.json(savedToDo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// http://localhost:4000/todos/all (show all todos)
router.get('/all', auth, async (req, res) => {
  const todos = await ToDo.find({ userId: req.user });
  res.json(todos);
});

// http://localhost:4000/todos/:id
router.delete('/:id', auth, async (req, res) => {
  const todo = await ToDo.findOne({ userId: req.user, _id: req.params.id });
  if (!todo) return res.status(400).json({ msg: 'No todo item found !!' });
  const deletedItem = await ToDo.findByIdAndDelete(req.params.id);
  res.json(deletedItem);
});

module.exports = router;
