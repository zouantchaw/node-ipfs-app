const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const ipfsClient = require('ipfs-http-client');
const fs = require('fs')

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
  // parse post request
  const file = req.files.file
  const fileName = req.body.fileName;
  const filePath = 'files/' + fileName

  // download file to server
  file.mv(filePath, async (err) => {
    if (err) {
      console.log('Error: failed to download file');
      return res.status(500).send(err);
    }

    const fileHash = await addFile(fileName, filePath);
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });

    res.render('upload', { fileName, fileHash })
  })
})

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath)
  const fileAdded = await ipfs(add{path: fileName, content: file});
  const fileHash = fileAdded[0].hash;

  return fileHash;
}