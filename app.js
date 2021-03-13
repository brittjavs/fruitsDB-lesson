//jshint esversion:6
require('dotenv').config();
const uri = process.env.DB_URI

const mongoose = require('mongoose')
mongoose.connect(uri, {useNewUrlParser: true}, { useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema ({
    name: String,
    variety: String,
    score: Number,
    review: String,
});

const Fruit = mongoose.model("fruit", fruitSchema);

const fruit = new Fruit({
    name: "Pear",
    variety: "Bosch",
    score: 7,
    review: "It's ok"
})

// fruit.save()

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: "John",
    age: 37
})

const kiwi = new Fruit({
    name: "Kiwi",
    score: 6,
    review: "Too seedy"
})

const mango = new Fruit({
    name: "Mango",
    score: 10,
    variety: "Manila",
    review: "Perfect"
})
Fruit.insertMany([mango, kiwi], function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved fruit")
    }
})