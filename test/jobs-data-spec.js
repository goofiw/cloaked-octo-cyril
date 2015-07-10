var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require('bluebird');
var jobData = require('../job-data.js');

function resetJobs() {
  return new Promise( function(resolve, reject) {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
}


describe('get jobs', function(){

  var jobs;

  before(function(done){
    jobData.connectDB('mongodb://admin:pack3rs@ds047762.mongolab.com:47762/job-listing')
  .then(resetJobs)
  .then(jobData.seedJobs)
  .then(jobData.findJobs)
  .then(function(collection) {
    jobs = collection;
    done();
  });

  it("should never be empty since jobs are seeded", function(done){
      expect(jobs.length).to.be.at.least(1);
    });
  });

  it("should have a job with a title", function(){
    expect(jobs[0].title).to.not.be.empty
  });


  it("should have a job with a description", function(){
    expect(jobs[0].description).to.not.be.empty
  });
});
