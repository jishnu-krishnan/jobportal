const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../model/user')
const Company = require('../model/company')
const About = require('../model/userDetails')
const Application = require('../model/applications')
const Vacancy = require('../model/vacancy')

require('dotenv').config();
const secret = process.env.JWT_KEY;
const date = new Date()

router.get('/', (req, res, next) => {
    User.find({},(err,no)=>{
        res.json(no)
    })
   //res.send('Home');
});

// @desc registration url for candidate user
// @route post /users/register/
router.post('/register/', function(req, res, next) {
    const mail = req.body.mail;
    let newCandidate = new User({
        username: req.body.username,
        gender: req.body.gender,
        phone: req.body.phone,
        mailId: req.body.mail,
        password: req.body.password,
        expirence: 'Not Specified',
        qualification: 'Not Specified',
        skillset: 'Not Specified',
        createdAt: date.toDateString()
    });
    User.getUserByMail(mail, (err, user)=> {
        if(err) throw err;
        if(user){
            res.json({success:false, msg:'Already registered'})
        }else{
            User.createUser(newCandidate,(err,user)=>{
                if(err){
                    res.json({success:false, msg:err})
                }else{
                    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                        expiresIn: 604800 // one week
                    });
                    res.json({success: true, token: 'JWT '+token,
                        user:{
                            id: user._id,
                            name: user.username,
                            skillset:user.skillset,
                            qualification:user.qualification,
                            type:'candidate'
                        }
                    }).status(200)
                }
            })
        }
    })
});


// @desc login url for normal user 
// @route get /users/login/
router.post('/login/', (req, res, next) => {
    const phone_no = req.body.username;
    const password = req.body.password;
    const mail = req.body.username;
    const companyName = req.body.username;
    Company.getCompanyByName(companyName, (err, company)=> {
        if(!company){
            User.getUserByPhone(phone_no, (err, user)=> {
                if(!user){
                    User.getUserByMail(mail, (err, user)=> {
                        if(err) throw err;
                        if(!user){
                            res.json({success:false, msg:'Username Not found'})
                        }else{
                            User.comparePassword(password, user.password, (err, isMatch) => {
                                if(err) throw err;
                                if(isMatch){
                                    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                                        expiresIn: 604800 // one week
                                    });
                                    res.json({
                                        success: true, token: 'JWT '+token,
                                        user:{
                                            id: user._id,
                                            name: user.username,
                                            skillset:user.skillset,
                                            qualification:user.qualification,
                                            type:'candidate'
                                        }
                                    });
                                }else{
                                    return res.json({success: false, msg: 'Wrong Password'});
                                }
                            });
                        }
                    })
                }else{
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch){
                            const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                                expiresIn: 604800 // one week
                            });
                            res.json({
                                success: true, token: 'JWT '+token,
                                user:{
                                    id: user._id,
                                    name: user.username,
                                    skillset:user.skillset,
                                    qualification:user.qualification,
                                    type:'candidate'
                                }
                            });
                        }else{
                            return res.json({success: false, msg: 'Wrong Password'});
                        }
                    });
                }
            })
        }else{
            Company.comparePassword(password, company.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(company.toJSON(), process.env.JWT_KEY, {
                        expiresIn: 604800 // one week
                    });
                    res.json({
                        success: true, token: 'JWT '+token,
                        user:{
                            id: company._id,
                            name: company.companyName,
                            type:'company'
                        }
                    });
                }else{
                    return res.json({success: false, msg: 'Wrong Password'});
                }
            });
        }
    })
});

// @desc Add more infoamtion about candidate
// @route post /users/profile/
// router.post('/profile/', function(req, res, next) {
//     let newInfo = new About({
//         user: req.body.user,
//         expirence: req.body.expirence,
//         qualification: req.body.qualification,
//         skillset: req.body.skillset,
//     });
//     About.addInfo(newInfo,(err,user)=>{
//         if(err){
//             res.json({success:false, msg:err})
//         }else{
//             res.json(user).status(200)
//         }
//     })
// });

// @desc Add more infoamtion about candidate
// @route post /users/profile/:id
router.put('/profile/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id,{$set:req.body},(err,user)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            User.findById(req.params.id,(err,data)=>{
                if(data){
                    res.json({success:true, 
                        user:{
                            id: data._id,
                            name: data.username,
                            skillset:data.skillset,
                            qualification:data.qualification,
                            type:'candidate'
                        }
                    }).status(200)
                }
            })
            
        }
    })
});

router.post('/jobs', function(req, res, next) {
    const skill = req.body.skill;
    const qul = req.body.qul;
    Vacancy.findJob(skill,qul,(err,user)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json(user).status(200)
        }
    })
});

router.get('/all/jobs', function(req, res, next) {
    Vacancy.findAllJob((err,user)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json(user).status(200)
        }
    })
});

// @desc Add new application to a vacancy
// @route post /users/request/
router.post('/request', function(req, res, next) {
    let newApplication = new Application({
        user: req.body.user,
        company: req.body.company,
        vacancyPost: req.body.postid,
        createdAt: date.toDateString()
    });
    Application.sendApplication(newApplication,(err,app)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json(app).status(200)
        }
    })
});


router.get('/request/:id', function(req, res, next) {
    Application.findAppliedJobs(req.params.id,(err,post)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json({success:true, post}).status(200)
        }
    })
});
module.exports = router;