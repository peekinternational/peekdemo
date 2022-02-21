const userModel = require("../model/users-model");
const groupsModel = require("../model/groupsModel");

const groupCallModel = require("../model/groupCall");
const one2oneModel = require("../model/one2oneModel");

const mongoose = require('mongoose');

exports.createCall = async function (req, res) {
    console.log('createCall> ', req.body);

    let callExist = await one2oneModel.findOne({
        $or: [
            {
                $and: [{ "callerId": req.body.callerId }, { "receiverId": req.body.receiverId }],
            },
            {
                $and: [{ "callerId": req.body.receiverId }, { "receiverId": req.body.callerId }]
            }
        ]
    });
    var agree = null;

    // console.log("callExist: ", callExist);
    if (!callExist) {
        let parentCallData = {
            "callerName": req.body.callerName,
            "friendName": req.body.friendName,
            "callerId": req.body.callerId,
            "receiverId": req.body.receiverId,
            "projectId": req.body.projectId,
        };

        let callHistroyEntity = {
            "callerId": req.body.callerId,
            "receiverId": req.body.receiverId,
            "callType": req.body.callType,
            "receiverStatus": ((req.body.status == 3) ? 3 : 1)
        };

        let newCall = new one2oneModel(parentCallData);
        const savedCall = await newCall.save();

        agree = await one2oneModel.findOneAndUpdate({ '_id': savedCall._id, 'projectId': req.body.projectId },
            { $push: { 'callHistory': callHistroyEntity } }, { useFindAndModify: false }).lean().exec();

        let lastIndex = agree.callHistory.length;
        let latestHistoryEntry = agree.callHistory[lastIndex - 1];
        res.json(latestHistoryEntry);

        // agree = await one2oneModel.aggregate([
        //     { $unwind: "$callHistory" },
        //     { $group: { "_id": "$_id", "FirstElement": { $last: "$callHistory" } } },
        //     { $project: { "_id": 0, "FirstElement": 1 } },
        //     { $replaceRoot: { newRoot: "$FirstElement" } }
        // ]);

        // let lastIndex = agree.length;
        // res.json(agree[lastIndex-1]);
    }
    else {
        let callHistroyEntity = {
            "callerId": req.body.callerId,
            "receiverId": req.body.receiverId,
            "callType": req.body.callType,
            "receiverStatus": ((req.body.status == 3) ? 3 : 1)
        };

        agree = await one2oneModel.findOneAndUpdate({ '_id': callExist._id },
            { $push: { 'callHistory': callHistroyEntity }, $pull: { 'fullDeletedBy': req.body.callerId } }, { useFindAndModify: false }).lean().exec();


        let lastIndex = agree.callHistory.length;
        let latestHistoryEntry = agree.callHistory[lastIndex - 1];
        res.json(latestHistoryEntry);

        // agree = await one2oneModel.aggregate([
        //     { $unwind: "$callHistory" },
        //     { $group: { "_id": "$_id", "FirstElement": { $last: "$callHistory" } } },
        //     { $project: { "_id": 0, "FirstElement": 1 } },
        //     { $replaceRoot: { newRoot: "$FirstElement" } }
        // ]);

        // res.json(agree[0]);
    }

    // const populatedCall = await savedCall.populate([
    //     {
    //         path: 'callerId', select: '_id name email user_image'
    //     },
    //     {
    //         path: 'receiverId', select: '_id name email user_image'
    //     }]).execPopulate();
};


