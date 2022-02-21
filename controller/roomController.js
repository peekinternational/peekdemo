const { exec } = require("child_process");
const roomModel = require("../model/roomModel");
const userModel = require("../model/users-model");
const chatModel = require("../model/chatModel");

var nodemailer = require('nodemailer');
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


module.exports = function (io, saveUser) {
    var router = {};

    router.createRoom = async function (req, res) {
        var roomData = JSON.parse(req.body.roomData);
        var roomFilename = req.body.filename;
        var roomFriends = JSON.parse(req.body.roomFriends);

        console.log("createRoom:", req.body);

        let room = new roomModel({
            'room_id': roomData.room_id,
            'room_title': roomData.room_title,
            'room_topic': roomData.room_topic,
            'room_password': roomData.room_password,
            // 'room_file': roomFilename,
            'createdBy': req.body.userId,
            'projectId': req.body.projectId,
            'room_friends': roomFriends,
            "room_timezone": roomData.room_timezone
        });

        await room.save();
        // await isSave.populate('room_friends').execPopulate();

        var roomScheduled = null;

        if (req.body.scheduleTypeName == "daily") {
            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                    }
                },
                { useFindAndModify: false }).populate('room_friends').lean().exec();
        }

        else if (req.body.scheduleTypeName == "weekly") {
            // console.log("weekly");
            let weekDaysList = JSON.parse(req.body.scheduledDaysList);

            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleWeekDays": weekDaysList,
                    }
                    // $push: {
                    //     "scheduleWeekDays": req.body.scheduledDaysList,
                    // }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }
        else if (req.body.scheduleTypeName == "monthly") {
            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleStartDate": req.body.scheduleStartDate,
                    }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }
        console.log("roomScheduled: ", roomScheduled);

        let files = roomFilename;
        try {
            for (let i = 0; i < files.length; i++) {
                let file = {
                    "filename": files[i],
                };

                roomModel.findOneAndUpdate(
                    {
                        '_id': room._id, 'projectId': req.body.projectId
                    },
                    {
                        $push: {
                            'room_file': file,
                        }
                    }, { useFindAndModify: false }).lean().exec();
            }

        } catch (error) {
            console.error(error);
            res.json("Something went wrong");
        }

        let projectName = "";
        if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") {
            projectName = "Chatto";
        }

        roomScheduled.room_friends.forEach(function (friend, i) {
            mailOptions = {
                from: 'hello@chatto.jp',
                to: friend.email,
                subject: 'You are invited in a room',
                text: projectName,
                html:
                    `<p><b>Dear, ${friend.name} </b> you have been added to a room <b> ${roomData.room_title} </b> in Chatto. You will be notified before the meeting starts.</p>`
            };

            transporter.sendMail(mailOptions, function (err) {
                if (error) console.log(error);
                else console.log('Email sent: ' + info.response);
            });
        });

        res.json(roomScheduled);
    }


    router.updateRoom = async function (req, res) {
        //   console.log("updateRoom: ", req.body);
        var roomData = JSON.parse(req.body.roomData);
        var roomFilename = req.body.filename;
        var roomFriends = JSON.parse(req.body.roomFriends);

        // let oldRoomFriends = await roomModel.findOne({ '_id': req.body._id, 'projectId': req.body.projectId }, {"room_friends": true}).populate("room_friends", "name email").lean().exec();
        // console.log("oldRoomFriends: ", oldRoomFriends.room_friends);

        // const result = words.filter(word => word.length > 6);

        let updatedRoom = await roomModel.findOneAndUpdate(
            {
                '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
                $set: {
                    'room_id': roomData.room_id,
                    'room_title': roomData.room_title,
                    'room_topic': roomData.room_topic,
                    'room_password': roomData.room_password,
                    // 'room_file': roomFilename,
                    'room_friends': roomFriends,
                    "room_timezone": roomData.room_timezone
                }
            }, { useFindAndModify: false }).lean().exec();


        var roomScheduled = null;
        if (req.body.scheduleTypeName == "daily") {
            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                    }
                },
                { useFindAndModify: false }).populate('room_friends').lean().exec();
        }

        else if (req.body.scheduleTypeName == "weekly") {
            let weekDaysList = JSON.parse(req.body.scheduledDaysList);

            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleWeekDays": weekDaysList,
                    }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }
        else if (req.body.scheduleTypeName == "monthly") {
            roomScheduled = await roomModel.findOneAndUpdate({ 'room_id': roomData.room_id, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleStartDate": req.body.scheduleStartDate,
                    }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }

        let files = roomFilename;
        try {
            for (let i = 0; i < files.length; i++) {
                let file = {
                    "filename": files[i],
                };

                roomModel.findOneAndUpdate(
                    {
                        '_id': req.body._id, 'projectId': req.body.projectId
                    },
                    {
                        $push: {
                            'room_file': file,
                        }
                    }, { useFindAndModify: false }).lean().exec();
            }

        } catch (error) {
            console.error(error);
            res.json("Something went wrong");
        }

        // let projectName = "";
        // if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") {
        //     // projectLink = "https://turn.peekvideochat.com";
        //     projectName = "peekvideochat";
        // }

        // roomScheduled.room_friends.forEach(function (friend, i) {
        //     mailOptions = {
        //         from: 'hello@chatto.jp',
        //         to: friend.email,
        //         subject: 'You are invited in a meeting',
        //         text: projectName,
        //         html:
        //             `<p><b>Dear, ${friend.name} </b> you have been added to meeting <b> ${roomData.room_title} </b> in Chatto. You will be notified before the meeting starts.</p>`
        //     };

        //     transporter.sendMail(mailOptions, function (err) {
        //         if (error) console.log(error);
        //         else console.log('Email sent: ' + info.response);
        //     });
        // });

        res.json(roomScheduled);
    }


    router.updateRoomSchedule = async function (req, res) {
        // console.log("updateRoomSchedule: ", req.body);
        var roomScheduled = null;
        if (req.body.scheduleTypeName == "daily") {
            roomScheduled = await roomModel.findOneAndUpdate({ '_id': req.body.roomId, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                    }
                },
                { useFindAndModify: false }).populate('room_friends').lean().exec();
        }

        else if (req.body.scheduleTypeName == "weekly") {
            let weekDaysList = JSON.parse(req.body.scheduledDaysList);

            roomScheduled = await roomModel.findOneAndUpdate({ '_id': req.body.roomId, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleWeekDays": weekDaysList,
                    }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }
        else if (req.body.scheduleTypeName == "monthly") {
            roomScheduled = await roomModel.findOneAndUpdate({ '_id': req.body.roomId, 'projectId': req.body.projectId },
                {
                    $set: {
                        "scheduleTypeName": req.body.scheduleTypeName,
                        "scheduleStartTime": req.body.scheduleStartTime,
                        "scheduleStartDate": req.body.scheduleStartDate,
                    }
                }, { useFindAndModify: false }).populate('room_friends').lean().exec();
        }
        // console.log(roomScheduled);
        res.json(roomScheduled);
    }



    router.updateRoomFriends = async function (req, res) {
        var roomFriends = JSON.parse(req.body.roomFriends);

        let updatedFriendsList = await roomModel.findOneAndUpdate(
            {
                '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
                $set: {
                    'room_friends': roomFriends,
                }
            }, { useFindAndModify: false }).lean().exec();

        // console.log(updatedFriendsList);
        res.json(updatedFriendsList);
    }


    router.getRooms = async function (req, res) {
        //  var myRooms = null, joinedRoom = null, allRooms = null;

        console.log("getRooms: ", req.params);
        if (req.params.roomGetStatus == 0) {
            // myRooms = await roomModel.find({ 'createdBy': req.params.userId, 'projectId': req.params.projectId, 'status': 1 }).populate('room_friends').lean().exec();
            // joinedRoom = await roomModel.find({ 'projectId': req.params.projectId, "room_friends": req.params.userId, 'status': 1 }).populate('room_friends').lean().exec();
            let allRooms = await roomModel.find({
                'status': 1, 'projectId': req.params.projectId,
                $or: [
                    { 'createdBy': req.params.userId },
                    { "room_friends": req.params.userId }
                ]
            }).populate('room_friends', { _id: true, name: true }).sort({ createdAt: -1 }).lean().exec();

            return res.json(allRooms);
        }
        else if (req.params.roomGetStatus == 1) {
            let myRooms = await roomModel.find({ 'createdBy': req.params.userId, 'projectId': req.params.projectId, 'status': 1 }).populate('room_friends').sort({ createdAt: -1 }).lean().exec();
            return res.json(myRooms);
        }
        else if (req.params.roomGetStatus == 2) {
            let joinedRoom = await roomModel.find({ 'projectId': req.params.projectId, "room_friends": req.params.userId, 'status': 1 }).populate('room_friends').sort({ createdAt: -1 }).lean().exec();
            return res.json(joinedRoom);
        }

        // allRooms = myRooms.concat(joinedRoom);
        // console.log("allRooms: ", allRooms);
    }


    router.leaveRoom = async function (req, res) {
        roomModel.findOneAndUpdate(
            { "_id": req.body._id, 'projectId': req.body.projectId },
            { $pull: { "room_friends": req.body.friendId } }, { useFindAndModify: false }
        ).lean().exec(function (err, result) {
            res.json(200);
        })
    }


    router.deleteRoom = async function (req, res) {
        let endroom = await roomModel.deleteOne({ '_id': req.body._id }).lean().exec();
        res.json(endroom);
    }

    router.getRoomChat = async function (req, res) {
        // console.log("getRoomChat: ", req.params);
        let id = req.params.roomId;
        let projectId = req.params.projectId;
        // let msgCountLimit = parseInt(req.params.limit);

        chatModel
            .find({ "status": 1, "groupId": id, "projectId": projectId })
            .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
            .populate("senderId", { _id: true, name: true, user_image: true })
            .sort({ createdAt: -1 })
            //.limit(msgCountLimit)
            .exec(function (err, data) {
                if (data) data.reverse();
                res.json(data);
            });
    }

    router.getSingleRoom = async function (req, res) {
        roomModel.findOne({ 'projectId': req.params.projectId, '_id': req.params.roomId }).lean().exec(function (err, roomData) {
            res.json(roomData);
        });
    }

    // ==================================================================================================================================

    router.updateRoomCallStatus = async function (req, res) {
        // console.log("updateRoomCallStatus: ", req.body);

        let roomJoinedMembersCount = await roomModel.findOne({ '_id': req.body._id, 'projectId': req.body.projectId }, { "activeMembersCount": true }).lean().exec();

        //  console.log("roomJoinedMembersCount: ", roomJoinedMembersCount);
        let updatedRoomStatus = await roomModel.findOneAndUpdate(
            {
                '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
                $set: { 'activeStatus': 1, 'activeMembersCount': (roomJoinedMembersCount.activeMembersCount + 1) }
            }, { useFindAndModify: false }).lean().exec();

        res.json(updatedRoomStatus);
    }

    router.leaveRoomCall = async function (req, res) {
        //   console.log("leaveRoomCall: ", req.body);

        let roomJoinedMembersCount = await roomModel.findOne({ '_id': req.body._id, 'projectId': req.body.projectId }, { "activeMembersCount": true }).lean().exec();
        //  console.log(roomJoinedMembersCount);

        let totalJoinedMembers = 0;
        if (totalJoinedMembers != null)
            totalJoinedMembers = roomJoinedMembersCount.activeMembersCount - 1;
        else
            totalJoinedMembers = 0;

        let updatedRoom = null;

        if (totalJoinedMembers <= 0) {
            updatedRoom = await roomModel.findOneAndUpdate(
                {
                    '_id': req.body._id, 'projectId': req.body.projectId
                },
                {
                    $set: { 'activeStatus': 0, 'activeMembersCount': 0 }
                }, { useFindAndModify: false }).lean().exec();
        }
        else {
            updatedRoom = await roomModel.findOneAndUpdate(
                {
                    '_id': req.body._id, 'projectId': req.body.projectId
                },
                {
                    $set: { 'activeMembersCount': totalJoinedMembers }
                }, { useFindAndModify: false }).lean().exec();
        }

        res.json(updatedRoom);
    }


    router.uploadRoomDocument = async function (req, res) {
        console.log("uploadRoomDocument: ", req.body);

        // let updateRoomDoc = await roomModel.findOneAndUpdate(
        //     {
        //         '_id': req.body._id, 'projectId': req.body.projectId
        //     },
        //     {
        //         $set: {
        //             'room_file': req.body.fileName,
        //         }
        //     }, { useFindAndModify: false }).lean().exec();

        let files = req.body.fileName;

        try {
            for (let i = 0; i < files.length; i++) {
                let file = {
                    "filename": files[i],
                };

                roomModel.findOneAndUpdate(
                    {
                        '_id': req.body._id, 'projectId': req.body.projectId
                    },
                    {
                        $push: {
                            'room_file': file,
                        }
                    }, { useFindAndModify: false }).lean().exec();
            }

            let updateRoomDoc = await roomModel.findOne(
                {
                    '_id': req.body._id, 'projectId': req.body.projectId
                }, { useFindAndModify: false }).lean().exec();

            res.json(updateRoomDoc);

        } catch (error) {
            console.error(error);
            res.json("Something went wrong");
        }
    }

    router.removeRoomDocument = async function (req, res) {
        console.log("removeRoomDocument: ", req.body);

        let updateRoomDoc = await roomModel.findOneAndUpdate(
            {
                '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
                $pull: {
                    'room_file': { "_id": req.body.fileId },
                }
            }, { useFindAndModify: false }).lean().exec();

        res.json(updateRoomDoc);
    }

    return router;
}