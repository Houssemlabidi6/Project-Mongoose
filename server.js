const express = require("express");
const person = require("./UserModel");
const app = express();
// Load environment variables from .env file
require("dotenv").config();

const mongoose = require("mongoose");

//-----connect to DB --------//
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create & Save a Model
person
  .insertMany([
    {
      name: "Labidi",
      age: 28,
      favoriteFoods: ["Pizza", "Fruit"],
    },
  ])
  .then((insertedElement) => {
    console.log("The Inserted Elemenmt: ", insertedElement);
  });

//CreateMany Records with model.create()
person
  .create([
    {
      name: "Ahmadi",
      age: 27,
      favoriteFoods: ["Milk", "Cake"],
    },
    {
      name: "yahya",
      age: 31,
      favoriteFoods: ["chicken", "salad"],
    },
    {
      name: "Barhoumi",
      age: 25,
      favoriteFoods: ["burger", "Yoghurt"],
    },
  ])
  .then((insertedElement) => {
    console.log("The Inserted Elemenmt: ", insertedElement);
  });

//Use_model.find()_to_Search_Your_Database
person.find().then((remainingPerson) => {
  console.log(remainingPerson);
});

// //Use_model.findOne()
person
  .findOne({ favoriteFoods: "Pizza" }) // exemple : favoriteFoods: "Pizza"
  .then((remainingPerson) => {
    console.log(remainingPerson);
  });

//Use_model.findById()
async function fetchData() {
  try {
    const id = "64e5e10e9f40b3be2b5635c4";
    const done = await person.findById(id);
    console.log(done);
  } catch (err) {
    console.error(err);
  }
}

fetchData();

//model.findOneAndUpdate()
person
  .findOneAndUpdate(
    { name: "Labidi" },
    { $set: { favoriteFoods: "hamburger" } }
  )
  .then((updatedPerson) => {
    console.log("Updated Person: ", updatedPerson);
  });

//model.findByIdAndRemove()
async function removePerson() {
  try {
    const id = "64e5e10e9f40b3be2b5635c6";
    const removedPerson = await person.findByIdAndRemove(id);
    console.log("Removed Person:", removedPerson);
  } catch (err) {
    console.error(err);
  }
}
removePerson();

//model.remove()
async function removePersons() {
  try {
    const removedPersons = await person.deleteMany({ name: "yahya" });
    console.log("Removed Persons:", removedPersons);
  } catch (err) {
    console.error(err);
  }
}
removePersons();

//Chain Search Query Helpers to Narrow Search Results
person
  .find({ favoriteFoods: "Milk" })
  .sort("name") // Sort by name
  .limit(2) // Limit to two documents
  .select("-age") // Hide the 'age' field
  .then((data) => {
    console.log("Results:", data);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
// ----run server on port 4000------//
const port = process.env.PORT;
app.listen(port, () => console.log(`server run on port ${port}`));
