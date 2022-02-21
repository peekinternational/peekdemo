const express = require('express');
var nodemailer = require('nodemailer');
const projectsRouter = express.Router();

let userModel = require('../model/users-model');
let projectModel = require('../model/projectModel')

var transporter = null;
var mailOptions = {};

let mailerConfig = {
    host: "smtpout.secureserver.net",
    secureConnection: true,
    port: 465,
    auth: {
        user: "hello@chatto.jp",
        pass: "Chatto123#"
    }
};

transporter = nodemailer.createTransport(mailerConfig);

projectsRouter.route('/register-user').post(function (req, res) {
    var userData = req.body;
    // console.log("reg: ", req.body);
    let newUserModel = new userModel(userData);
    // transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'personaluse646@gmail.com',
    //         pass: 'tdspgfhrlvcyymhs'
    //     }
    // });

    userModel.findOne({
        $or: [
            // {
            //     $and: [{ "name": userData.name }, { "name": { $ne: "" } }, { "name": { $ne: null } }],
            // },
            {
                $and: [{ "email": userData.email }, { "email": { $ne: "" } }, { "email": { $ne: null } }]
            }
            // {
            //     $and: [{ "phone": userData.phone }, {"phone": { $ne: "" }}, {"phone": { $ne: null }}]
            // }
        ]

        , 'projectId': req.body.projectId
    })
        .lean().exec(function (err, result) {
            if (!result) {
    newUserModel.save()
        .then(regUserData => {

            let projectLink = "";
            let projectName = "";
            let projectVerificationWay = 0; // will be used later

            if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") {
                projectLink = "https://chat.chatto.jp";
                projectName = "Chatto";
                projectVerificationWay = 1;
            }

            mailOptions = {
                from: 'hello@chatto.jp',
                to: regUserData.email,
                subject: 'Verify your email',
                text: projectName,
                html:
                    `<p><b>Dear, ${regUserData.name} </b> we are glad that you are now a part of ${projectName} group but before going to connect the world, 
                                  we would like you to verify this email address by clicking below link` +
                    `<br>Click to verify: <a href='${projectLink}/login?verifyid=${regUserData._id}'>Verify</a></p>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                //else {
                //  console.log('Email sent: ' + info.response);
                //  }
            });
            userData["usCount"] = 0;
            userData["latestMsg"] = {};
            userData.latestMsg["message"] = "";

            res.send({ 'message': 'User added successfully', 'status': 1, 'users': userData });
        })
        .catch(err => {
            res.status(400).send({ 'message': "Unable to save in database", 'status': 2 });
        });
    }
    else
        res.send({ 'message': 'Username or email already exist', 'status': 0, 'users': null });
    })
})

projectsRouter.route('/registerProject').post(function (req, res) {
    var projectData = req.body;
    let newProjectModel = new projectModel(projectData);

    newProjectModel.save().then(result => {
       

        let newUserModel = new userModel({ 'userId': projectData.userId, 'projectId': res.projectId });
        newUserModel.save().then(result => {
            userModel.find({ 'isAdmin': 0, 'status': { $gt: 0 }, 'projectId': req.body.projectId }).populate('projects').exec(function (err, usersData) {
                (err) => res.send(err);

                res.send(usersData);
            })
        }).catch(err => {
            res.send(err);
        })
    })
})

projectsRouter.route('/getProject/:projectId').get(function (req, res) {
    //   console.log('getProject');
    //  console.log(req.params.projectId);
    projectModel.findOne({ '_id': req.params.projectId, 'status': 1 })
        .lean().exec(function (err, projectData) {
            //   console.log(projectData);
            res.send(projectData);
        })
})

projectsRouter.route('/verify/:id').get(function (req, res) {
    //  console.log("verify: ", req.params );
    let verifyid = req.params.id;
    userModel.findOneAndUpdate({ '_id': verifyid }, { $set: { 'emailConfirm': 1 } }, { useFindAndModify: false })
        .then((result) => {
            //  console.log(result);
            res.json({ 'status': true, 'message': 'user email verification successful' });
        });
})

projectsRouter.route('/forgotpassword').post(function (req, res) {
    var token = Math.floor(Math.random() * 90000) + 10000;

    userModel.findOneAndUpdate({ 'email': req.body.email }, { $set: { 'token': token } }, { useFindAndModify: false })
        .then((result) => {
            if (result) {
                mailOptions = {
                    from: 'hello@chatto.jp',
                    to: req.body.email,
                    subject: 'Reset Your Password',
                    text: 'Chatto',
                    html:
                        `<p><b>Dear user, </b> you have requested to set a new password` +
                        `<br>Click here reset your password: <a href='https://chat.chatto.jp/login?token=${token}'>Reset</a></p>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    //else {
                    //    console.log('Email sent: ' + info.response);
                    // }
                });
            }
            else res.json({ 'status': false, 'message': 'something went wrong, please try again' });
        });
})

