var express = require('express');
var jobModel = require('./models/Job');
var jobData = require('./job-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
  jobData.findJobs().then(function(collection) {
    res.send(collection); 
  })
});

app.get('*', function(req, res) {
  res.render('index');
});

jobData.connectDB('mongodb://admin:pack3rs@ds047762.mongolab.com:47762/job-listing')
.then(function() {
  console.log('mongoose connected');
  jobData.seedJobs();
});

app.listen(process.env.PORT || 3000);
