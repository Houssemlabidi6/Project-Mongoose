const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = mongoose.createConnection("mongodb://localhost:27017/user");

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
// Create the Person model
module.exports = mongoose.model("users", personSchema);
