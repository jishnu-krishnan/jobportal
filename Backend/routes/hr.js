const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Company = require('../model/company')
const User = require('../model/user')
const Vacancy = require('../model/vacancy')
const Application = require('../model/applications')

require('dotenv').config();
//const secret = process.env.JWT_KEY;
const date = new Date()

router.get('/', (req, res, next) => {
    Company.find({},(err,no)=>{
        res.json(no)
    })
   //res.send('Home');
});

// @desc registration url for candidate user
// @route post /hr/register/
router.post('/register/', function(req, res, next) {
    const name = req.body.name;
    let newCompany = new Company({
        companyName: req.body.name,
        location: req.body.loc,
        industryType: req.body.industryType,
        password: req.body.password
    });
    Company.getCompanyByName(name, (err, company)=> {
        if(company){
            return res.json({success: false, msg: 'Already registered'});
        }else{
            Company.createCompany(newCompany,(err,company)=>{
                if(err){
                    res.json({success:false, msg:err})
                }else{
                    const token = jwt.sign(company.toJSON(), process.env.JWT_KEY, {
                        expiresIn: 604800 // one week
                    });
                    res.json({success: true, token: 'JWT '+token,
                        user:{
                            id: company._id,
                            name: company.companyName,
                            type:'company'
                        }
                    }).status(200)
                }
            })
        }
    })
});

// @desc login url for normal user 
// @route get /users/login/
// router.all('/login/', (req, res, next) => {
//     const name =req.body.username;
//     const password = req.body.password;
//     Company.getCompanyByName(name, (err, company)=> {
//         if(!company){
//             return res.json({success: false, msg: 'Company Name not found'});
//         }else{
//             Company.comparePassword(password, company.password, (err, isMatch) => {
//                 if(err) throw err;
//                 if(isMatch){
//                     const token = jwt.sign(company.toJSON(), process.env.JWT_KEY, {
//                         expiresIn: 604800 // one week
//                     });
//                     res.json({
//                         success: true, token: 'JWT '+token,
//                         company:{
//                             id: company._id,
//                             name: company.name
//                         }
//                     });
//                 }else{
//                     return res.json({success: false, msg: 'Wrong Password'});
//                 }
//             });
//         }
//     })
// });

// @desc Job posting api
// @route post /hr/post/create/
router.post('/post/create/', function(req, res, next) {
    let newPost = new Vacancy({
        company: req.body.company,
        jobTitle:req.body.title,
        qualification: req.body.qualification,
        vacancies: req.body.vacancies,
        package: req.body.package,
        skillset: req.body.skillset,
        requiredExpirence: req.body.expirence,
        description:req.body.description,
        createdAt: date.toDateString()
    });
    Vacancy.createVacancyPost(newPost,(err,post)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json({success:true, post}).status(200)
        }
    })
});

// @desc get applied candidate list
// @route get /hr/get/applications/:id {company id}
router.get('/get/applications/:id', function(req, res, next) {
    // Vacancy.findApplicationId(req.params.id,(err,post)=>{
    //     if(!post){
    //         res.json({success:false, msg:err})
    //     }else{
    //         //res.json({success:true, post})
    //         console.log(post)
    Application.findApplications(req.params.id,(err,vacancy)=>{
        if(!vacancy){
            res.json({success:false, msg:'not found'})
        }else{
            res.json({success:true, vacancy})
        }
    })
    //     }
    // })
});

router.get('/get/vacancy/:id', function(req, res, next) {
    Vacancy.findApplicationId(req.params.id,(err,vacancy)=>{
        if(!vacancy){
            res.json({success:false, msg:err})
        }else{
            res.json({success:true, vacancy})
        }
    })
})


router.delete('/post/delete/:id', function(req, res, next) {
    Vacancy.findOneAndRemove(req.params.id,(err,vacancy)=>{
        if(!vacancy){
            res.json({success:false, msg:err})
        }else{
            res.json({success:true, vacancy})
        }
    })
})
module.exports = router;