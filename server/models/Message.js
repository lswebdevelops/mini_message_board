const mongoose  = require('mongoose') ;

const Schema = mongoose.Schema

const MessageSchema  = new Schema( {
    username:  {
        type: String,
        required: true,
    }, 
    message: {
        type: String,
        required: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema)