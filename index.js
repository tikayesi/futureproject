var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password:'',
	database:'mahasiswa'
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('berhasil')
	else
		console.log('gagal' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('express server is running in this port'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/mahasiswa', function (req, res) {
	var params = req.params

	mysqlConnection.query('SELECT * FROM mahasiswa', function (error, results, fields) {
	  if (error) throw error;
	  
	  res.send(results);
	});
})

app.get('/mahasiswa/:id', function (req, res) {
	var params = req.params

	mysqlConnection.query('SELECT * FROM mahasiswa WHERE id = ?', [params.id], function (error, results, fields) {
	  if (error) throw error;
	  
	  res.send(results[0]);
	});
})

app.post('/mahasiswa', function (req, res) {
	var body = req.body

	{
  		mysqlConnection.query('INSERT INTO mahasiswa SET npm = ?, nama = ?, alamat = ?', [body.npm, body.nama, body.alamat ],function (err, rows, fields) {
		  if (err) throw err

		  res.json({'status' : true})
		})
	  } 
	})

app.put('/mahasiswa/:id', function (req, res){
	var params = req.params
	var body = req.body

	{
		mysqlConnection.query('UPDATE mahasiswa SET npm = ?, nama = ?, alamat = ? WHERE id= ?', [body.npm, body.nama, body.alamat, params.id], function (err, rows, fields){
			if (err) throw err

				res.json({'status' : true})
		})
	}

})

app.delete('/mahasiswa/:id', function (req, res){
	var params = req.params
	mysqlConnection.query('DELETE FROM mahasiswa WHERE id = ?', [params.id], function (err, rows, fields) {
			  if (err) throw err

			  res.json({'status' : true})
			})
})