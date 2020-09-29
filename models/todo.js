const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

module.exports = model('Todo', todoSchema);
