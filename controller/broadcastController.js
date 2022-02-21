// const groupsModel = require("../model/groupsModel");
// const groupCall = require("../model/groupCall");
const chatModel = require("../model/chatModel");
// const userModel = require("../model/users-model");
// const friendModel = require("../model/friendModel");
const broadModel = require("../model/broadcast");
// const todoModel = require("../model/todo-model");


module.exports = function (io, saveUser) {
    var router = {};

    router.startPresenter = (req, res) => {
        var broad = new broadModel({
            "presenterId": req.body.userId,
            "password": req.body.password,
            "projectId": req.body.projectId
        });
        broad.save(function (err, data) {
            if (err) console.log(err);
            broadModel.findOne({ 'presenterId': req.body.userId, 'projectId': req.body.projectId, 'endDate': null }).sort({ _id: -1 }).limit(1).lean().exec(function (err, result) {
                res.json({ status: true, message: 'Saved successfully', 'broadcastRefId': result });
            })
        });
    }

    router.getBroadcastId = (req, res) => {
        broadModel.findOne({ 'presenterId': req.params.presenterId, 'projectId': req.params.projectId, 'endData': null }).sort({ _id: -1 }).limit(1).exec(function (err, result) {
            res.json({ status: true, message: 'Saved successfully', 'broadcastRefId': result });
        })
    }


    router.joinViewer = (req, res) => {
        let userBroadcastingId = req.body.preId;
        let broadcastRefId = req.body.broadcastId;
        var projectId = req.body.projectId;

        broadModel.find({ 'presenterId': req.body.preId, 'projectId': projectId }).sort({ _id: -1 }).limit(1).exec(updateAllFound);
        function updateAllFound(err, preData) {
            var ids = preData.map(function (item) {
                return item._id;
            });

            if (ids.length > 0) {

                broadModel.findOneAndUpdate({ _id: ids[0], projectId: projectId }, { $push: { 'viewers': { viewerId: req.body.userData } } }, { useFindAndModify: false }, function (err, data) {
                    if (err) throw err;
                    let newMessage = new chatModel(req.body.joinMsg);
                    newMessage.save();

                    broadModel.findOne({ '_id': broadcastRefId, 'presenterId': userBroadcastingId, 'endData': null, 'projectId': projectId }).sort({ _id: -1 }).limit(1).exec(function (err, result) {
                        if (result) {
                            chatModel.find({ 'chatType': 2, 'receiverId': broadcastRefId }).populate('senderId').lean().exec(function (err, data) {
                                if (err) throw err;
                                res.json(data);
                            });
                        }
                    });
                })
            }
            else
                res.json({ status: false, message: 'Update failed' });
        }
    }

    router.stopPresenter = (req, res) => {
        broadModel.find({ 'presenterId': req.params.userId, 'projectId': req.params.projectId }).sort({ _id: -1 }).limit(1).exec(updateAllFound);
        function updateAllFound(err, preData) {
            var ids = preData.map(function (item) {
                return item._id;
            });
            if (ids.length > 0)
                broadModel.findOneAndUpdate({ _id: ids[0], 'projectId': req.params.projectId }, { endDate: new Date() }, { useFindAndModify: false }, function (err, data) {
                    if (err) throw err;
                    res.json({ status: true, message: 'Date updated successfully' });
                })
            else
                res.json({ status: false, message: 'Update failed' });
        }
    }

    router.stopViewer = (req, res) => {
        let newMessage = new chatModel(req.body.leftMsg);
        newMessage.save();

        broadModel
            .find({ 'presenterId': req.body.preId, 'projectId': req.body.projectId })
            .sort({ _id: -1 })
            .limit(1)
            .exec(updateAllFound);
        function updateAllFound(err, preData) {
            var ids = preData.map(function (item) {
                return item._id;
            });
            if (ids.length > 0) {

                broadModel.findOneAndUpdate(
                    { _id: ids[0], 'projectId': req.body.projectId, "viewers.viewerId": req.body.userData },
                    {
                        $set: {
                            "viewers.$.endDate": new Date()
                        }
                    },
                    {
                        sort: { "viewers.$._id": -1 } // Imp Needed: Need to update this last id
                    }, { useFindAndModify: false },
                    function (err, data) {
                        if (err) throw err;
                        res.json({ status: true, message: "Date updated successfully" });
                    }
                );
            }
            else res.json({ status: false, message: "Update failed" });
        }
    };

    return router;
}