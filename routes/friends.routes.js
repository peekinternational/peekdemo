const express = require('express');
const friendsRouter = express.Router();
const mongoose = require('mongoose');

let userModel = require('../model/users-model');
let friendModel = require('../model/friendModel');
const notifiModel = require("../model/notificationModel");

// *** [[[ NOT IN USE ]]] ***
friendsRouter.route('/createfriend').post(function (req, res) {
   // console.log(req.body);
    userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }, { password: false })
        .lean().exec(function (err, userResult) {
            //   console.log(userResult);
            if (!userResult) res.send({ 'message': 'User Id doesnt exist', 'status': false });
            else {
                // check friendId and projectId exist in userTable or not
                userModel.findOne({ '_id': req.body.friendId, 'projectId': req.body.projectId }, { password: false })
                    .lean().exec(function (err, friendResult) {
                        if (!friendResult) res.send({ 'message': 'FriendId doesnt exist', 'status': false });
                        else {
                            // { 'userId': userResult._id, 'friendId': friendResult._id}
                            // does userId and friendId already exist in friend table or not
                            friendModel.findOne(
                                {
                                    // $and: [
                                    //  { 
                                    $or: [{ 'userId': userResult._id, 'friendId': friendResult._id },
                                    { 'userId': friendResult._id, 'friendId': userResult._id }],
                                    'projectId': req.body.projectId
                                    //    },
                                    // { $or: [{ 'userId': friendResult._id, 'friendId': userResult._id}] }
                                    // ]
                                }
                            ).exec(function (err, result) {
                                //  console.log("result");
                                //  console.log(result);
                                if (result) {
                                    // console.log("if create friend");
                                    result.status = 1;
                                    //result.save();
                                    userModel.update({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'chatWithRefId': friendResult._id } }).exec();
                                    res.send({ 'message': 'We are already friends brother', 'status': true });
                                }
                                else {
                                    //  console.log("else create friend");
                                    // get reference ids of both iserId and friendId 
                                    let newFriendModel = new friendModel({ 'userId': userResult._id, 'friendId': friendResult._id, 'projectId': req.body.projectId });
                                    newFriendModel.save().then(reslt => { // save both ref-Ids in friend table
                                        userModel.update({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'chatWithRefId': friendResult._id } }).exec();

                                        // ------------------------- NOTE NOTIFICATION ---------------------------------
                                        //   let senderData = await userModel.findOne({ "_id": req.body.userId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

                                        //   newNotification = new notifiModel({
                                        //     "senderId": req.body.userId,
                                        //     "receiverId": friendResult._id,
                                        //     "title": "Friend Request",
                                        //     "body": (senderData.name + " sent you a friend request"),
                                        //     "image": senderData.user_image,
                                        //     "notificationType": 2
                                        //   });
                                        //   newNotification.save();
                                        // -------------------- ********************* --------------------------

                                        res.send({ 'message': 'Success', 'status': true });
                                    })
                                }
                            })
                        }
                    })
            }
        })
})


friendsRouter.route('/unfriend').post(function (req, res) {

    friendModel.findOneAndUpdate({
        'projectId': req.body.projectId, $or: [{ 'userId': req.body.userId, 'friendId': req.body.friendId },
        { 'userId': req.body.friendId, 'friendId': req.body.userId }],
    }, { $set: { 'status': 0 } }, { useFindAndModify: false })
        .lean().exec(function (err, result) {
            if (err) res.send(err);
            res.send({ 'message': 'unfriended', status: true })
        })

    // userModel.findOne({ 'userId':req.body.userId, 'projectId': req.body.projectId }, { password: false })
    // .lean().exec(function (err, userResult) { 
    //     if (!userResult) res.send({ 'message': 'User Id doesnt exist', 'status': false }); 
    //     else {
    //         userModel.findOne({ 'userId': req.body.friendId, 'projectId': req.body.projectId }, { password: false })
    //         .lean().exec(function (err, friendResult) { 
    //             if (!friendResult) res.send({ 'message': 'Friend does not exist', 'status': false });
    //             else {
    //                 friendModel.update({ 'userId': userResult._id, 'friendId': friendResult._id }, { 'status': 0 })
    //                 .lean().exec(function (err, result) {
    //                     if (err) res.send(err);
    //                     res.send({ 'message': 'unfriended', status: true })
    //                 })
    //             }
    //         })
    //     }
    // })
})

