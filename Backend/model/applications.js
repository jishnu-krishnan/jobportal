const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vacancyPost: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true
    },
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt: {
        type: Date,
        //default: Date.now()
    }
});

const Application = module.exports = mongoose.model('Application', ApplicationSchema);

//create new application for a vacancy
module.exports.sendApplication = function(newApplication, callback){
    newApplication.save(callback)
}

//find applied candidate using vacancy id
module.exports.findApplications = function(cid, callback){
    const query = {vacancyPost:cid}
    Application.find(query,callback).populate('vacancyPost').populate('user').sort({createdAt:'desc'})
}

//find applied candidate using vacancy id
module.exports.findAppliedJobs = function(uid, callback){
    const query = {user:uid}
    Application.find(query,callback).populate('vacancyPost').populate('user').populate('company').sort({createdAt:'desc'})
}
