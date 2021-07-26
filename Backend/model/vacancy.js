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
        //enum:['fresher','1-3','4-6','7-10','10-above']
    },
    jobTitle: {
        type: String,
        required:true
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
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        //default: Date.now()
    }
});

const Vacancy = module.exports = mongoose.model('Vacancy', VacancySchema);

//create new job vacancy post
module.exports.createVacancyPost = function(newPost, callback){
    newPost.save(callback)
}

//find vacancy post using company id
module.exports.findApplicationId = function(cid, callback){
    
    const query = {company:cid}
    Vacancy.find(query,callback).sort({createdAt:'desc'})
}
module.exports.findAllJob = function(callback){
    Vacancy.find(callback).populate('company').sort({createdAt:'desc'})
}

//find matching job
module.exports.findJob = function(skill,qul,callback){
    Vacancy.aggregate([
        {
            $match: {
                $or: [{"skillset":skill},
                    {"qualification":qul}]
            }
        }
    ]).exec(function(err,data){
        Vacancy.populate(data,{path:'company'},callback)
    })
}