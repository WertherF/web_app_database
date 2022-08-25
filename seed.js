const { faker } = require('@faker-js/faker');

const mysql = require('mysql');
 
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

let data = [];

for (let i = 0; i<500; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	]);
}

let q = 'INSERT INTO users (email, created_at) VALUES ?'

connection.query(q, [data], function (error, results, fields) {
   if (error) throw error;
   console.log(error);
	console.log(results);
});
connection.end();