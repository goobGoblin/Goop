/**
 * @created : 2024 04 15
 * @author  : Nicholas (Nick) Nguyen, Chinh (Aki) Nguyen, Zai Erb
 * @version : 0.0.1
 * @changes : 0.0.1 - Created the file
 * 
 * @TODO    : 2024 04 15 
 *            
 */

const express = require('express');
const db = require('./database');
const app = express();
const port = 8000; // localhost:8000

app.get('/artists', (req, res) => {
	db.query('SELECT * FROM Artists', (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

