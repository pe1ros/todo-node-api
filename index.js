/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', require('./routes/todo.routes'));

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/TodosDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => { console.log(`Server run on PORT: ${PORT}`); });
  } catch (error) {
    console.log(error);
  }
}
start();
