var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var student = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    rollno: {
        type: String,
        required: [true, 'rollno is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    }
});
var StudetModel = mongoose.model('student', student);
module.exports = StudetModel;
