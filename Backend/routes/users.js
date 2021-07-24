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
    let newCandidate = new User({
        username: req.body.username,
        gender: req.body.gender,
        phone: req.body.phone,
        mailId: req.body.mail,
        password: req.body.password,
        createdAt: date.toDateString()
    });
    User.createUser(newCandidate,(err,user)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json(user).status(200)
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
                            res.json({success:false, msg:'Not found'})
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
                                            name: user.name
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
                                    name: user.name
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
                        company:{
                            id: company._id,
                            name: company.name
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
router.post('/profile/', function(req, res, next) {
    let newInfo = new About({
        user: req.body.user,
        expirence: req.body.expirence,
        qualification: req.body.qualification,
        skillset: req.body.skillset,
    });
    About.addInfo(newInfo,(err,user)=>{
        if(err){
            res.json({success:false, msg:err})
        }else{
            res.json(user).status(200)
        }
    })
});


// @desc Add new application to a vacancy
// @route post /users/request/
router.post('/request/', function(req, res, next) {
    let newApplication = new Application({
        user: req.body.user,
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
module.exports = router;