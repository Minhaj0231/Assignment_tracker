const mongoose = require('mongoose');

const  User = require('./User');

const Schema = mongoose.Schema;


const StudentScehma = new Schema({
    
    student:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    readingTime: {
        type: Number,
    },
    image: {
        type: String
    }
})

const AssignmentSchema = new Schema({


    title:{
        type: String,
        required: true
    },
    assignment: {
        type: String,
        required: true

    },
    end_date: {
        type: Date,
        required: true

    },

    teacher: {
        type: String,
        required: true,
    },

    Students:[StudentScehma]

});




module.exports = mongoose.model('Assignments', AssignmentSchema);
