const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const app = express();

const path = require('path');
const path_joined_index = path.join(__dirname, 'app/dist/index.html');

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});
app.use(cors());

app.use(express.static(path.join(__dirname, 'app/dist')));
app.use('/api', require('./api/index'));

const http = require('http').createServer(app);
const chalk = require('chalk');
const port = process.env.PORT || 3000;
http.listen(port, () => {
	console.log(`Listening on port ${port} ...`);
});

app.get('*', (req, res) => {
	res.sendFile(path_joined_index);
});
