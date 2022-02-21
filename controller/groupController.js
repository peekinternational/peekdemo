const groupsModel = require("../model/groupsModel");
const groupCall = require("../model/groupCall");
const chatModel = require("../model/chatModel");
const userModel = require("../model/users-model");
const notifiModel = require("../model/notificationModel");

module.exports = function (io, saveUser) {
  var router = {};

  router.createUserGroup = async (req, res) => {
    //  console.log("createUserGroup1: ", req.body);
    let parsedData = JSON.parse(req.body.groupData);
    //   console.log("createUserGroup2: ", parsedData);
    let newGroup = new groupsModel(parsedData);
    const result = await newGroup.save();
    await result.populate('members').execPopulate();

    // const response = await client.newSession('device-id',{
    //   language: 'tr',
    // });
    // console.log(response.body);

    // sentSignal();
    res.send(result);
  }

  router.removeGroupUser = (req, res) => {
    groupsModel.update(
      { "_id": req.body.groupId, 'projectId': req.body.projectId },
      { $pull: { members: req.body.memberId } }
    ).exec(function (err, result) {
      res.json(200);
    })
  }

  router.changeAdmin = async (req, res) => {
    groupsModel.update(
      { "_id": req.body.groupId, 'projectId': req.body.projectId },
      { $set: { 'creatorUserId': req.body.newAdminId } }
    ).exec(function (err, result) {
      res.json(200);
    })
  }

  router.editGroupName = (req, res) => {
    groupsModel.update(
      { "_id": req.body.groupId, 'projectId': req.body.projectId },
      { "name": req.body.groupName }
    ).exec(function (err, result) {
      res.json(200);
    })
  }

  router.addNewMembers = (req, res) => {
    groupsModel.update(
      { '_id': req.body.groupId, 'projectId': req.body.projectId },
      { $push: { members: req.body.members } },
    ).exec(function (err, result) {
      res.json(200);
    })
  }

  router.getCreatedGroups = async function (req, res) {
    var groups = await groupsModel.find({ 'status': 1, 'projectId': req.params.projectId, "members": req.params.userId })
      .populate({ path: 'members', select: '_id name email userId user_image' }).lean().exec();

    for (var i = 0; i < groups.length; i++) {
      // var unreadMsgCount = await chatModel.find({ groupId: groups[i], isSeen: 0 , senderId: {$ne: req.params.userId}}).count().lean().exec();
      // groups[i]["usCount"] = unreadMsgCount;
      var latestMsg = await chatModel.findOne({ 'groupId': groups[i], 'projectId': req.params.projectId, deletedBy: { $ne: req.params.userId } }, {}, { sort: { 'createdAt': -1 } }).lean().exec();
      groups[i]["latestMsg"] = latestMsg;
      //if (latestMsg) groups[i]["latestMsg"] = latestMsg;
      // else groups[i]["latestMsg"] = "";

      var groupCallStatus = await groupCall.findOne({ 'groupId': groups[i]._id, 'projectId': req.params.projectId }, { status: true }, { sort: { 'createdAt': -1 } }).lean().exec();
      if (groupCallStatus)
        groups[i]["groupCallStatus"] = groupCallStatus.status;
      else
        groups[i]["groupCallStatus"] = 0;
    }

    res.send(groups);
  };


  router.deleteGroup = function (req, res) {
    var groupId = req.body.groupId;
    // projectId not set in below query right now ...
    groupsModel.findByIdAndUpdate(groupId, { status: 0 }, function (err, data) {
      if (err) throw err;
      res.send(true);
    });
  }

  router.uploadGroupPic = (req, res) => {
    groupsModel.findOneAndUpdate({ '_id': req.body.groupId, 'projectId': req.body.projectId }, { "user_image": req.body.groupImage }, { useFindAndModify: false }).lean().exec();
    res.json(req.body.groupImage);
  }

  router.groupChat = function (req, res) {
    // console.log("groupChat: ", req.body);
    var chatType = req.body.chatType;
    if (chatType == 0) {
      newMessage = new chatModel({
        groupId: req.body.groupId,
        senderId: req.body.senderId,
        message: req.body.message,
        isGroup: req.body.isGroup,
        projectId: req.body.projectId
      });
    } else {
      newMessage = new chatModel({
        commentId: req.body.commentId,
        chatType: chatType,
        groupId: req.body.groupId,
        senderId: req.body.senderId,
        message: req.body.message,
        isGroup: req.body.isGroup,
        projectId: req.body.projectId
      });
    }

    newMessage.save(function (err, data) {
      if (err) throw err;

      userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersGroupChat': { $eq: req.body.groupId } }, { $pull: { "clearedUsersGroupChat": req.body.groupId } }, { useFindAndModify: false }).lean().exec();

      // -------------- GROUP CHAT NOTIFICATION --------------------------
      // let senderData = await userModel.findOne({ "_id": req.body.senderId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

      // newNotification = new notifiModel({
      //   "senderId": req.body.senderId,
      //   "receiverId": req.body.groupId,
      //   "title": "Message",
      //   "body": (senderData.name + " has sent a message in group " + data.name),
      //   "image": senderData.user_image,
      //   "notificationType": 1
      // });
      // newNotification.save();
      // -------------- ********************* --------------------------

      if (chatType == 0) {
        chatModel
          .findOne({ groupId: req.body.groupId, senderId: req.body.senderId, projectId: req.body.projectId })
          .populate("senderId")
          .sort({ updatedAt: -1 })
          .exec(function (err, data) {
            if (err) throw err;

            //>>> needs recheck
            let date_ob = new Date();
            groupsModel.updateOne({ projectId: req.body.projectId, _id: req.body.groupId },
              { $set: { updatedByMsg: date_ob } }).lean().exec();

            res.json(data);
          });
      } else {
        chatModel
          .findOne({
            commentId: req.body.commentId,
            groupId: req.body.groupId,
            senderId: req.body.senderId,
            projectId: req.body.projectId
          })
          .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
          .populate("senderId", { _id: true, name: true, user_image: true })
          .sort({ updatedAt: -1 })
          .exec(function (err, data) {
            //  helper.addNewMessage(data);
            res.json(data);
          });
      }
    });
  };

  router.getGroupChat = function (req, res) {
    var id = req.params.groupId;
    var projectId = req.params.projectId;
    var userId = req.params.userId;
    let msgCountLimit = parseInt(req.params.limit);

    // console.log("getGroupChat: ", req.params);

    chatModel
      .find({ status: 1, groupId: id, projectId: projectId, deletedBy: { $ne: userId }, })
      .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
      .populate("senderId", { _id: true, name: true, user_image: true })
      .sort({ createdAt: -1 })
      .limit(msgCountLimit).lean()
      .exec(function (err, data) {
        if (data) data.reverse();
        res.json(data);
      });
  };

  router.getMoreGroupChat = function (req, res) {
    var id = req.params.groupId;
    var msgCountLimit = parseInt(req.params.limit);
    var chatTime = req.params.chatTime;
    var projectId = req.params.projectId;

    chatModel
      .find({ createdAt: { $lt: chatTime }, groupId: id, projectId: projectId })
      .populate("receiverId", { _id: true, name: true })
      .populate("senderId", { _id: true, name: true })
      .sort({ createdAt: -1 })
      .limit(msgCountLimit)
      .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
      .lean()
      .exec(function (err, data) {
        if (err) throw err;
        res.json(data);
      });
  }

  router.getLastGroupMsg = function (req, res) {
    var id = req.body.id;
    var sid = req.body.senderId;

    chatModel
      .find({ groupId: id, senderId: sid, projectId: req.body.projectId })
      .populate("senderId")
      .lean()
      .then(function (data) {
        res.json(data);
      });
  };

  router.getcurrentgroupchat = function (req, res) {
    var id = req.body.id;
    var _senderId = req.body.senderId;
    groupsModel.find({ groupId: id, senderId: _senderId }, function (err, data) {
      res.json(data);
    });
  };

  router.updateGroupChat = function (req, res) {
    var id = req.body._id;
    var message = req.body.message;
    var groupId = req.body.groupId;

    // console.log("id: ", id);
    // console.log("message: ", message);
    // console.log("groupId: ", groupId);

    chatModel.findByIdAndUpdate(id, { message: message }, function (err, data) {
      if (err) throw err;
      chatModel
        .find({ groupId: groupId, isGroup: 1, projectId: req.body.projectId })
        .populate("senderId")
        .exec(function (err, groupMsgs) {
          if (err) throw err;
          res.json(groupMsgs);
        });
    });
  };

  router.deleteGroupMsg = function (req, res) {
    var msgId = req.params.msgId;
    var type = req.params.type;
    var groupId = req.params.groupId;

    chatModel.findByIdAndUpdate(msgId, { isDeleted: 1 }, function (err, data) {
      if (err) throw err;
      chatModel
        .find({ groupId: groupId, isGroup: 1 })
        .populate("senderId")
        .exec(function (err, groupMsgs) {
          res.json(groupMsgs);
        });
    });
  };

  router.addGroup = function (req, res) {
    var members = req.body.members;
    var obj = [];
    members.forEach(function (mem) {
      obj.push({ id: mem._id, name: mem.name, isseen: false });
    });
    var group = new groupsModel({
      members: obj,
      name: req.body.groupName
    });
    group.save(function (err, data) {
      res.json(data);
      helper.RTGU();
    });
  };

  router.getGroups = function (req, res) {
    groupsModel
      .find({ members: { $elemMatch: { id: req.params.userId } }, status: 1 }).populate({ path: 'members', select: '_id name email userId' })
      .lean()
      .then(function (data) {
        res.json(data);
      });
  };

  // ********************************** *****************************************************
  // ********************************** GROUP CALL [IN PROGRESS] *******************************
  // ********************************** *****************************************************

  // For now we will enter a group call based on hour check, need imp later on
  router.callAGroup = (req, res) => {
    groupCall
      .find({ groupId: req.body.groupId, status: 1 }) // check if call is still open
      .sort({ _id: -1 }).limit(1)
      .exec(function (err, groupData) {

        if (groupData.length > 0) {
          var hours = Math.abs(groupData[0].createdAt - new Date) / 36e5;
          if (hours > 1) { //create new entry 
            new groupCall({ 'groupId': req.body.groupId, 'createdBy': req.body.userId });
          }
          else if (req.body.userId != groupData[0].createdBy) { //update existing one
            groupData.members.push({ 'userId': req.body.userId });
          }
        }
        else { // create new entry
          new groupCall({ 'groupId': req.body.groupId, 'createdBy': req.body.userId });
        }

      });
  };

  router.createGroupCall = async (req, res) => {
    let newGroupCall = new groupCall(req.body);
    let groupExist = await groupCall.findOne({ 'groupId': req.body.groupId, 'projectId': req.body.projectId }).lean().exec();

    if (!groupExist) {
      newGroupCall.save(function (err, result) {
        if (err) return;

        groupCall.findOne({ 'status': 1, 'projectId': req.body.projectId }, {}, { sort: { 'created_at': -1 } }).populate('groupId').exec(function (err, groupC) {
          groupCall.updateOne(
            { '_id': groupC._id, 'projectId': req.body.projectId, "status": 1, "members": { "$ne": req.body.callerId } },
            { $push: { 'members': req.body.callerId, 'fixedJoinedMembers': req.body.callerId } }).exec();

          res.send(groupC);
        });
      });
    }
    else {
      groupCall.updateOne(
        { 'groupId': req.body.groupId, 'projectId': req.body.projectId }, { $set: { 'status': 1 } }
      ).exec();

      groupCall.updateOne(
        { 'groupId': req.body.groupId, 'projectId': req.body.projectId, "status": 1, "members": { "$ne": req.body.callerId } },
        { $push: { members: req.body.callerId } }).exec();

      res.send(groupExist);
    }
  }

  router.joinCallGroup = (req, res) => {
    groupCall.updateOne(
      { 'groupId': req.body.groupId, 'projectId': req.body.projectId, "status": 1, "members": { "$ne": req.body.member } },
      { $push: { 'members': req.body.member, 'fixedJoinedMembers': req.body.member } },
    ).exec(function (err, result) {
      if (err) return;

      groupCall.findOne({ 'groupId': req.body.groupId, "status": 1, "projectId": req.body.projectId })
        .populate('members', { name: true, _id: true })
        .populate('groupId')
        .exec(function (err, callingGroup) {
          if (err) return;
          res.send(callingGroup);
        })
    })
  }

  router.leaveCallGroup = async (req, res) => {
    //  console.log('leaveCallGroup >>> ', req.body);
    await groupCall.updateOne({ 'groupId': req.body.groupId, 'projectId': req.body.projectId }, { $pull: { members: req.body.userId } }).lean().exec();
    //  console.log('leaveCallGroup 222');

    groupCall.findOne({ 'groupId': req.body.groupId, "projectId": req.body.projectId }).lean().exec(function (err, result) {
      if (result && result.members.length == 0) {
        // console.log('result: 2');
        // console.log('leaveCallGroup 444');
        const date = new Date().getTime();
        groupCall.findOneAndUpdate({ 'groupId': req.body.groupId, 'projectId': req.body.projectId }, { $set: { 'status': 0, 'closedAt': date } }, { useFindAndModify: false }).lean().exec(
          function (err, _data) {
            // console.log('LEAVE111 :>>>>>>>>>', _data);
            res.json(_data);
          });
      }
      else {
        // let groupCallResult = await groupCall.updateOne({ 'groupId': req.body.groupId, 'projectId': req.body.projectId }, { $set: { 'status': 0, 'closedAt': date } }).lean().exec();
        // if(groupCallResult){
        //   res.send(groupCallResult);
        // }
        // console.log('LEAVE222 :>>>>>>>>>', result);
        // console.log('LEAVE3333 :>>>>>>>>>', result.members);
        // console.log('LEAVE4444 :>>>>>>>>>', result.members[0]);
        res.json({ "status": 0, "message": 'groupCall cant be close', 'data': result });
      }
    });

    // console.log('result0 >>> ', result);
    // console.log('leaveCallGroup 333');
    // console.log('result1 >>> ', result.members);
  }

  router.getCallGroups = (req, res) => {
    // get all groups who are in calling state
    groupCall.find({ status: 1, projectId: req.body.projectId }).populate('members', { name: true, _id: true }).populate('groupId').exec(function (err, callingGroups) {

      var tempGroups = [];
      if (err) return console.log(err);

      var i = 0, j = 0;
      for (i; i < callingGroups.length; i++) {
        j = 0
        for (j; j < callingGroups[i].groupId.members.length; j++) {
          if (req.body.userId == callingGroups[i].groupId.members[j]._id) tempGroups.push(callingGroups[i]);
        }
      }

      res.send(tempGroups);
    });
  }

  router.updateGroupCallStatus = (req, res) => {
    const updatedCall = groupCall.findOneAndUpdate({ '_id': req.body.callId, 'projectId': req.body.projectId },
      { $set: { 'status': req.body.callStatus } }, { useFindAndModify: false }).lean().exec();

    if (req.body.callStatus == 0) {
      const date = new Date().getTime();
      groupCall.findOneAndUpdate({ '_id': req.body.callId, 'projectId': req.body.projectId },
        { $set: { 'closedAt': date } }, { useFindAndModify: false }).lean().exec();
    }

    res.json(updatedCall);
  }

  router.getGroupCalls = async (req, res) => {
    let callGroupHistory = await groupCall.find({ 'members': { $eq: req.params.userId }, 'projectId': req.params.projectId })
      .populate('members', { "_id": true, "name": true, "callStatus": true })
      .lean()
      .exec();
    res.send(callGroupHistory);
  }

  return router;
};
