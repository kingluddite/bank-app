const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

// create an alternative user
// just to play around with alternate way to authenticate
const altUserSchema = new mongoose.Schema({
  name: String,
  password: String,
});
const AltUser = mongoose.model('AltUser', altUserSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await AltUser.create({ username, password });

  res.json({
    message: 'success',
  });
});

app.use('/users', require('./routes/users'));

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
