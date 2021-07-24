const mongoose = require('mongoose');

const VacancySchema = mongoose.Schema({
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    requiredExpirence: {
        type:String,
        required:true,
        enum:['fresher','1-3','4-6','7-10','10-above']
    },
    qualification: {
        type: String,
        required:true
    },
    vacancies:{
        type: String,
        default:'Not specified'
    },
    package: {
        type: String,
        default:'Not specified'
    },
    skillset: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Vacancy = module.exports = mongoose.model('Vacancy', VacancySchema);

//create new job vacancy post
module.exports.createVacancyPost = function(newPost, callback){
    newPost.save(callback)
}