exports.updateCallStatus = async function (req, res) {
    console.log('updateCallStatus> ', req.body);

    let callExist = await one2oneModel.findOne({ 'callHistory._id': req.body.callId }, { useFindAndModify: false }).lean().exec();
    // let callerId = callExist.callerId;
    // let receiverId = callExist.receiverId;
    let currentDate = new Date();

    console.log("callExist: ", callExist);
    if (callExist) {
        if (req.body.callStatus == 4 || req.body.callStatus == 6 || req.body.callStatus == 3) {
            if (req.body.callStatus == 6 || req.body.callStatus == 3) {
                one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                    { $set: { 'callerLatestCallTime.outgoing': currentDate, 'receiverLatestCallTime.missed': currentDate } }, { useFindAndModify: false }).lean().exec();
            }
            else if (req.body.callStatus == 4) {
                one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                    {
                        $set: {
                            'callerLatestCallTime.outgoing': currentDate,
                            'receiverLatestCallTime.incomming': currentDate,
                        }
                    }, { useFindAndModify: false }).lean().exec();
            }

            one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                {
                    $set: {
                        'callerLatestCallTime.all': currentDate,
                        'receiverLatestCallTime.all': currentDate,
                        'callHistory.$.receiverStatus': req.body.callStatus
                    }
                }, { useFindAndModify: false }).sort({ "createdAt": -1 }).lean().exec();
        }
        else if (req.body.callStatus == 5) {
            one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                {
                    $set: {
                        'callerLatestCallTime.all': currentDate,
                        'receiverLatestCallTime.all': currentDate,
                        'callerLatestCallTime.outgoing': currentDate,
                        'receiverLatestCallTime.incomming': currentDate,
                        'callHistory.$.senderStatus': 1,
                        'callHistory.$.receiverStatus': 5,
                        'callHistory.$.callTime': req.body.callTime
                    }
                }, { useFindAndModify: false }).sort({ "createdAt": -1 }).lean().exec();
        }
        else if (req.body.callStatus == 2) {
            one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                {
                    $set: {
                        'callerLatestCallTime.all': currentDate,
                        'receiverLatestCallTime.all': currentDate,
                        'callHistory.$.senderStatus': 2,
                        'callHistory.$.receiverStatus': 3,
                    }
                }, { useFindAndModify: false }).sort({ "createdAt": -1 }).lean().exec();
        }

        if (req.body.callStatus != 1 && req.body.callStatus != 4) {
            //const date = new Date().getTime();
            one2oneModel.findOneAndUpdate({ 'callHistory._id': req.body.callId },
                {
                    'callerLatestCallTime.all': currentDate,
                    'receiverLatestCallTime.all': currentDate,
                    $set: { 'callHistory.$.closedAt': currentDate }
                }, { useFindAndModify: false }).sort({ "createdAt": -1 }).lean().exec();
        }
    }

    res.json(true);
}

