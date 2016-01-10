var mongoose = require('mongoose')

var Event = mongoose.model('Event', {
    user:String,
    title: String,
    start: String,
    end: String,
    resourceId: String,
    belongs: String
});

mongoose.model('Event', Event);