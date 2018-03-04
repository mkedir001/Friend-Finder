// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// =============================================================

var Bff = [];
var newMan = [];
var counter = 0;
var absoluteArray = [];
var compatable = [];
var newGuy = [],
    dummy = [],
    c = dummy.map(function (v, i) { return Math.abs(v - newGuy[i]); });

// console.log('<pre>' + JSON.stringify(c, 0, 4) + '</pre>');
// Sets up the Express App

var app = express();
var PORT = process.env.PORT ||3009;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Character (DATA)

var person = [
    {
        routeName: "aminkedir",
        name: "Amin",
        role: "greatest friend",
        compatability: 0,
        age: 25,
        cat: 5,
        dog: 5,
        loyalty: 5,
        outdoorsy: 5,
        indoorsy: 5,
        sports: 5,
        movies: 5,
        foodie: 5,
        travel: 5,
        image: "cat2.jpg" 
    },
    {
        routeName: "worstfriend",
        name: "Terry",
        role: "worst fried",
        compatability: 0,
        age: 20,
        cat: 0,
        dog: 0,
        loyalty: 0,
        outdoorsy: 0,
        indoorsy: 0,
        sports: 0,
        movies: 0,
        foodie: 0,
        travel: 0,
        image: "cat1.jps"
    },
    {
        routeName: "okfriend",
        name: "Jimmy",
        role: "ok fried",
        compatability: 0,
        age: 27,
        cat: 3,
        dog: 4,
        loyalty: 2,
        outdoorsy: 3,
        indoorsy: 2,
        sports: 3,
        movies: 4,
        foodie: 4,
        travel: 3,
        image: "cat3.jpg"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/display", function (req, res) {
    res.sendFile(path.join(__dirname, "display.html"));
});

// Get all characters
app.get("/all", function (req, res) {
    res.json(person);
});

// app.get("/user", function (req, res) {
//     res.json(res);
// });

app.get("/api", function (req, res) {
    res.json(Bff);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function (req, res) {
    var chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < person.length; i++) {
            if (chosen === person[i].routeName) {
                return res.json(person[i]);
            }
        }
        return res.json(false);
    }
    return res.json(person);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcharacter = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    // newMan.push(res);
    pushTolist(newcharacter);
    // console.log(newMan);
    // newMan.push(res);

    // newMan.push(newcharacter.age, newcharacter.cat, newcharacter.dog, newcharacter.loyalty, newcharacter.outdoorsy, newcharacter.indoorsy, newcharacter.sports, newcharacter.movies, newcharacter.foodie, newcharacter.travel);
    // console.log("this is the new guy in town " + newGuy);
    // res.json(newGuy);
});

function grabInfo(){
   
    absoluteArray = [];
    dummy = []; 
    dummy.push(person[counter].age, person[counter].cat, person[counter].dog, person[counter].loyalty, person[counter].outdoorsy, person[counter].indoorsy, person[counter].sports, person[counter].movies, person[counter].foodie, person[counter].travel)
    console.log(dummy);
    getAbsolute();
}

// grabInfo();

function getAbsolute(){
    
   
    // newGuy = [2, 4, 2, 3, 5, 2, 3, 5, 3, 3],
      
        c = dummy.map(function (v, i) { return Math.abs(v - newGuy[i]); });
        
        absoluteArray.push(c);
        console.log("this is the absolute array: " + c);
        additup(c);
       
        counter++
        
        if(counter<=2){
            grabInfo();
        }
        else{
            return false;
        }
       
        
    
}

function additup(){
    
   
    for (var i = 0, sum = 0; i < absoluteArray[0].length; sum += absoluteArray[0][i++])
        ;

   
    person[counter].compatability = sum;
    console.log(person[counter].name + " has a compatability level of: " + person[counter].compatability);
    compatable.push(person[counter].compatability);
    
}

function grabCompatable(){
    
        var min = Math.min.apply(Math, compatable)
        console.log(min)
        for(f=0;f<person.length;f++){
            if(person[f].compatability===min){
                Bff.push(person[f].name, person[f].image);
                console.log(person[f].name + ", is the most compatable friend :)")
            }
        }
    // }
}

function pushTolist(res){
    newMan.push(res);
    newGuy.push(newMan[0].age, newMan[0].cat, newMan[0].dog, newMan[0].loyalty, newMan[0].outdoorsy, newMan[0].indoorsy, newMan[0].sports, newMan[0].movies, newMan[0].foodie, newMan[0].travel)
    console.log(newGuy);
    grabInfo();
    grabCompatable();
    
    console.log("this works in here!!!!!" + Bff);
  
}
// pushTolist();


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
