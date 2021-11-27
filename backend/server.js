const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// database
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

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up routes
// test a simple get route to the home page
// app.get('/', (req, res) => {
//   res.send('home page works');
// });
app.use('/users', require('./routes/users'));
app.use('/todos', require('./routes/todos'));
