const express = require('express');
const registrationRoutes = express.Router();
// var bcrypt = require('bcrypt');
var multer = require('multer');
let regModel = require('../model/users-model');
let projectModel = require('../model/projectModel');

// ------------------- MULTER IMAGE STORING CODE --------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})
// -----------------------------------------------------------------------------------------------

registrationRoutes.route("/login").post(function (req, res) { 
    var User = regModel;
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';

    projectModel.findOne({ 'status': 1 , 'projectId': req.body.projectId}).exec(function (err, projectData) {
        //  { $or:[ {'email':req.body.email}, {'phone':req.body.phone} ]}
        // console.log(req.body);
        if (req.body.email != '') {
           // console.log("if");
            User.findOne({ 'email': req.body.email , 'projectId': req.body.projectId}).then(
                (result) => {

                    if (!result) {
                        return res.json({ 'message': "Incorrect email", 'isUserExist': false });
                    }
                    else {
                        // if (!bcrypt.compareSync(req.body.password, result.password)) {
                        //     return res.json({ 'message': "Incorrect password", 'isUserExist': false });
                        // }
                        var imageFile = "";
                        if (result.user_image != '') {
                            var imageFile = fullUrl + result.user_image;
                        }

                        const data = { 'id': result.id, 'email': result.email, 'name': result.name };
                        return res.json({ 'data': data, 'imageFile': imageFile, 'isUserExist': true });
                    }
                }).catch(err => {
                    res.status(500).send(err);
                });
        }
        else if (req.body.phone != '') {
         //   console.log("else if 1");
            User.findOne({ 'phone': req.body.phone , 'projectId': req.body.projectId}).then(
                (result) => {
                    if (!result) {
                        return res.json({ 'message': "Incorrect phone", 'isUserExist': false });
                    }
                    else {
                        // if (!bcrypt.compareSync(req.body.password, result.password)) {
                        //     return res.json({ 'message': "Incorrect password", 'isUserExist': false });
                        // }

                        var imageFile = "";
                        if (result.user_image != '') {
                            var imageFile = fullUrl + result.user_image;
                        }

                        const data = { 'id': result.id, 'email': result.email, 'name': result.name };
                        return res.json({ 'data': data, 'imageFile': imageFile, 'isUserExist': true });
                    }
                }).catch(err => {
                    res.status(500).send(err);
                });
        }
        else if (req.body.name != '') {
         //   console.log("else if 2");
          //  console.log(req.body);
          //  console.log(req.body.name);
            User.findOne({ 'name': req.body.name , 'projectId': req.body.projectId}).then(
                (result) => {
                  //  console.log(result);
                    if (!result) {
                        return res.json({ 'message': "Incorrect username", 'isUserExist': false });
                    }
                    else {
                      //  console.log(req.body.password);
                        // if (!bcrypt.compareSync(req.body.password, result.password)) {
                        //     return res.json({ 'message': "Incorrect password", 'isUserExist': false });
                        // }

                        var imageFile = "";
                        if (result.user_image != '') {
                            var imageFile = fullUrl + result.user_image;
                        }
                      //  console.log(result);
                        const data = { 'id': result.id, 'email': result.email, 'name': result.name };
                        return res.json({ 'data': data, 'imageFile': imageFile, 'isUserExist': true });
                    }
                }).catch(err => {
                    res.status(500).send(err);
                });
        }

    })
});

registrationRoutes.route("/getloggeduser").post(function (req, res) {
    var User = regModel;
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';
  //  console.log("getloggeduser");
 //   console.log(req.body);
    User.findOne({ email: req.body.email , projectId: req.body.projectId}).then(
        (result) => {
          //  console.log(result);
            var imageFile = "";
            if (result.user_image != '') {
                var imageFile = fullUrl + result.user_image;
            }

            const data = { 'id': result.id, 'email': result.email, 'name': result.name };
            return res.json({ 'data': data, 'imageFile': imageFile });

        }).catch(err => {
            res.status(500).send(err);
        });
});

