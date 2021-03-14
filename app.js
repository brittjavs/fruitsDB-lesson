//jshint esversion:6
require('dotenv').config();
const uri = process.env.DB_URI

const mongoose = require('mongoose')
mongoose.connect(uri, {useNewUrlParser: true}, { useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "A fruit with no name?"]
    },
    variety: String,
    score: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
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
    age: Number,
    favoriteFruit: fruitSchema
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

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "delicious"
})

// pineapple.save()

const amy = new Person({
    name: "Amy",
    age: 28,
    favoriteFruit: pineapple
})

// amy.save()

const coconut = new Fruit({
    name: "Coconut",
    variety: "Young Thai",
    score: 7,
    review: "Not dry like other varieties"
})

coconut.save()

Person.updateOne({name: "John"}, {favoriteFruit: coconut}, function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Successfully updated document")
    }
})

// Fruit.insertMany([mango, kiwi], function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully saved fruit")
//     }
// })

Fruit.find(function(err, fruits){
    if(err){
        console.log(err)
    }
    else{
        mongoose.connection.close()
        fruits.forEach(fruit =>{
            console.log(fruit.name)
        })
    }
})