const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect(
    'mongodb+srv://philadmin:qGiOugTkFJ5ROG6d@devconnector.a2gjt.mongodb.net/bankApp',
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