friendsRouter.route('/getfriends').post(function (req, res) {
    var userId = req.body.userId;
    friendModel.find({ 'userId': userId, 'status': 1 }).populate({ path: 'userId', select: { 'password': false } }).populate({ path: 'friendId', select: { 'password': false } }).exec(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    })
})

friendsRouter.route('/resetChatRefId').post(function (req, res) {
    var userId = req.body.userId;
    userModel.update({ 'userId': userId }, { $set: { 'chatWithRefId': '' } }).exec();
    res.send(true);
})

// performs additional functionality including creating friend, i.e. if friend's exist then registers it 
friendsRouter.route('/create_register_friend').post(function (req, res) {
    // console.log('create_register_friend');
    // console.log(req.body);
    var userResult = null;
    userModel.findOne({ 'email': req.body.email, 'projectId': req.body.projectId }, { password: false })
        .lean().exec(function (err, _userResult) {
            userResult = _userResult;
            //  console.log("userResult");
            // console.log(userResult);
            if (!userResult) res.send({ 'message': 'UserId or ProjectId doesnt exist', 'status': false });
            else {
                // check friendId and projectId exist in userTable or not
                userModel.findOne({ 'email': req.body.friendData.email, 'projectId': req.body.projectId }, { password: false })
                    .lean().exec(function (err, friendResult) {
                        //  console.log("1");
                        // console.log(userResult);
                        //  console.log(req.body.friendData);
                        if (!friendResult) {
                            let _friendData = {
                                userId: req.body.friendData.userId,
                                name: req.body.friendData.name,
                                email: req.body.friendData.email,
                                password: "12345",
                                phone: "",
                                projectId: req.body.friendData.projectId,
                            }
                            //   var friendData = req.body._friendData;
                            let newUserModel = new userModel(_friendData);
                            // console.log("2");
                            //  console.log(userResult);
                            // console.log(req.body.friendId);
                            newUserModel.save().then(reslt => {
                                //  console.log("3");
                                // console.log(userResult);
                                //  console.log(reslt);
                                userModel.findOne({ 'email': req.body.friendData.email, 'projectId': req.body.projectId }, { password: false })
                                    .lean().exec(function (err, _friendResult) {
                                        //  console.log("4");
                                        //  console.log(_friendResult._id);
                                        //  console.log(userResult._id);
                                        friendModel.findOne({
                                            $or: [{ 'userId': userResult._id, 'friendId': _friendResult._id },
                                            { 'userId': _friendResult._id, 'friendId': userResult._id }]
                                        }).exec(function (err, result) {
                                            //   console.log(result);
                                            if (err) console.log(err);
                                            if (result) {
                                                result.status = 1;
                                                //result.save();
                                                userModel.update({ 'email': req.body.email }, { $set: { 'chatWithRefId': _friendResult._id } }).exec();
                                                res.send({ 'message': 'Already Friends - Success', 'status': true });
                                            }
                                            else {
                                                // get reference ids of both iserId and friendId 
                                                let newFriendModel = new friendModel({ 'userId': userResult._id, 'friendId': _friendResult._id });
                                                newFriendModel.save().then(reslt => { // save both ref-Ids in friend table
                                                    userModel.update({ 'email': req.body.email }, { $set: { 'chatWithRefId': _friendResult._id } }).exec();
                                                    res.send({ 'message': 'Friend Created - Success', 'status': true });
                                                })
                                            }
                                        }) //--- FriendModel query ends ----
                                    }) //--- Friend userModel query ends ----
                            });

                        }
                        else {
                            friendModel.findOne({
                                $or: [{ 'userId': userResult._id, 'friendId': friendResult._id },
                                { 'userId': friendResult._id, 'friendId': userResult._id }]
                            }).exec(function (err, result) {
                                //      console.log(result);
                                if (result) {
                                    result.status = 1;
                                    //result.save();
                                    userModel.update({ 'email': req.body.email }, { $set: { 'chatWithRefId': friendResult._id } }).exec();
                                    res.send({ 'message': 'Already Friends - Success', 'status': true });
                                }
                                else {
                                    // get reference ids of both iserId and friendId 
                                    let newFriendModel = new friendModel({ 'userId': userResult._id, 'friendId': friendResult._id, 'status': 1, 'projectId': req.body.projectId });
                                    newFriendModel.save().then(reslt => { // save both ref-Ids in friend table
                                        userModel.update({ 'email': req.body.email }, { $set: { 'chatWithRefId': friendResult._id } }).exec();
                                        res.send({ 'message': 'Friend Created - Success', 'status': true });
                                    })
                                }
                            }) //--- FriendModel query ends ----
                        }//--- else ends ----
                    })
            }
        })
})