exports.getAllone2oneCalls = async function (req, res) {
    console.log("getAllone2oneCalls: ", req.params);

    var callsData = null;
    if (req.params.listType == "0") {
    //    callsData = await one2oneModel.find({
    //        "fullDeletedBy": { "$ne": req.params.callerId },
    //        $or: [{ "callHistory.deletedBy": { "$eq": [] } }, { "callHistory.deletedBy": { "$ne": req.params.callerId } }],
    //        $or: [{ "callerId": req.params.callerId }, { "receiverId": req.params.callerId }] }, {'callHistory.$': 1}).lean().exec();

       callsData = await one2oneModel.aggregate([
        { $match: { "fullDeletedBy": { "$ne": mongoose.Types.ObjectId(req.params.callerId) }, $or: [{ "callerId": mongoose.Types.ObjectId(req.params.callerId) }, { "receiverId": mongoose.Types.ObjectId(req.params.callerId) }] } },
        {
            $project: {
                callHistory: {
                    $filter: {
                        input: '$callHistory',
                        as: 'history',
                        cond: {
                             $or: [   
                                { $eq: ['$$history.deletedBy', [] ] },
                                { $ne: ['$$history.deletedBy', [mongoose.Types.ObjectId(req.params.callerId)]] }
                             ]
                        }
                    }
                },
                _id: 1,
                status: 1,
                friendName: 1,
                receiverId: 1,
                callerName: 1,
                callerId: 1,
                projectId: 1,
                createdAt: 1,
                latestCallTime: 1
            }
        }
    ]);
    
    }
    else {
        if (req.params.listType != "1") {
            callsData = await one2oneModel.aggregate([
                { $match: { "fullDeletedBy": { "$ne": mongoose.Types.ObjectId(req.params.callerId) }, $or: [{ "callHistory.callerId": mongoose.Types.ObjectId(req.params.callerId) }, { "callHistory.receiverId": mongoose.Types.ObjectId(req.params.callerId) }] } },
                {
                    $project: {
                        callHistory: {
                            $filter: {
                                input: '$callHistory',
                                as: 'history',
                                cond: {
                                    $and: [
                                        { $eq: ['$$history.receiverStatus', (parseInt(req.params.listType))] },
                                        { $eq: ['$$history.receiverId', mongoose.Types.ObjectId(req.params.callerId)] },
                                        { $eq: ['$$history.deletedBy', [] ] },
                                        { $ne: ['$$history.deletedBy', [mongoose.Types.ObjectId(req.params.callerId)]] }
                                    ]
                                }
                            }
                        },
                        _id: 1,
                        status: 1,
                        friendName: 1,
                        receiverId: 1,
                        callerName: 1,
                        callerId: 1,
                        projectId: 1,
                        createdAt: 1,
                        latestCallTime: 1
                    }
                }
            ]);
        }
        else {
            callsData = await one2oneModel.aggregate([
                { $match: { "fullDeletedBy": { "$ne": mongoose.Types.ObjectId(req.params.callerId) }, $or: [{ "callHistory.callerId": mongoose.Types.ObjectId(req.params.callerId) }, { "callHistory.receiverId": mongoose.Types.ObjectId(req.params.callerId) }] } },
                {
                    $project: {
                        callHistory: {
                            $filter: {
                                input: '$callHistory',
                                as: 'history',
                                cond: {
                                    $and: [
                                        { $eq: ['$$history.senderStatus', (parseInt(req.params.listType))] },
                                        { $eq: ['$$history.callerId', mongoose.Types.ObjectId(req.params.callerId)] },
                                        { $eq: ['$$history.deletedBy', [] ] },
                                        { $ne: ['$$history.deletedBy', [mongoose.Types.ObjectId(req.params.callerId)]] }
                                    ]
                                }
                            }
                        },
                        _id: 1,
                        status: 1,
                        friendName: 1,
                        receiverId: 1,
                        callerName: 1,
                        callerId: 1,
                        projectId: 1,
                        createdAt: 1,
                        latestCallTime: 1
                    }
                }
            ]);
        }

    };

    one2oneModel.populate(callsData, { path: "callerId receiverId", select: { 'name': true, "user_image": true, 'onlineStatus': true, 'status': true, "callStatus": true } }, function (err, populatedData) {
        res.json(populatedData);
    });
}

exports.clearOne2oneHistory = async function (req, res) {
    let result = await one2oneModel.findOneAndUpdate(
        { '_id': req.body.callId, 'projectId': req.body.projectId, "status": 1, "fullDeletedBy": { "$ne": req.body.userId }, "callHistory.deletedBy": { $ne: req.body.userId } },
        { $push: { 'fullDeletedBy': req.body.userId, "callHistory.$[].deletedBy": req.body.userId } }, { useFindAndModify: false }).lean().exec();

    if (result) res.json(result);
    else res.json({ "status": 0, "message": "Incorrect call-Id/userId or entry already exist" });
}


    // const Promise = new Promise();
    // Promise.add([
    //     one2oneModel.find({ 'projectId': req.params.projectId }),
    //     groupCallModel.find({ 'projectId': req.params.projectId })
    // ]).then(result => {
    //     // const [one2oneCalls, groupCallsCalls] = result;
    //     console.log('getAllCalls >>>', result);
    //     res.json(result);
    // })
    //     .catch(err => {
    //         console.error("Something went wrong", err);
    //         res.json(err);
    //     })

    // one2oneModel.deleteMany({ "user_id": req.body.userId, 'projectId': req.body.projectId }).lean().exec();
    // .remove({ $or: [{ "senderUserId": req.body.userId }, { "receiverUserId": req.body.userId }], 'projectId': req.body.projectId }, { useFindAndModify: false }).lean().exec();
