// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// we need to create a model using it
var Comments = mongoose.model('Comment', commentSchema);

// make this available to our Node applications
module.exports = Comments;
