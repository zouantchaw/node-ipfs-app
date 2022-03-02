const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const ipfsClient = require('ipfs-http-client');

const ipfs = new ipfsClient({ host: 'localhost', port: '5001', protocol: 'http'});
const app = express()

// Configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded(extended: true));
app.use(fileUpload());

// Routes
app.get('/', (req, res) => {
  res.render('home');
})

app.post('/upload', (req, res) => {
  
})