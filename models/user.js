var mongoose = require('mongoose');
var bcrypt  = require('bcrypt-nodejs');
var UsersSchema = mongoose.Schema({

    firstName: {
        type : String,
        required: true
    },

    lastName: {
        type : String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

    password: {
        type : String,
        required: true
    },
    type :{
        type: String,
        required : true
    }
});
UsersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
UsersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User', UsersSchema);