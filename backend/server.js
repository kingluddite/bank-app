const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect(
  '',
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