friendsRouter.route('/searchFriend').post(async function (req, res) {
    // console.log(req.body);
    var searchUsingName = false;

    if (req.body.projectId == "5d4c07fb030f5d0600bf5c03")
        searchUsingName = false;
    else if (req.body.projectId == "5d4c07fb030f5d0600bf5c07")
        searchUsingName = true;
    else
        searchUsingName = true;

    // const searchResult = await testModel.find({_id: { $lt: req.body.nextId } , $text: { $search: req.body.name } }).limit(7).exec();
    var searchResult;

    if (!req.body.lastUserTime) {
        if (!searchUsingName) {
            // searchResult = await userModel.find({ $text: { $search: req.body.name, $language: "en" } }).lean().exec();

            searchResult = await userModel.aggregate(
                [
                    { $match: { userId: { $regex: req.body.name, '$options': 'i' }, '_id': { $ne: mongoose.Types.ObjectId(req.body.userId) },  'projectId': mongoose.Types.ObjectId(req.body.projectId) } },
                    { $sort: { highest: -1 } },
                    { $limit: 7 }
                ]
            );
        }
        else {
            searchResult = await userModel.find({ $text: { $search: req.body.name, $language: "en" } }).lean().exec();

            // searchResult = await userModel.aggregate(
            //     [
            //         { $match: { name: { $regex: req.body.name, '$options': 'i' }, 'projectId': mongoose.Types.ObjectId(req.body.projectId) } },
            //         { $sort: { highest: -1 } },
            //         { $limit: 7 }
            //     ]
            // );
        }
    }
    else {
        if (!searchUsingName) {
            searchResult = await userModel.aggregate(
                [
                    { $match: { userId: { $regex: req.body.name, '$options': 'i' }, '_id': { $ne: mongoose.Types.ObjectId(req.body.userId) }, 'projectId': mongoose.Types.ObjectId(req.body.projectId) } },
                    { $sort: { highest: -1 } },
                    { $lt: ["createdAt", req.body.lastUserTime] },
                    { $limit: 7 }
                ]
            );
        }
        else {
            searchResult = await userModel.aggregate(
                [
                    { $match: { name: { $regex: req.body.name, '$options': 'i' }, '_id': { $ne: mongoose.Types.ObjectId(req.body.userId) }, 'projectId': mongoose.Types.ObjectId(req.body.projectId) } },
                    { $sort: { highest: -1 } },
                    { $lt: ["createdAt", req.body.lastUserTime] },
                    { $limit: 7 }
                ]
            );
        }
    }

    //  console.log('... searchResult ...' , searchResult);
    for (let i = 0; i < searchResult.length; i++) {
        var friendIdData = await friendModel.findOne({
            $or: [
                {
                    $and: [{ userId: req.body.userId }, { friendId: searchResult[i]._id }]
                },
                {
                    $and: [{ userId: searchResult[i]._id }, { friendId: req.body.userId }]
                }
            ]
        });

        //  console.log("i: "+ i);  console.log(friendIdData);
        if (friendIdData) {
            // console.log(friendIdData);
            searchResult[i].friendReqStatus = friendIdData.status;
            searchResult[i].friendReqSenderId = friendIdData.userId;
            searchResult[i].friendReqId = friendIdData._id;
            searchResult[i]["latestMsg"] = {};
            searchResult[i].latestMsg["message"] = "";
        }
        else {
            searchResult[i].friendReqStatus = 0;
            searchResult[i]["latestMsg"] = {};
            searchResult[i].latestMsg["message"] = "";
            // searchResult[i].latestMsg[0] = "";
            // searchResult[i].latestMsg.message = "";
        }
    }

    res.json(searchResult);
})

