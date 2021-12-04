const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// set up routes
// test a simple get route to the home page
// app.get('/', (req, res) => {
//   res.send('home page works');
// });
// app.use('/users', require('./routes/users'));
// app.use('/todos', require('./routes/todos'));

// create an alternative user
// just to play around with alternate way to authenticate
// Models
const altUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const AltUser = mongoose.model('AltUser', altUserSchema);

const altTodosSchema = new mongoose.Schema({
  userId: String,
  todos: [
    {
      check: Boolean,
      text: String,
    },
  ],
});

const AltTodos = mongoose.model('AltTodos', altTodosSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const altUser = await AltUser.findOne({ username }).exec();
  if (altUser) {
    res.status(500);
    res.json({
      message: 'user already exists',
    });
    return;
  }

  await AltUser.create({ username, password });

  res.json({
    message: 'success',
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const altUser = await AltUser.findOne({ username }).exec();
  if (!altUser || altUser.password !== password) {
    res.status(401); // https://stackoverflow.com/questions/32752578/whats-the-appropriate-http-status-code-to-return-if-a-user-tries-logging-in-wit#:~:text=The%20401%20(Unauthorized)%20status%20code,credentials%20for%20the%20target%20resource.
    res.json({
      message: 'invalid login',
    });
    return;
  }

  await AltUser.create({ username, password });

  res.json({
    message: 'success',
  });
});

app.post('/todos', async (req, res) => {
  // First - test hitting endpoing
  // (use a tool like Postman or Insomnia to test post API calls)
  // res.send('todos endpoint hit');
  // Second - get the username and password with some JavaScript ninja skills :)
  // 1) grab what in authorization from the request's headers
  const { authorization } = req.headers;
  // console.log(authorization); // (will output this) Basic pip:123456
  // 2) split the items by the space and store the second part in the variable token
  const [, token] = authorization.split(' ');
  // 3) split into two items "username" and "password" based on ":"
  const [username, password] = token.split(':');
  // grab the todos sent over from the client
  const todosItems = req.body;
  const altUser = await AltUser.findOne({ username }).exec();
  if (!altUser || altUser.password !== password) {
    res.status(401);
    res.json({
      message: 'invalid login',
    });
    return;
  }
  const todos = await AltTodos.findOne({ userId: altUser._id }).exec();
  if (!todos) {
    // no todos for this user so let's create some todos
    await AltTodos.create({
      userId: altUser._id,
      todos: todosItems,
    });
  } else {
    // todos already exists
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todos);
});

// app.use('/users', require('./routes/users'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
