const mongoose = require('mongoose');

const UserDetailedSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expirence: {
        type:String,
        // enum:['fresher','1-3','4-6','7-10','10-above']
    },
    qualification: {
        type: String,
        required:true
    },
    skillset: {
        type: String
    }
});

const UserDetails = module.exports = mongoose.model('UsedDetails', UserDetailedSchema);

//add more informations about candidate
module.exports.addInfo = function(newInfo, callback){
    newInfo.save(callback)
}