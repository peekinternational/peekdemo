const userModel = require("../model/users-model");
const friendModel = require("../model/friendModel");
const chatModel = require("../model/chatModel");
const groupsModel = require("../model/groupsModel");
const notifiModel = require("../model/notificationModel");
const projectModel = require("../model/projectModel");
// const helpers = require("../helperfunctions/helpers");
const isImage = require("is-image");
var detectFiletype = require('detect-file-type'); // will be used later to check file type in chat in "AddFiles function"

var path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, (name, password, done) => {
  userModel.findOne({
    $or: [
      {
        $and: [{ email: name }, { password: password }],
      },
      {
        $and: [{ phone: name }, { password: password }]
      }
    ]
  })
    .then((user) => {
      if (!user) {
        return done(null, false, null);
      }
      else {
        userModel.updateOne({
          '_id': user._id
        }, {
          'onlineStatus': 1
        }).exec();

        return done(null, user);
      }

    }).catch(done);
}));


module.exports = function (io, saveUser) {
  // var User;
  // var helper = new helpers(io);
  var router = {};

  router.getProjectData = function (req, res) {
    projectModel
      .findOne({ 'projectId': req.body.projectId, 'status': 1 })
      .lean()
      .exec(function (err, projData) {
        res.send(projData);
      });
  };

  router.unreadMessages = async function (req, res) {
    var userid = req.params._id;
    const unreadMsgsCount = await chatModel.find({ receiverId: userid, isSeen: 0 }).countDocuments().exec();

    if (unreadMsgsCount) res.json({ "unreadMsgs": unreadMsgsCount });
    else res.json({ "unreadMsgs": 0 });
  }

  router.getUsers = async function (req, res) {
    if (req.params.allList == 0) {
      var friendIdData = await friendModel.find({
        'status': { $ne: 0 },
        'projectId': req.params.projectId,
        $or: [
          { userId: req.params.userId },
          { friendId: req.params.userId }
        ]
      })
        .populate({ path: 'friendId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime callStatus readReceipts voiceCallReceive videoCallReceive callStatus', match: { status: 1 } })
        .populate({ path: 'userId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime callStatus readReceipts voiceCallReceive videoCallReceive callStatus', match: { status: 1 } })
        .lean()
        .exec();

      if (!friendIdData || friendIdData.length == 0) {
        let friendTemp = [];
        res.json({ 'usersList': friendTemp });
        return;
      }

      friendData = [];
      for (let i = 0; i < friendIdData.length; i++) {
        if (friendIdData[i].friendId && friendIdData[i].friendId._id != req.params.userId) {
          let tempData1 = friendIdData[i].friendId;
          tempData1["friendReqId"] = friendIdData[i]._id;
          tempData1["friendReqStatus"] = friendIdData[i].status;
          tempData1["friendReqSenderId"] = friendIdData[i].userId._id;
          tempData1.updatedByMsg = friendIdData[i].updatedByMsg;

          // ==============================
          var unreadMsgCount = await chatModel.find({ "projectId": req.params.projectId, "senderId": friendIdData[i].friendId._id, "receiverId": req.params.userId, isSeen: 0, status: 1, receiptStatus: 1 }).countDocuments().lean().exec();
          tempData1["usCount"] = unreadMsgCount;

          var latestMsg = await chatModel.findOne({
            "projectId": req.params.projectId,
            "deletedBy": { $ne: req.params.userId },
            $or: [
              { "senderId": friendIdData[i].friendId._id, "receiverId": req.params.userId },
              { "senderId": req.params.userId, "receiverId": friendIdData[i].friendId._id }
            ]
          }, {}, { sort: { 'createdAt': -1 } }).lean().exec();

          if (latestMsg) tempData1["latestMsg"] = latestMsg;
          else {
            tempData1["latestMsg"] = {};
            tempData1.latestMsg["message"] = "";
          }
          // ==============================

          let isBlockedByFriend = await userModel.findOne({ '_id': tempData1._id, 'blockedUsers': { $eq: req.params.userId } }, { useFindAndModify: false }).lean().exec();

          let exist = await userModel.findOne({
            '_id': req.params.userId, $or: [
              { 'blockedUsers': { $eq: tempData1._id } }, { 'hiddenUsers': { $eq: tempData1._id } }, { 'hiddenO2OChatUsers': { $eq: tempData1._id } }
            ]
          }, { useFindAndModify: false }).lean().exec();

          if (!exist && !isBlockedByFriend) friendData.push(tempData1);
        }
        else if (friendIdData[i].userId && friendIdData[i].userId._id != req.params.userId) {
          let tempData2 = friendIdData[i].userId;
          tempData2["friendReqId"] = friendIdData[i]._id;
          tempData2["friendReqStatus"] = friendIdData[i].status;
          tempData2["friendReqSenderId"] = friendIdData[i].userId._id;
          tempData2.updatedByMsg = friendIdData[i].updatedByMsg;

          // ==============================
          var unreadMsgCount = await chatModel.find({ "projectId": req.params.projectId, "senderId": friendIdData[i].userId._id, "receiverId": req.params.userId, isSeen: 0, status: 1, receiptStatus: 1 }).countDocuments().lean().exec();
          tempData2["usCount"] = unreadMsgCount;

          var latestMsg = await chatModel.findOne({
            "projectId": req.params.projectId,
            "deletedBy": { $ne: req.params.userId },
            $or: [
              { "senderId": friendIdData[i].userId._id, "receiverId": req.params.userId },
              { "senderId": req.params.userId, "receiverId": friendIdData[i].userId._id }
            ]
          }, {}, { sort: { 'createdAt': -1 } }).lean().exec();

          if (latestMsg) tempData2["latestMsg"] = latestMsg;
          else {
            tempData2["latestMsg"] = {};
            tempData2.latestMsg["message"] = "";
          }
          // ==============================

          let isBlockedByFriend = await userModel.findOne({ '_id': tempData2._id, 'blockedUsers': { $eq: req.params.userId } }, { useFindAndModify: false }).lean().exec();

          let exist = await userModel.findOne({
            '_id': req.params.userId, $or: [
              { 'blockedUsers': { $eq: tempData2._id } }, { 'hiddenUsers': { $eq: tempData2._id } }, { 'hiddenO2OChatUsers': { $eq: tempData2._id } }
            ]
          }, { useFindAndModify: false }).lean().exec();

          if (!exist && !isBlockedByFriend) friendData.push(tempData2);
        }

        if (friendData[i]) {
          if (i == friendIdData.length - 1) {
            var myselfData = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId }, { password: false }).lean().exec();
            friendData.push(myselfData);
            res.json({ 'usersList': friendData });
          }
        }
        else if (!friendData[i] && i == friendIdData.length - 1) {
          res.json({ 'usersList': friendData });
        }
      }
    } else {
      userModel.find({
        _id: { $ne: req.params.userId },
        isAdmin: { $ne: 1 },
        status: 1,
        projectId: req.params.projectId
      }, {}, { sort: "-updatedAt" })
        .lean()
        .exec(function (err, data) {
          res.json({ 'usersList': data });
        });
    }
  };

  router.chat = function (req, res) {
    console.log(req.body);

    var chatType = req.body.msgData.chatType;
    var sender = req.body.msgData.senderId;
    var name = req.body.msgData.senderName;
    var receiver = req.body.msgData.receiverId;
    var message = req.body.msgData.message;
    var senderImage = req.body.msgData.senderImage;
    var receiverImage = req.body.msgData.receiverImage;
    var messageType = req.body.msgData.messageType;
    var isSeen = req.body.msgData.isSeen;
    var receiptStatus = req.body.msgData.receiptStatus;

    if (chatType == 0) {
      newMessage = new chatModel({
        senderId: sender,
        senderName: name,
        receiverId: receiver,
        message: message,
        messageType: messageType,
        isSeen: isSeen,
        receiptStatus: receiptStatus,
        senderImage: senderImage,
        receiverImage: receiverImage,
        projectId: req.body.projectId
      });
    } else if (chatType == 1) {
      newMessage = new chatModel({
        commentId: req.body.msgData.commentId,
        senderId: req.body.msgData.senderId,
        receiverId: req.body.msgData.receiverId,
        senderName: req.body.msgData.senderName,
        chatType: chatType,
        receiptStatus: receiptStatus,
        message: req.body.msgData.message,
        projectId: req.body.projectId
      });
    }
    else if (chatType == 2) {
      newMessage = new chatModel({
        senderId: req.body.msgData.senderId,
        receiverId: req.body.msgData.receiverId,
        senderName: req.body.msgData.senderName,
        chatType: chatType,
        message: req.body.msgData.message,
        projectId: req.body.projectId
      });
    }
    else if (chatType == 3) {
      newMessage = new chatModel({
        chatType: 3,
        senderId: sender,
        senderName: name,
        receiverId: receiver,
        message: message,
        messageType: 3,
        isSeen: isSeen,
        senderImage: senderImage,
        receiverImage: receiverImage,
        projectId: req.body.projectId
      });
    }

    newMessage.save(function (err, data) {
      if (err) throw err;

      userModel.updateOne({ "_id": receiver._id, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: sender._id } }, { $pull: { "clearedUsersChat": sender._id } }, { useFindAndModify: false }).lean().exec();
      userModel.updateOne({ "_id": sender._id, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: receiver._id } }, { $pull: { "clearedUsersChat": receiver._id } }, { useFindAndModify: false }).lean().exec();

      if (chatType != 2 && req.body.selectedUserData) {
        let date_ob = new Date();

        friendModel.updateOne(
          {
            projectId: req.body.projectId,
            $or: [
              {
                $and: [{ 'userId': sender._id, 'friendId': receiver._id }],
              },
              {
                $and: [{ 'userId': receiver._id, 'friendId': sender._id }]
              }
            ]
          },
          { $set: { updatedByMsg: date_ob } }
        )
          .exec(function (err, data) {
            if (err) console.log(err);
          });
      }

      if (chatType == 0) {
        //  userModel.updateOne({ '_id': receiver, 'projectId': req.body.projectId }, { $set: { latestMessage: message } }).exec();

        chatModel
          .findOne({ senderId: sender, receiverId: receiver, projectId: req.body.projectId })
          .populate("senderId", { _id: true, name: true })
          .populate("receiverId", { _id: true, name: true })
          .sort({ updatedAt: -1 })
          .exec(function (err, data) {
            res.json(data);
          });
      } else {
        //  userModel.updateOne({ '_id': receiver, 'projectId': req.body.projectId }, { $set: { latestMessage: message } }).exec();

        chatModel.findOne({
          commentId: req.body.msgData.commentId,
          senderId: sender,
          receiverId: receiver,
          projectId: req.body.projectId
        })
          .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
          .populate("senderId", { _id: true, name: true })
          .populate("receiverId", { _id: true, name: true })
          .sort({ updatedAt: -1 })
          .exec(function (err, data) {
            res.json(data);
          });
      }
    });

    // -------------- O2O CHAT NOTIFICATION --------------------------
    // newNotification = new notifiModel({
    //   "senderId": sender,
    //   "receiverId": receiver,
    //   "title": "Message",
    //   "body": (name + " has sent you a message"),
    //   "image": senderImage,
    //   "notificationType": 0
    // });
    // newNotification.save();
    // -------------- ********************* --------------------------
  };

  router.chatWithId = function (req, res) {
    var sender = req.params._id;
    var projectId = req.params.projectId;

    // console.log("chatWithId: ", req.params);
    userModel.updateOne({ '_id': sender, 'projectId': projectId }, { $set: { chatWithRefId: "" } }).exec();
    userModel.updateOne({ '_id': sender, 'projectId': projectId }, { $set: { lastActiveTime: Date.now() } }).exec();
    res.json({ status: true });
  };

  router.updateCallStatus = function (req, res) {
    if (req.body.userId != "")
      userModel.updateOne({ _id: req.body.userId, 'projectId': req.body.projectId }, { $set: { callStatus: req.body.status } }).exec();

    if (req.body.friendId != "")
      userModel.updateOne({ _id: req.body.friendId, 'projectId': req.body.projectId }, { $set: { callStatus: req.body.status } }).exec();
    res.json({ status: true });
  };


  // ---------- needs recheck ------------------
  router.getChat = async function (req, res) {
    var sender = req.params.senderId;
    var receiver = req.params.receiverId;
    var projectId = req.params.projectId;
    var msgCountLimit = parseInt(req.params.limit);
    var chatHideStatus = req.params.chatHideStatus; // NEEDS RECHECK ....
    //var receiptStatus = req.params.receiptStatus;

    //  console.log("getChat:> ", req.params);
    // needs recheck
    chatModel.updateMany(
      { senderId: receiver, receiverId: sender, isSeen: 0, receiptStatus: 1, projectId: projectId },
      { $set: { isSeen: 1 } }
    )
      .exec(function (err, data) {
        chatModel.find({
          "status": 1,
          "projectId": projectId,
          "deletedBy": { $ne: sender },
          $or: [
            { "senderId": sender, "receiverId": receiver },
            { "senderId": receiver, "receiverId": sender }
          ]
        })
          .populate("receiverId", { _id: true, name: true, user_image: true })
          .populate("senderId", { _id: true, name: true, user_image: true })
          .sort({ createdAt: -1 })
          .limit(msgCountLimit)
          .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
          .lean()
          .exec(function (err, data) {
            if (err) throw err;
            data.reverse();
            userModel
              .updateOne({ _id: sender, projectId: projectId }, { $set: { chatWithRefId: receiver } })
              .exec();
            res.json(data);
          });
      });
  };

  router.getDocumentChat = async function (req, res) {
    var senderId = req.params.senderId;
    var receiverId = req.params.receiverId;

    const result = await chatModel.find({
      $or: [
        { 'senderId': senderId, 'receiverId': receiverId },
        { 'senderId': receiverId, 'receiverId': senderId }
      ], "messageType": 2
    }).sort({ createdAt: -1 }).lean().exec();

    res.json(result);
  }

  router.getImageChat = async function (req, res) {
    var userId = req.body.userId;
    var d = new Date();
    d.setMonth(d.getMonth() - 4);

    const result = await chatModel.aggregate([
      { $match: { 'messageType': 1, 'createdAt': { $gte: d }, $or: [{ 'senderId': mongoose.Types.ObjectId(userId) }, { 'receiverId': mongoose.Types.ObjectId(userId) }] } },
      {
        $addFields: {
          'chatMonth': { $month: "$createdAt" },
          'chatYear': { $year: "$createdAt" }
        }
      }
    ]);

    res.json(result);
  }
  router.getAllImageChat = async function (req, res) {
    var projectId = req.body.projectId;
    var userId = req.body.userId;
    var d = new Date();
    d.setMonth(d.getMonth() - 4);
    const result = await chatModel.find({ 'messageType': 1, 'projectId': projectId, "deletedBy": { $ne: userId }, "isDeleted": { $ne: 1 }, 'createdAt': { $gte: d }, $or: [{ 'senderId': userId }, { 'receiverId': userId }] }).sort({ createdAt: -1 }).lean().exec();
    res.json(result);
  }

  router.getAllDocumentChat = async function (req, res) {
    var projectId = req.body.projectId;
    var userId = req.body.userId;
    var d = new Date();
    d.setMonth(d.getMonth() - 4);
    const result = await chatModel.find({ 'messageType': 2, 'projectId': projectId, 'createdAt': { $gte: d }, $or: [{ 'senderId': userId }, { 'receiverId': userId }] }).sort({ createdAt: -1 }).lean().exec();
    res.json(result);
  }

  router.getLinksChat = async function (req, res) {
    var senderId = req.params.senderId;
    var receiverId = req.params.receiverId;

    const result = await chatModel.find({
      $or: [
        { 'senderId': senderId, 'receiverId': receiverId },
        { 'senderId': receiverId, 'receiverId': senderId }
      ], "messageType": 4
    }).sort({ createdAt: -1 }).lean().exec();

    res.json(result);
  }


  router.getMoreChat = function (req, res) {
    var sender = req.params.senderId;
    var receiver = req.params.receiverId;
    var projectId = req.params.projectId;
    var msgCountLimit = parseInt(req.params.limit);
    var chatTime = req.params.chatTime;

    chatModel
      .find({
        createdAt: { $lt: chatTime },
        projectId: projectId,
        $or: [
          { senderId: sender, receiverId: receiver },
          { senderId: receiver, receiverId: sender }
        ]
      })

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
  };

  router.downloadFile = function (req, res) {
    var filename = req.params.filename;
    filepath = path.join(__dirname, "../images/chatImages") + "/" + filename;
    res.download(filepath);
  };


  router.checkSession = function (req, res, next) {
    userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId })
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }
        return res.json({ user: user.toAuthJSON() });
      });
  };


  router.login = function (req, res, next) {
    console.log('login ', req.body);
    if (!req.body.name) {
      return res.status(422).json({
        errors: {
          name: 'is required',
        },
      });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      var _passportUser = passportUser;
      if (err) {
        return next(err);
      }

      userModel.findOne({
        'projectId': req.body.projectId, 'email': req.body.name, 'password': req.body.password
      }).exec(function (err, result1) {
        // console.log("result1:::", result1);
        if (result1 && result1.emailConfirm == 0) return res.json({ 'status': 0, 'message': 'email not verified' });
        if (result1 && result1.emailConfirm == 1) {
          userModel.findOneAndUpdate({ '_id': passportUser._id }, { 'onlineStatus': 1, "callStatus": 0, "status": 1 }, { useFindAndModify: false })
            .populate([
              {
                path: 'hiddenUsers', select: '_id name email userId'
              },
              {
                path: 'blockedUsers', select: '_id name email userId'
              }
            ]).lean().exec(function (err, result2) {

              if (_passportUser) {
                // _passportUser.onlineStatus = 1;
                const user = result1;
                //  console.log("user: ", user);
                user.onlineStatus = 1;
                user.token = result1.generateJWT();
                let userData = user.toAuthJSON();
                result1.token = userData.token;
                result1["usCount"] = 0;
                result1["latestMsg"] = {};
                result1.latestMsg["message"] = "";
                // console.log("result: ", result1);
                return res.json({ 'status': 3, 'user': result1 });
              }
              return res.json(result1);
            });
        }
        else if (!result1) {
          return res.json({ 'status': 2, 'message': 'user does not exist' });
        }
      })

    })(req, res, next);
  }

  router.loginwebsite = function (req, res, next) {
    //   console.log('login ', req.body);
    if (!req.body.name) {
      return res.status(422).json({
        errors: {
          name: 'is required',
        },
      });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      var _passportUser = passportUser;
      if (err) {
        return next(err);
      }

      userModel.findOne({
        'projectId': req.body.projectId, 'email': req.body.name
      }).exec(function (err, result) {
        //   console.log("result:::", result);
        if (result && result.emailConfirm == 0) return res.json({ 'status': 0, 'message': 'email not verified' });
        if (result && result.emailConfirm == 1) {
          userModel.findOneAndUpdate({ '_id': passportUser._id }, { 'onlineStatus': 1, "callStatus": 0 }, { useFindAndModify: false })
            .populate([
              {
                path: 'hiddenUsers', select: '_id name email userId'
              },
              {
                path: 'blockedUsers', select: '_id name email userId'
              }
            ]).lean().exec(function (err, result) {

              if (_passportUser) {
                _passportUser.onlineStatus = 1;
                const user = _passportUser;
                user.token = _passportUser.generateJWT();
                let userData = user.toAuthJSON();
                result.token = userData.token;
                result["usCount"] = 0;
                result["latestMsg"] = {};
                result.latestMsg["message"] = "";

                return res.json({ 'status': 3, 'user': result });
              }
              return res.json(info);
            });
        }
        else if (!result) {
          return res.json({ 'status': 2, 'message': 'user does not exist' });
        }
      })

    })(req, res, next);
  }

  router.deleteMsg = function (req, res) {
    var msgId = req.params.msgId;
    chatModel.findByIdAndUpdate(msgId, { isDeleted: 1 }, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  };

  // No projectId is set on this query right now ...
  router.updateChat = function (req, res) {
    var chatId = req.body.id;
    var message = req.body.msgData.message;
    chatModel.findByIdAndUpdate(
      chatId,
      { message: message },
      { new: true },
      function (err, data) {
        if (err) throw err;
        // helper.addNewMessage(data);
        res.json(data);
      }
    );
  };

  router.addfiles = function (req, res, next) {
    let isFileImage = 1;
    var _messageType = 0;
    let _message;

    let data = {
      'senderId': req.body.senderId,
      'receiverId': req.body.friendId,
      'messageType': req.body.messageType,
      'projectId': req.body.projectId
    };
    console.log("addfiles: ", req.body);

    for (var i = 0; i < req.files.length; i++) {

      if (req.body.isFromMobile == '1') {
        // if (isImage("./images/chatImages/" + req.files[i].originalname)) {
        //   _messageType = 1; console.log("11111");
        // } else {
        //   _messageType = 2; console.log("22222");

        //   if (data.hasOwnProperty("messageType")) {
        //     _messageType = req.body.messageType;
        //     console.log("33333");
        //     if (req.body.messageType == 7) {
        //       _message = req.body.message;
        //     }
        //   }
        // }

        _messageType = req.body.messageType;
        if (req.body.messageType == 7) {
          _message = req.body.message;
        }
        else
          _message = req.files[i].originalname;

        //console.log(_messageType);

        if (req.body.isGroup == 0) {
          var newchat = new chatModel({
            senderId: req.body.senderId,
            receiverId: req.body.friendId,
            message: _message,//req.files[i].originalname,//(totalTime + '-' + req.files[i].originalname),
            messageType: _messageType,
            projectId: req.body.projectId,
            receiptStatus: req.body.receiptStatus
          });

          // ------------------------- UPLOAD FILE O2O CHAT NOTIFICATION ---------------------------------
          // let senderData = await userModel.findOne({ "_id": req.body.senderId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

          // newNotification = new notifiModel({
          //   "senderId": req.body.senderId,
          //   "receiverId": req.body.groupId,
          //   "title": "Message",
          //   "body": (senderData.name + " sent you a message"),
          //   "image": senderData.user_image,
          //   "notificationType": 0
          // });
          // newNotification.save();
          // -------------------- ********************* --------------------------

          userModel.updateOne({ "_id": req.body.friendId, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: req.body.senderId } }, { $pull: { "clearedUsersChat": req.body.senderId } }, { useFindAndModify: false }).lean().exec();
          userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: req.body.friendId } }, { $pull: { "clearedUsersChat": req.body.friendId } }, { useFindAndModify: false }).lean().exec();
        }
        else {
          var newchat = new chatModel({
            groupId: req.body.groupId,
            senderId: req.body.senderId,
            isGroup: 1,
            message: _message,//req.files[i].originalname,//(totalTime + '-' + req.files[i].originalname),
            messageType: _messageType,
            projectId: req.body.projectId
          });


          // ------------------------- UPLOAD FILE GROUP CHAT NOTIFICATION ---------------------------------
          // let senderData = await userModel.findOne({ "_id": req.body.senderId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

          // newNotification = new notifiModel({
          //   "senderId": req.body.senderId,
          //   "receiverId": req.body.groupId,
          //   "title": "Message",
          //   "body": (senderData + " sent you a message"),
          //   "image": senderData.user_image,
          //   "notificationType": 1
          // });
          // newNotification.save();
          // -------------------- ********************* --------------------------

          userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersGroupChat': { $eq: req.body.groupId } }, { $pull: { "clearedUsersGroupChat": req.body.groupId } }, { useFindAndModify: false }).lean().exec();
        }

        newchat.save(function (err, data) {
          if (err) throw err;

          res.json({ 'file': req.files, 'data': data });
        });


      } else {
        detectFiletype.fromFile('./images/chatImages/' + (req.files[i].originalname), function (err, result) {
          if (err) console.log(err);
          //  console.log(result, 'extensiiii'); // { ext: 'jpg', mime: 'image/jpeg' }
          if (result == null) {
            _messageType = 2;
          } else {
            if (result.ext == "jpg" || result.ext == "png" || result.ext == "gif" || result.ext == "tif" || result.ext == "bmp" || result.ext == "psd" || result.ext == "webp" || result.ext == "ico") {
              //  console.log('image');
              _messageType = 1;
            }
            else if (result.ext == "3gp" || result.ext == "wav" || result.ext == "mkv" || result.ext == "mpg" || result.ext == "mp3" || result.ext == "ogg" || result.ext == "mp4") {
              _messageType = 5;
              // console.log('video');
            }
            else if (result.ext == "m4a") {
              _messageType = 6;
              // console.log('video');
            } else {
              _messageType = 2;
            }
          }
        });
        let _message = req.files[i].originalname;
        setTimeout(function () {

          // console.log(_messageType);
          // console.log("hasOwwn: ", data.hasOwnProperty('messageType'))
          // if (data.hasOwnProperty('isMobile') || data.hasOwnProperty('messageType')) {   // recheck needed video
          //   isFileImage = req.body.messageType;console.log("33333");
          // }

          if (req.body.isGroup == 0) {
            var newchat = new chatModel({
              senderId: req.body.senderId,
              receiverId: req.body.friendId,
              message: _message,//req.files[i].originalname,//(totalTime + '-' + req.files[i].originalname),
              messageType: _messageType,
              projectId: req.body.projectId
            });

            userModel.updateOne({ "_id": req.body.friendId, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: req.body.senderId } }, { $pull: { "clearedUsersChat": req.body.senderId } }, { useFindAndModify: false }).lean().exec();
            userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersChat': { $eq: req.body.friendId } }, { $pull: { "clearedUsersChat": req.body.friendId } }, { useFindAndModify: false }).lean().exec();
          }
          else {
            var newchat = new chatModel({
              groupId: req.body.groupId,
              senderId: req.body.senderId,
              isGroup: 1,
              message: _message,//req.files[i].originalname,//(totalTime + '-' + req.files[i].originalname),
              messageType: _messageType,
              projectId: req.body.projectId
            });

            userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersGroupChat': { $eq: req.body.groupId } }, { $pull: { "clearedUsersGroupChat": req.body.groupId } }, { useFindAndModify: false }).lean().exec();
          }

          newchat.save(function (err, data) {
            if (err) throw err;
            res.json({ 'file': req.files, 'data': data });
          });
        }, 2000);
      }
    }
  };

  router.setPerStatus = async (req, res) => {
    await userModel.updateOne({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'pStatus': req.body.pStatus } }).lean().exec();
    let updatedResult = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }, { password: false }, { useFindAndModify: true }).lean().exec();
    res.json(updatedResult);
  };

  router.getPerStatus = (req, res) => {
    userModel.findOne(
      { '_id': req.params.userId, 'projectId': req.params.projectId }, { _id: true, name: true, email: true, pStatus: true }, { useFindAndModify: true },
      function (err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  };

  router.setOnlineStatus = async (req, res) => {
    console.log("called: ", req.body);
    
    userModel.updateOne({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'onlineStatus': req.body.onlineStatus } }).lean().exec();
    res.json({ status: true });
  }


  router.userLastSeen = (req, res) => {
    userModel.updateOne({ _id: req.body.userId }, { $set: { lastActiveTime: new Date() } }).exec();
    res.json({ status: true });
  }

  router.getSingleUser = async function (req, res) {
    var userData = await userModel.findById(req.params.userId, { password: false });
    res.json(userData);
  }

  // ====================================== FOR MOBILE ONLY ==============================================
  router.mobileLogin = async function (req, res, next) {
    //  console.log('login ', req.body);

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      var _passportUser = passportUser;
      if (err) {
        return next(err);
      }

      userModel.findOne({
        'projectId': req.body.projectId, 'email': req.body.name, 'password': req.body.password
      }).exec(function (err, result) {
        //console.log("result:::", result);
        if (result && result.emailConfirm == 0) return res.json({ 'emailVerified': 0, 'personalInfo': 0, 'userData': result });
        if (result && result.emailConfirm == 1) {
          userModel.findOne({ '_id': passportUser._id }, { userId: true }).lean().exec(function (err, userIdExist) {
            //console.log("userIdExist: ", userIdExist);
            if (userIdExist.userId == "") return res.json({ 'emailVerified': 1, 'personalInfo': 0, 'userData': result });
            else {
              userModel.findOneAndUpdate({ '_id': passportUser._id }, { 'onlineStatus': 1, "callStatus": 0 }, { useFindAndModify: false })
                .populate([
                  {
                    path: 'hiddenUsers', select: '_id name email userId'
                  },
                  {
                    path: 'blockedUsers', select: '_id name email userId'
                  }
                ]).exec(function (err, result) {

                  if (_passportUser) {
                    _passportUser.onlineStatus = 1;
                    const user = _passportUser;
                    user.token = _passportUser.generateJWT();
                    let userData = user.toAuthJSON();
                    result.token = userData.token;
                    return res.json({ 'emailVerified': 1, 'personalInfo': 1, 'userData': result });
                  }
                  return res.json({ 'emailVerified': 1, 'personalInfo': 1, 'userData': info });
                });
            }
          });
        }
        else if (!result) {
          return res.json({ 'status': 2, 'message': 'user does not exist' });
        }
      })

    })(req, res, next);
  }

  router.getGroup_Users = async function (req, res) {

    userModel.update({ '_id': req.params.userId }, { 'onlineStatus': 1 }).exec();

    var friendIdData = await friendModel.find({
      $or: [
        {
          $and: [{ userId: req.params.userId }, { status: 1 }],
        },
        {
          $and: [{ friendId: req.params.userId }, { status: 1 }]
        }
      ]
    })
      .populate({ path: 'friendId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime callStatus readReceipts voiceCallReceive videoCallReceive callStatus', match: { status: 1 } })
      .populate({ path: 'userId', select: '_id status seenStatus pStatus onlineStatus name chatWithRefId email country phone user_image userId projectId updatedByMsg createdAt UpdatedAt lastActiveTime callStatus readReceipts voiceCallReceive videoCallReceive callStatus', match: { status: 1 } })
      .lean()
      .exec();

    var unseenUsers = await userModel.findOne({ '_id': req.params.userId, status: 1 }, { hiddenUsers: true, hiddenGroups: true, clearedUsersChat: true, clearedUsersGroupChat: true, blockedUsers: true }, { useFindAndModify: false }).exec();

    if (!friendIdData || friendIdData.length == 0) res.json([{ message: "no friends found", status: 0 }]);
    friendData = [];

    for (let i = 0; i < friendIdData.length; i++) {
      if (friendIdData[i].friendId != null && friendIdData[i].friendId._id != req.params.userId) {
        let tempData1 = friendIdData[i].friendId;
        tempData1["friendReqId"] = friendIdData[i]._id;
        tempData1["friendReqStatus"] = friendIdData[i].status;
        tempData1["friendReqSenderId"] = friendIdData[i].friendId._id;

        var unreadMsgCount = await chatModel.find({ senderId: friendIdData[i].friendId._id, receiverId: req.params.userId, isSeen: 0, receiptStatus: 1 }).countDocuments().lean().exec();
        //  console.log(req.params.userId , " <==> ", friendIdData[i].friendId._id  , "::: unreadMsgCount: ", unreadMsgCount);
        tempData1["usCount"] = unreadMsgCount;
        //   else tempData1["usCount"] = 0;

        var latestMsg = await chatModel.findOne({
          deletedBy: { $ne: req.params.userId },
          $or: [
            { senderId: friendIdData[i].friendId, receiverId: req.params.userId },
            { senderId: req.params.userId, receiverId: friendIdData[i].friendId }
          ]
        }, {}, { sort: { 'createdAt': -1 } }).lean().exec();
        tempData1["latestMsg"] = latestMsg;

        let muteStatus = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'mutedUsers': { $eq: friendIdData[i].friendId } }, { useFindAndModify: false }).lean().exec();
        if (muteStatus)
          tempData1["muteStatus"] = true;
        else
          tempData1["muteStatus"] = false;

        let hideStatus = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'hiddenUsers': { $eq: friendIdData[i].friendId } }, { useFindAndModify: false }).lean().exec();
        if (hideStatus)
          tempData1["hideStatus"] = true;
        else
          tempData1["hideStatus"] = false;

        if (req.params.hideStatus == 0 && req.params.clearedUserStatus == 0) {
          let isInsideHiddenList;
          let isInsideClearedList;
          let isInsideBlockedList;
          //  console.log("unseenUsers: ", unseenUsers);
          if (unseenUsers && unseenUsers.hiddenUsers) isInsideHiddenList = unseenUsers.hiddenUsers.includes(tempData1._id);
          if (unseenUsers && unseenUsers.clearedUsersChat) isInsideClearedList = unseenUsers.clearedUsersChat.includes(tempData1._id);
          if (unseenUsers && unseenUsers.blockedUsers) isInsideBlockedList = unseenUsers.blockedUsers.includes(tempData1._id);

          // console.log("isInsideBlockedList: ", isInsideBlockedList);
          if (!isInsideHiddenList && !isInsideClearedList && !isInsideBlockedList)
            friendData.push(tempData1);
        }
        else friendData.push(tempData1);
      }
      else if (friendIdData[i].userId != null && friendIdData[i].userId._id != req.params.userId) {
        let tempData2 = friendIdData[i].userId;
        tempData2["friendReqId"] = friendIdData[i]._id;
        tempData2["friendReqStatus"] = friendIdData[i].status;
        tempData2["friendReqSenderId"] = friendIdData[i].userId._id;

        var unreadMsgCount = await chatModel.find({ senderId: friendIdData[i].userId._id, receiverId: req.params.userId, isSeen: 0, receiptStatus: 1 }).countDocuments().lean().exec();
        //   console.log(req.params.userId , " <==> ", friendIdData[i].userId._id  , "::: unreadMsgCount: ", unreadMsgCount);
        tempData2["usCount"] = unreadMsgCount;
        //  else tempData2["usCount"] = 0;

        var latestMsg = await chatModel.findOne({
          deletedBy: { $ne: req.params.userId },
          $or: [
            { senderId: friendIdData[i].userId, receiverId: req.params.userId },
            { senderId: req.params.userId, receiverId: friendIdData[i].userId }
          ]
        }, {}, { sort: { 'createdAt': -1 } }).lean().exec();
        tempData2["latestMsg"] = latestMsg;

        let muteStatus = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'mutedUsers': { $eq: friendIdData[i].userId } }, { useFindAndModify: false }).lean().exec();
        if (muteStatus)
          tempData2["muteStatus"] = true;
        else
          tempData2["muteStatus"] = false;

        let hideStatus = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'hiddenUsers': { $eq: friendIdData[i].userId } }, { useFindAndModify: false }).lean().exec();
        if (hideStatus)
          tempData2["hideStatus"] = true;
        else
          tempData2["hideStatus"] = false;

        if (req.params.hideStatus == 0 && req.params.clearedUserStatus == 0) {
          let isInsideHiddenList;
          let isInsideClearedList;
          let isInsideBlockedList;
          // console.log("unseenUsers: ", unseenUsers);
          if (unseenUsers && unseenUsers.hiddenUsers) isInsideHiddenList = unseenUsers.hiddenUsers.includes(tempData2._id);
          if (unseenUsers && unseenUsers.clearedUsersChat) isInsideClearedList = unseenUsers.clearedUsersChat.includes(tempData2._id);
          if (unseenUsers && unseenUsers.blockedUsers) isInsideBlockedList = unseenUsers.blockedUsers.includes(tempData2._id);

          //console.log("isInsideBlockedList: ", isInsideBlockedList);
          if (!isInsideHiddenList && !isInsideClearedList && !isInsideBlockedList)
            friendData.push(tempData2);
        }
        else friendData.push(tempData2);
      }

      if (i == friendIdData.length - 1) {
        //  console.log("friendData: ", friendData);
        var myselfData = await userModel.findOne({ '_id': req.params.userId }, { password: false }).lean().exec();
        friendData.push(myselfData);

        // -------------- GROUPS GET -----------------------------------------------------------------------------------------
        var groups = await groupsModel.find({ status: 1, projectId: req.params.projectId, "members": req.params.userId })
          .populate("members").lean().exec();

        //   console.log("groups: ", groups);
        var filteredGroups = [];

        if (groups.length != 0) {
          for (var g = 0; g < groups.length; g++) {
            var unreadMsgCount = await chatModel.find({ groupId: groups[g]._id, isSeen: 0, senderId: { $ne: req.params.userId } }).countDocuments().lean().exec();
            groups[g]["usCount"] = unreadMsgCount;
            var latestMsg = await chatModel.findOne({ groupId: groups[g]._id, deletedBy: { $ne: req.params.userId } }, {}, { sort: { 'createdAt': -1 } }).lean().exec();
            groups[g]["latestMsg"] = latestMsg;

            if (req.params.hideStatus == 0 && req.params.clearedUserStatus == 0) {
              //  console.log("unseen: ",  unseenUsers.hiddenGroups);
              //  console.log("gIndex: ", g + " ; " +groups[g]._id);

              let isInsideHiddenList;
              if (unseenUsers && unseenUsers.hiddenGroups) isInsideHiddenList = unseenUsers.hiddenGroups.includes(groups[g]._id);
              // let isInsideClearedList = unseenUsers.clearedUsersGroupChat.includes(groups[g]._id);

              if (!isInsideHiddenList) {
                filteredGroups.push(groups[g]);
              }
            }

            // ---------------------------------------------------------------------------------------------------------------
            //console.log(g +" == "+ (groups.length - 1));
            if (g >= groups.length - 1) {
              // console.log("DONE11");
              const combinedList = friendData.concat(filteredGroups);
              // console.log("DONE11222 ", combinedList);
              res.json(combinedList);
            }
          }
        }
        else {
          //  console.log("DONE22");
          res.json(friendData);
        }
      }
    }
  };
  // ====================================== ************* ==============================================

  router.deleteAllChat = async function (req, res) {
    //  console.log("deleteAllChat: ", req.body);

    if (req.body.deleteGroup == 0)
      chatModel.updateMany(
        {
          "projectId": req.body.projectId,
          'deletedBy': { $ne: req.body.senderId },
          $or: [
            {
              $and: [{ 'senderId': req.body.senderId, 'receiverId': req.body.receiverId }],
            },
            {
              $and: [{ 'senderId': req.body.receiverId, 'receiverId': req.body.senderId }]
            }
          ]
        },
        // { $set: { "status": 0 } }, 
        { $push: { "deletedBy": req.body.senderId } }
      )
        .exec(function (err, data) {
          if (err) res.json(err);
          userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersChat': { $ne: req.body.receiverId } }, { $push: { "clearedUsersChat": req.body.receiverId } }, { useFindAndModify: false }).lean().exec();
          //  console.log(data);
          res.json({ 'status': true, 'message': 'request successful, O2O chat deleted' });
        });

    else {
      chatModel.updateMany({ 'projectId': req.body.projectId, "groupId": req.body.groupId, 'deletedBy': { $ne: req.body.senderId } },
        //  { $set: { status: 0 } 
        {
          $push: { "deletedBy": req.body.senderId }
        })
        .exec(function (err, data) {
          if (err) res.json(err);
          userModel.updateOne({ "_id": req.body.senderId, 'projectId': req.body.projectId, 'clearedUsersGroupChat': { $ne: req.body.groupId } }, { $push: { "clearedUsersGroupChat": req.body.groupId } }, { useFindAndModify: false }).lean().exec();
          //  console.log(data);
          res.json({ 'status': true, 'message': 'request successful, group chat deleted' });
        });
    }

  }

  router.clearAllChats = async function (req, res) {

    chatModel.updateMany(
      {
        'projectId': req.body.projectId,
        'deletedBy': { $ne: req.body.userId },
        $or: [
          { 'senderId': req.body.userId }, { 'receiverId': req.body.userId }
        ]
      },
      { $push: { "deletedBy": req.body.userId } }
    ).lean().exec();

    let groupIds = await groupsModel.find({ "members": req.body.userId, 'projectId': req.body.projectId }, { "_id": true }).lean().exec();
    let updatedGroups = await chatModel.updateMany({ 'groupId': { $in: groupIds }, 'deletedBy': { $ne: req.body.userId } }, { $push: { "deletedBy": req.body.userId } }).lean().exec();

    res.json({ 'status': true, 'message': 'request successful, all chats deleted' });
  }


  router.readAllChat = async function (req, res) {
    //  var receiptStatus = req.body.receiptStatus;
    console.log("readAllChat: ", req.body);
    chatModel.updateMany(
      {
        projectId: req.body.projectId,
        receiptStatus: 1,
        $or: [
          {
            $and: [{ 'senderId': req.body.senderId, 'receiverId': req.body.receiverId }],
          },
          {
            $and: [{ 'senderId': req.body.receiverId, 'receiverId': req.body.senderId }]
          }
        ]
      },
      { $set: { isSeen: 1 } }
    )
      .exec(function (err, data) {
        if (err) res.json(err);
        res.json({ 'status': true, 'message': 'request successful, chat read' });
      });
  }


  router.unreadAllChat = async function (req, res) {
    //  var receiptStatus = req.body.receiptStatus;
    console.log("unreadAllChat: ", req.body);

    chatModel.updateMany(
      {
        'projectId': req.body.projectId,
        // '_id': req.body.chatId,
        'receiptStatus': 1,
        $or: [
          {
            $and: [{ 'senderId': req.body.senderId, 'receiverId': req.body.receiverId }],
          },
          {
            $and: [{ 'senderId': req.body.receiverId, 'receiverId': req.body.senderId }]
          }
        ]
      },
      { $set: { isSeen: 0 } }
    )
      .exec(function (err, data) {
        if (err) res.json(err);
        res.json({ 'status': true, 'message': 'request successful, chat unread' });
      });
  }


  router.chatMessageFind = async function (req, res) {
    var searchResult;
    // console.log(req.body);
    searchResult = await chatModel.find({
      $text: { $search: req.body.searchText, $language: "en" },
      'projectId': req.body.projectId, $or: [
        {
          $and: [{ 'senderId': req.body.userId }, { 'receiverId': req.body.friendId }],
        },
        {
          $and: [{ 'senderId': req.body.friendId }, { 'receiverId': req.body.userId }]
        }
      ]
    })
      .populate("senderId receiverId", '_id name user_image')
      .populate({ path: "commentId", populate: { path: 'senderId', select: '_id name user_image' } })
      .sort({ createdAt: -1 }).lean().exec();

    res.json(searchResult);
  }

  router.groupChatMessageFind = async function (req, res) {
    console.log("groupChatSearch: ", req.body);
    var searchResult;

    searchResult = await chatModel.find({
      $text: { $search: req.body.searchText, $language: "en" },
      'projectId': req.body.projectId,
      'groupId': req.body.groupId
    })
      .populate("senderId receiverId", '_id name user_image')
      .populate({ path: "commentId", populate: { path: 'senderId', select: '_id name user_image' } })
      .sort({ createdAt: -1 }).lean().exec();

    res.json(searchResult);
  }

  router.bookmarkChat = async function (req, res) {
    chatModel.findOneAndUpdate({ '_id': req.body.chatId, 'projectId': req.body.projectId }, { $set: { 'bookmarked': req.body.bookmarkStatus } }, { useFindAndModify: false }).lean().exec();
    res.json({ 'status': 1, 'message': "Chat bookmarked" });
  }

  router.bookmarkMyChat = async function (req, res) {
    console.log("bookmarkMyChat: ", req.body);
    if (req.body.bookmarkStatus == 1) {
      chatModel.findOneAndUpdate({ '_id': req.body.chatId, 'projectId': req.body.projectId, 'bookmarkedChat': { $ne: req.body.userId } }, { $push: { 'bookmarkedChat': req.body.userId } }, { useFindAndModify: false }).lean().exec();
      res.json({ 'status': 1, 'message': "Chat bookmarked" });
    }
    else {
      chatModel.findOneAndUpdate({ '_id': req.body.chatId, 'projectId': req.body.projectId, 'bookmarkedChat': { $eq: req.body.userId } }, { $pull: { 'bookmarkedChat': req.body.userId } }, { useFindAndModify: false }).lean().exec();
      res.json({ 'status': 1, 'message': "Chat bookmarked" });
    }
  }

  router.getMyBookmarkChats = async function (req, res) {
    let bookmarkedChats = await chatModel.find({
      'projectId': req.params.projectId,
      'bookmarkedChat': { $eq: req.params.userId },
      $or: [
        { $and: [{ "senderId": req.params.userId }, { "receiverId": req.params.friendId }] },
        { $and: [{ "senderId": req.params.friendId }, { "receiverId": req.params.userId }] },
      ]
    }, { useFindAndModify: false })
      .populate("receiverId", { _id: true, name: true, user_image: true })
      .populate("senderId", { _id: true, name: true, user_image: true })
      .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    bookmarkedChats.reverse();
    res.json(bookmarkedChats);
  }

  router.getMyBookmarkGroupChats = async function (req, res) {
    let bookmarkedGroupChats = await chatModel.find({
      'projectId': req.params.projectId,
      'bookmarkedChat': { $eq: req.params.userId },
      'groupId': req.params.groupId,
    }, { useFindAndModify: false })
      .populate("senderId", { _id: true, name: true, user_image: true })
      .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

      bookmarkedGroupChats.reverse();
      res.json(bookmarkedGroupChats);
  }


  router.getBookmarkedChats = async function (req, res) {
    let bookmarkedChats = await chatModel.find({
      'projectId': req.params.projectId, 'bookmarked': 1, $or: [
        { 'senderId': req.params.userId }, { 'receiverId': req.params.userId }
      ]
    }, { useFindAndModify: false })
      .populate("receiverId", { _id: true, name: true, user_image: true })
      .populate("senderId", { _id: true, name: true, user_image: true })
      .populate({ path: 'commentId', populate: { path: 'senderId', select: '_id name user_image' } })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    bookmarkedChats.reverse();
    res.json(bookmarkedChats);
  }


  router.getUserMessageCount = async function (req, res) {
    console.log("getUserMessageCount: ", req.params);
    var msgCount = 0;

    let origin = req.get('origin');
    console.log("origin: ", origin);

    if (req.params.userId != null && req.params.userId != "" && req.params.userId != "null")
      msgCount = await chatModel.find({ 'receiverId': req.params.userId, 'projectId': req.params.projectId, isSeen: 0 }).count().lean().exec();
    else return res.json({ 'status': 0, 'msgCount': 0, 'message': "Wrong userId sent" });

    if (msgCount) res.json({ 'status': 1, 'msgCount': msgCount });
    else res.json({ 'status': 0, 'msgCount': 0 });
  }


  return router;
};
