var mongoose = require('mongoose');
var event = require('./event');
var room = require('./room');

mongoose.connect('mongodb://127.0.0.1/booking');
var db = mongoose.connection;

db.on('open',function(err){
  console.log('opend')
})

db.on('error',function(error){
  console.log(error)
})

exports.Event = mongoose.model('Event')
exports.Room = mongoose.model('Room')