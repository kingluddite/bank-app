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
const altUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const AltUser = mongoose.model('AltUser', altUserSchema);

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

app.post('/todos', (req, res) => {
  // let's test "hitting" this endpoint
  // use a tool like Postman or Insomnia to test post API calls
  res.send('todos endpoint hit');
});

// app.use('/users', require('./routes/users'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