projectsRouter.route('/newpassword').post(function (req, res) {
    userModel.findOneAndUpdate({ '_id': req.body.id }, { $set: { 'password': req.body.newpassword } }, { useFindAndModify: false })
        .then((result) => {
            if (result) res.json({ 'status': true, 'message': 'password changed successfully' });
            else res.json({ 'status': false, 'message': 'password change failed' });
        });
})

projectsRouter.route('/checkemail').post(async function (req, res) {
    let emailExist = await userModel.findOne({ 'email': req.body.email, 'projectId': req.body.projectId }).lean().exec();
    if (emailExist) res.json({ 'status': true, 'message': 'email already exist' });
    else res.json({ 'status': false, 'message': 'email good to go' });
})

projectsRouter.route('/checkuserid').post(async function (req, res) {
    let useridExist = await userModel.findOne({ "name": { $regex: new RegExp(req.body.userId, "i") }, 'projectId': req.body.projectId }).lean().exec();
    if (useridExist) res.json({ 'status': true, 'message': 'userId already exist' });
    else res.json({ 'status': false, 'message': 'userId good to go' });
})

// register those users who are invited in Meeting-call through email only
// >>> NOT IN USE RIGHT NOW <<<
projectsRouter.route('/register-thridparty-user').post(async function (req, res) {
    var userData = req.body;
    let newUserModel = new userModel(userData);

    userModel.findOne({
        'projectId': req.body.projectId,
        $or: [
            {
                $and: [{ "name": userData.name }, { "name": { $ne: "" } }, { "name": { $ne: null } }],
            },
            {
                $and: [{ "email": userData.email }, { "email": { $ne: "" } }, { "email": { $ne: null } }]
            }
        ]
    })
        .lean().exec(function (err, result) {
            if (!result) {
                newUserModel.save().then(regUserData => {
                    //  let userExist = await userModel.findOneAndUpdate({ 'email': req.body.email, 'projectId': req.body.projectId }, { $set: { 'emailConfirm': 1 } }, { useFindAndModify: false }).lean().exec();
                    // if (userExist) 
                    res.send({ 'message': 'User added successfully', 'status': 1, 'userdata': userData });
                })
                    .catch(err => {
                        res.status(400).send({ 'message': "Unable to save in database", 'status': 2 });
                    });
            }
            else
                res.send({ 'message': 'Username or email already exist', 'status': 0, 'users': null });
        })
})


projectsRouter.route('/register-android-user').post(async function (req, res) {
    var userData = req.body;
    let newUserModel = new userModel(userData);

    // transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'hello@chatto.jp',
    //         pass: 'tdspgfhrlvcyymhs'
    //     }
    // });

    userModel.findOne({
        'projectId': req.body.projectId,
        $or: [
            {
                $and: [{ "email": userData.email }, { "email": { $ne: "" } }, { "email": { $ne: null } }]
            }
        ]
    })
        .lean().exec(function (err, result) {
            if (!result) {
                newUserModel.save().then(regUserData => {

                    mailOptions = {
                        from: 'hello@chatto.jp',
                        to: regUserData.email,
                        subject: 'Verify your email',
                        text: 'Chatto',
                        html:
                            `<p><b>Dear, ${regUserData.name} </b> we are glad that you are now a part of Chatto group but before going to connect the world, 
                              we would like you to verify this email address by clicking below link` +
                            `<br>Click to verify: <a href='https://chat.chatto.jp/login?verifyid=${regUserData._id}'>Verify</a></p>`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        //else {
                        //    console.log('Email sent: ' + info.response);
                        // }
                    });

                    res.send({ 'message': 'User added successfully', 'status': 1, 'userdata': regUserData });
                })
                    .catch(err => {
                        res.status(400).send({ 'message': "Unable to save in database", 'status': 2 });
                    });
            }
            else
                res.send({ 'message': 'Username or email already exist', 'status': 0 });
        })
})

projectsRouter.route('/savePersonalInfo').post(async function (req, res) {
    let userInfo = req.body;
    //  console.log(userInfo);
    let userData = await userModel.findOneAndUpdate({
        '_id': userInfo._id,
        'projectId': userInfo.projectId,
    },
        {
            $set: {
                'name': userInfo.name,
                'userId': userInfo.userId,
                'birth': userInfo.birth,
            }
        },
        { useFindAndModify: false }
    ).lean().exec();

    res.send({ 'message': 'user info updated', 'status': 1, 'userData': userData });
})


module.exports = projectsRouter;