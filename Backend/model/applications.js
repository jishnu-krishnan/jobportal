const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vacancyPost: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Application = module.exports = mongoose.model('Application', ApplicationSchema);

//create new application for a vacancy
module.exports.sendApplication = function(newApplication, callback){
    newApplication.save(callback)
}