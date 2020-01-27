const { Schema, model } = require('mongoose');

const schema = new Schema({
  start: {type: Number, required: true},
  duration: {type: Number, required: true},
  title: {type: String, required: true},
});

module.exports = model("Event", schema);