registrationRoutes.post('/getusers', function (req, res) {
    var User = regModel;
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';
    var activeProjectUsers = [];

    User.find({ 'isAdmin': 0, 'status': { $gt: 0 } , 'projectId': req.body.projectId}, { 'password': false }).populate('projectId').exec(function (err, users) {
        if (err) res.send("error");
        if (!users) res.send(null);
        for (var i = 0; i < users.length; i++) {
            if (users[i].user_image != "")
                users[i]['userImageLink'] = (fullUrl + users[i].user_image);

            if (users[i].projectId != null && users[i].projectId.status == 1)
                activeProjectUsers.push(users[i]);
        }
        res.send(activeProjectUsers);
    });
});


registrationRoutes.post('/adduser', upload.single('file'), (req, res) => {

    var userData = JSON.parse(req.body.userData);
    let userModel = regModel;
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';
    var activeProjectUsers = [];

    userModel.find({ 'email': userData.email, 'projectId': req.body.projectId}, { 'email': true }, function (err, result) {

        if (result.length == 0) {
            projectModel.findOne({ status: 1 }, { projetId: true }).exec(function (err, resultpid) {
                userData.projectId = resultpid._id;
                let newUserModel = new regModel(userData);

                newUserModel.save()
                    .then(reg => {
                        var User = regModel;

                        User.find({ 'isAdmin': 0, 'status': { $gt: 0 }, 'projectId': req.body.projectId}, { 'password': false }).populate('projectId').exec(function (err, users) {
                            for (var i = 0; i < users.length; i++) {
                                if (users[i].user_image != "")
                                    users[i]['userImageLink'] = (fullUrl + users[i].user_image);

                                if (users[i].projectId.status == 1)
                                    activeProjectUsers.push(users[i]);
                            }
                            res.send({ 'message': 'user added successfully', 'status': true, 'users': activeProjectUsers });
                        });
                    })
                    .catch(err => {
                        res.status(400).send({ 'message': "unable to save in database", 'status': false });
                    });
            })
        }
        else {
            res.send({ 'message': 'email already exist', 'status': false, 'users': null });
        }
    }).catch(err => {
        res.send({ 'message': 'operation failed', 'status': false });
    });
});

registrationRoutes.post('/updateuser', upload.single('file'), (req, res) => {
    var User = regModel;
    var newUserModel = new regModel(JSON.parse(req.body.userData));
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';
    var activeProjectUsers = [];

   // bcrypt.hash(newUserModel.password, 10, function (err, hash) {
     //   newUserModel.password = hash;

        User.findByIdAndUpdate(newUserModel._id, { $set: newUserModel }).then(
            (result) => {
                var User = regModel;
                User.find({ 'isAdmin': 0, 'status': { $gt: 0 }, 'projectId': req.body.projectId }, { 'password': false }).populate('projectId').exec(function (err, users) {

                    for (var i = 0; i < users.length; i++) {
                        if (users[i].user_image != "")
                            users[i]['userImageLink'] = (fullUrl + users[i].user_image);

                        if (users[i].projectId.status == 1)
                            activeProjectUsers.push(users[i]);
                    }
                    res.send({ 'message': 'user data updated successfully', 'status': true, 'users': activeProjectUsers });
                });

            }).catch(err => {
                res.status(400).send({ 'message': "update failed", 'status': false });
            });
  //  });
});


registrationRoutes.post('/deleteuser', function (req, res) {
    var User = regModel;
    const userIdToBeDeleted = req.body.userId;
    var fullUrl = req.protocol + '://' + req.get('host') + '/profilePhotos/';
    var activeProjectUsers = [];

    User.findByIdAndUpdate(userIdToBeDeleted, { 'status': 0 , 'projectId': req.body.projectId}).then(
        (result) => {
            if (!result) {
                res.status(400).send({ 'message': "unable to delete user", 'status': false });
            }

            User.find({ 'isAdmin': 0, 'status': { $gt: 0 }, 'projectId': req.body.projectId }, { 'password': false }).populate('projectId').exec(function (err, users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].user_image != "")
                        users[i]['userImageLink'] = (fullUrl + users[i].user_image);

                    if (users[i].projectId.status == 1)
                        activeProjectUsers.push(users[i]);
                }
                res.send(activeProjectUsers);
            })
        }
    )
});



module.exports = registrationRoutes;