friendsRouter.route('/getFriendsRequest').post(async function (req, res) {
    var allFriendsRequest = await friendModel.find({
        // $or: [
        //     {
        //   $and: [{ userId: req.body.userId }, {status: 2}],
        //     },
        //     {
        $and: [{ friendId: req.body.userId }, { status: 2 }]
        //     }
        // ]
    })
        .populate({ path: 'friendId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime', match: { status: 1 } })
        .populate({ path: 'userId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime', match: { status: 1 } })
        .lean()
        .exec();

    if (allFriendsRequest || allFriendsRequest.length > 0) {
        for (let i = 0; i < allFriendsRequest.length; i++) {
            allFriendsRequest[i].friendReqSenderId = allFriendsRequest[i].userId._id;
        }
    }

    if (!allFriendsRequest || allFriendsRequest.length == 0) res.json([{ message: 'no friends found', status: 0 }]);
    else res.json(allFriendsRequest);
})

friendsRouter.route('/sendFriendRequest').post(async function (req, res) {
   console.log(req.body);

    var friendReqExist = await friendModel.find({
        $or: [
            {
                $and: [{ userId: req.body.userId }, { friendId: req.body.friendId }]
            },
            {
                $and: [{ userId: req.body.friendId }, { friendId: req.body.userId }]
            }
        ]
    }).lean().exec();

    //   console.log('&&&&&&&&friendReqExist&&&&&&&&&&&&7');
    //   console.log(friendReqExist);
    if (friendReqExist.length > 0) {
        //       console.log("IIFFF");
        res.json([{ message: 'invalid, friend request already exist', status: 0 }]);
    }
    else {
        //    console.log("IIIELSE");
        let _friendData = {
            userId: req.body.userId,
            friendId: req.body.friendId,
            projectId: req.body.projectId,
            status: 2
        }

        let newFriendModel = new friendModel(_friendData);
        let saveRes = await newFriendModel.save();
        await saveRes.populate('userId').execPopulate();
        await saveRes.populate('friendId').execPopulate();

        // ------------------------- NOTE NOTIFICATION ---------------------------------
        let senderData = await userModel.findOne({ "_id": req.body.userId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

        newNotification = new notifiModel({
            "senderId": req.body.userId,
            "receiverId": req.body.friendId,
            "title": "Friend Request",
            "body": (senderData.name + " sent you a friend request"),
            "image": senderData.user_image,
            "notificationType": 2
        });
        newNotification.save();
        // -------------------- ********************* --------------------------

        res.json(saveRes);
    }
})

friendsRouter.route('/updateFriendRequest').post(async function (req, res) {
    console.log("--- updateFriendRequest ---");
    console.log(req.body);

    if (req.body.status == 2) {
        await friendModel.findOneAndUpdate({ "_id": req.body._id }, { "$set": { "userId": req.body.userId, "friendId": req.body.friendId, "status": req.body.status } }, { useFindAndModify: false }).exec(function (err, result) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                //   console.log(result);
                // let LResult = friendModel.findOne({ '_id': req.body._id }).exec();
                // res.json(LResult);
            }
        });

        let LResult = await friendModel.findOne({ '_id': req.body._id }).exec();
        res.json(LResult);
    }
    else {
        let updateResult = await friendModel.updateOne({ '_id': req.body._id }, { 'status': req.body.status }).exec();
        var friendRequestData = await friendModel.findOne({ _id: req.body._id }).exec();
        await friendRequestData.populate('userId').execPopulate();
        await friendRequestData.populate('friendId').execPopulate();

        // ------------------------- NOTE NOTIFICATION ---------------------------------
        if (req.body.status == 1) {
            let friendData = await userModel.findOne({ "_id": friendRequestData.friendId._id }, { "_id": true, "name": true, "user_image": true }).lean().exec();

            newNotification = new notifiModel({
                "senderId": friendRequestData.friendId._id,
                "receiverId": friendRequestData.userId._id,
                "title": "Friend Request Accepted",
                "body": (friendData.name + " accepted your friend request"),
                "image": friendData.user_image,
                "notificationType": 3
            });
            newNotification.save();
        }
        // -------------------- ********************* --------------------------

        //   console.log(friendRequestData);
        res.json(friendRequestData);
    }

    //  res.json(updateResult);
})


module.exports = friendsRouter;
