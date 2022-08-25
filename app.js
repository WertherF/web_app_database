const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")
 
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

app.get("/", function(req, res){
	let q1 = "SELECT COUNT(*) AS count FROM users"
	connection.query(q1, function(err, results){
		if(err) throw err;
		let count = results[0].count;
		res.render("home", {count: count})		
	})
});

app.post("/register", function(req,res){
	let person = {email: req.body.email};
	
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if(err) throw err;
		res.redirect("/")
	})
	
})

app.get("/joke", function(req,res){
	let joke = "Knock knock...";
	res.send(joke);
})

app.get("/random_num", function(req,res){
	let num = Math.floor((Math.random() * 10)+1);
	res.send(num+'');
})

app.listen(3000, function(){
	console.log('Server running on port 3000.')
});