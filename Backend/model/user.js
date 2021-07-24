const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female','others']
    },
    phone: {
        type: Number,
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

//create new candidate registraction
module.exports.createUser = async function(newCandidate, callback){
    const salt = await bcrypt.genSaltSync(10)
    newCandidate.password = await bcrypt.hashSync(newCandidate.password,salt)
    newCandidate.save(callback)
}

//check is user exist or not using phone no
module.exports.getUserByPhone = function(phone_no, callback){
    const query = {phone: phone_no}
    User.findOne(query, callback);
}

//check is user exist or not using mail id
module.exports.getUserByMail = function(mail, callback){
    const query = {mailId: mail}
    User.findOne(query, callback);
}

//Decrypt password or compare password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};