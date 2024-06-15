var mongoose = require('mongoose');

var studySchema = mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    dateTime: {
        type: Date,
        default: Date.now
      },
    reading: {
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Study', studySchema);