var mongoose = require('mongoose')

var Room = mongoose.model('Room', {
    name: String,
    title:String,
    event_color: String
});


mongoose.model('Room', Room);