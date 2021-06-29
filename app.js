//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");


const items = ["Code", "Study", "Workout"];

const workItems = [];

const familyItems = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    let day = date.getDate()
    res.render("list", {kindOfList:day, newListItem: items})
});

app.get("/work", (req, res) =>{
    res.render("list", {kindOfList: "Work", newListItem: workItems})
})

app.get("/family", (req, res) =>{
    res.render("list", {kindOfList: "Family", newListItem: familyItems})
})

app.get("/about", (req, res) =>{
    res.render("about")
})

app.post("/", (req, res) =>{
    let item = req.body.newItem;
  
      if(req.body.button === "Work"){
          workItems.push(item);
          res.redirect("/work")
      }else if(req.body.button === "Family"){
          familyItems.push(item);
          res.redirect("/family")
      }else{
          items.push(item)
          res.redirect("/")
      }
  })

app.listen(3000, () =>{
    console.log("Server is started at port 3000")
})