require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// you need this to send data from one domain to another domain
// if you don't have cors you will get this error (https://i.imgur.com/sNUz4my.png)
const cors = require('cors');

// set up express
const app = express();
// you need this next line to use req.body else you get "undefined"
app.use(express.json());
// make sure to use the cors middleware (next line!)
app.use(cors());

const db = require('./config/connection');

const PORT = process.env.PORT || 4000;

// database (i made code modular and put db connection in it's own folder)
// mongoose.connect(
//   process.env.MONGODB_URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log('MongoDB connection established');
//   }
// );

// set up routes
// test a simple get route to the home page
// app.get('/', (req, res) => {
//   res.send('home page works');
// });
app.use('/users', require('./routes/users'));
app.use('/todos', require('./routes/todos'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
