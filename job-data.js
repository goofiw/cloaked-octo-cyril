var mongoose = require('mongoose');
var Promise = require('bluebird');

var Job = mongoose.model('Job');

var jobs = [
    {title:'Brewmaster', description:'Making tasty frosty beverages'},
    {title:'Chalk Eraser Clapper', description:'dust masks provided'},
    {title:'UPS [Wo]man', description:'The real St. Nicks'}
    ]

var findJobs = function(query) {
  return Promise.cast(Job.find(query).exec());
}

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
  return findJobs({}).then(function(collection){
    if(collection.length == 0) {
      return Promise.map(jobs, function(job){
        return createJob(job); 
      })
    }
  })
}
