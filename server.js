var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
  mongoose.model('Job').find({}).exec(function(err, collection) {
    res.send(collection); 
  })
});

app.get('*', function(req, res) {
  res.render('index');
});

mongoose.connect('mongodb://admin:pack3rs@ds047762.mongolab.com:47762/job-listing');

var con = mongoose.connection;

con.once('open', function(){
  console.log('mongoose connected');
  jobModel.seedJobs();
});

app.listen(process.env.PORT || 8080);
