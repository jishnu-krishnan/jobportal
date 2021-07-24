const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CompanySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    location: {
        type:String,
        required:true
    },
    industryType: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

module.exports.createCompany = async function(newCompany, callback){
    const salt = await bcrypt.genSaltSync(10)
    newCompany.password = await bcrypt.hashSync(newCompany.password,salt)
    newCompany.save(callback)
}

//check is user exist or not using company name
module.exports.getCompanyByName = function(name, callback){
    const query = {companyName: name}
    Company.findOne(query, callback);
}

//Decrypt password or compare password
module.exports.comparePassword = function(companyPassword, hash, callback) {
    bcrypt.compare(companyPassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};
