const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3000;
jsonPath = __dirname + '/profiles.json';

app.use(express.static(__dirname));

//Starting the server
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/lab02.html'));
});
app.listen(process.env.port || 3000);

//load artists
app.get('/loadProfiles', function(req, res) {
  var artist = null;
  fs.readFile(jsonPath, (err, data) => {
    if (err) {throw err};
    artist = JSON.parse(data);
    console.log(artist);
    res.json(artist);
  });
});

//Reading from the file
'use strict';
fs.readFile(jsonPath, (err, data) => {
    let artistArray = JSON.parse(data);
    console.log(artistArray);
});
console.log('This is after the read call');

//Reading and writing to the file
app.post('/profiles', function(req, res) {
  var name = req.body;
  // console.log(name);
  var element = JSON.parse(JSON.stringify(name));
  console.log(element);
  fs.readFile(jsonPath, (err, data) => {
      let artistArray = JSON.parse(data);
      element["id"] = artistArray.length;
      artistArray.push(element);
      console.log(artistArray);
      fs.writeFile(jsonPath, JSON.stringify(artistArray), function(err){
        if (err) {throw err}
      });
  });
  res.end("yes");
});
console.log('This is after the read/write call');

//Deleting
app.post('/delete', function(req, res) {
    var name = req.body;
    var element = JSON.parse(JSON.stringify(name));
    fs.readFile(jsonPath, (err, data) => {
        if (err) throw err;
        let artistArray = JSON.parse(data);
        artistArray.splice(parseInt(element.ind), 1);
        for(let i = 0; i < artistArray.length; i++){
            artistArray[i].id = i;
        }
        console.log(artistArray);
        fs.writeFile(jsonPath, JSON.stringify(artistArray), function(err) {
            if (err) { throw err }
        });
    });
});
