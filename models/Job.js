var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
  title:{type:String},
  description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
  Job.find({}).exec(function(err, collection){
    if(collection.length == 0) {
      Job.create({title:'Brewmaster', description:'Making tasty frosty beverages'});
      Job.create({title:'Chalk Eraser Clapper', description:'dust masks provided'});
      Job.create({title:'UPS [Wo]man', description:'The real St. Nicks'});
    }
  })
}
