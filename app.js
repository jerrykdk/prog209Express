var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))

app.dataArray = [];

//app.areaArray = [];

// just one "site" with 2 pages, / and progress

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// progress page 
app.get('/progress', function(req, res) {
    res.render('pages/progress', {
        
        dataArray: app.dataArray
      
   //     areaArray: app.areaArray
    });
});



// upLoadData page 
// sending a get with 1 param
// http://localhost:3000/addTrip?id=2&date=1941
app.get('/addTrip', function(req, res) {
    let id = req.param('id');
    let date = req.param('date');
    if(id != null){
        let aVisit = {
            id: id,
            date: date
        }
    app.dataArray.push(aVisit);
    }
    res.render('pages/addTrip', { 
        dataArray: app.dataArray,
     //   areaArray: app.areaArray
     });
  });



// history page 
app.get('/history', function(req, res) {
    res.render('pages/history', {  // pass the data to the page renderer
        dataArray: app.dataArray
    });
});


// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
