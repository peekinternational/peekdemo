const userModel = require("../model/users-model");
const friendModel = require("../model/friendModel");
const chatModel = require("../model/chatModel");
const groupsModel = require("../model/groupsModel");
const notificationModel = require("../model/notificationModel");
const one2oneModel = require("../model/one2oneModel");
const roomModel = require("../model/roomModel");
const meetingModel = require("../model/meetingModel");

// const mongoose = require('mongoose');

module.exports = function (io, saveUser) {
    var router = {};

    router.notificationsList = async function (req, res) {

        var selectData = "user_image name userId createdAt status onlineStatus";
        var latestNotes = await notificationModel.find({ "receiverId": req.body.userId, "projectId": req.body.projectId, "status": 1 })
            .populate("senderId", selectData)
            .populate("receiverId", selectData)
            .sort({ createdAt: -1 }).lean().exec();

        if (latestNotes) res.json(latestNotes);
        else res.json({ "status": 0, "message": 'Incorrect userId' });
    }

    router.readNotification = async function (req, res) {
        let result = await notificationModel.updateMany({ "receiverId": req.body.userId, "projectId": req.body.projectId }, { $set: { "readStatus": 1 } }, { useFindAndModify: false }).lean().exec();

        if (result) res.json({ "status": 1, "data": result });
        else ares.json({ "status": 0, "message": 'Incorrect userId' });
    }

    router.deleteNotification = async function (req, res) {
        let result = await notificationModel.findOneAndUpdate({ "_id": req.body.notifyId, "projectId": req.body.projectId }, { $set: { "status": 0 } }, { useFindAndModify: false }).lean().exec();

        if (result) res.json({ "status": 1, "message": "Notification deleted successfully" });
        else res.json({ "status": 0, "message": "Incorrect userId" });
    }

    router.notificationsCount = async function (req, res) {
        let notificationCount = await notificationModel.find({ "receiverId": req.params.userId, "readStatus": 0 }).countDocuments().lean().exec();
        res.json({ "unreadNoteCount": notificationCount });
    }

    return router;
}