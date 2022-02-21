const groupsModel = require("../model/groupsModel");
const chatModel = require("../model/chatModel");
const userModel = require("../model/users-model");
const todoModel = require("../model/todo-model");

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

// transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'personaluse646@gmail.com',
//       pass: 'tdspgfhrlvcyymhs'
//   }
// });

module.exports = function (io, saveUser) {
  var router = {};

  router.uploadProfilePic = (req, res) => {
    // let minutes = new Date().getMinutes();
    // let hour = new Date().getHours();
    // let year = new Date().getFullYear();
    // let dayOfWeek = new Date().getDay();
    // let totalTime = hour + '-' + minutes + '-' + year + '-' + dayOfWeek;
    // let fullFilename = (totalTime + '-' + req.body.imageName);
    // console.log("uploadProfilePic: ", req.body);

    userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { "user_image": req.body.imageName }, { useFindAndModify: false }).lean().exec();
    res.json(req.body.imageName);
  }

  router.deactivateAccount = (req, res) => {
    const result = userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { "status": 3 }, { useFindAndModify: false }).lean().exec();
    res.json(result);
  };

  router.updateUserName = async function (req, res) {
    // console.log('updateUserName: ', req.body);
    let result = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'name': req.body.newName } }, { useFindAndModify: false }).lean().exec();
    res.json(result);
    //res.json({'status': true, 'message': 'user name changed successfully'});
  }

  router.updateDOB = async function (req, res) {
    userModel.updateOne({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'birth': req.body.newBirth } }).lean().exec();
    res.json({ 'status': true, 'message': 'Date of birth changed successfully' });
  }

  router.updateUserId = async function (req, res) {
    let result = await userModel.findOne({ 'userId': req.body.newUserId, 'projectId': req.body.projectId }, { useFindAndModify: false }).lean().exec();

    if (!result) {
      let result = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'userId': req.body.newUserId } }, { useFindAndModify: false }).lean().exec();
      res.json(result);
    }
    else res.json({ "message": 'UserId not available', "status": 0 });
  }

  router.updatePhone = async (req, res) => {
    let oldPhone = await userModel.findOne({ '_id': req.body.userId, 'phone': req.body.oldPhone, 'projectId': req.body.projectId }, { useFindAndModify: false }).lean().exec();

    if (oldPhone) {
      let resUserData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { "phone": req.body.newPhone } }, { useFindAndModify: false }).lean().exec();
      if (resUserData) res.json({ "status": 1, "data": resUserData, "message": 'Mobile number updated' });
      else res.json({ "status": 0, "message": 'Mobile number update failed' });
    }
    else res.json({ "status": 0, "message": 'Existing mobile number is wrong' });
  }

  router.editPassword = async (req, res) => {
    const userExist = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }).lean().exec();
    if (userExist) {
      if (req.body.oldPassword == userExist.password) {
        userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'password': req.body.newPassword } }, { useFindAndModify: false })
          .then((result) => {
            res.json({ "status": true, 'message': 'Password changed successfully' });
          });
      }
      else return res.json({ "status": false, 'message': 'Old password doesnt match' });
    }
    else
      return res.json({ "status": false, 'message': 'Change password failed, userId incorrect' });
  }

  router.editEmail = async (req, res) => {
    const userExist = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }).lean().exec();

    if (userExist) {
      if (req.body.oldEmail == userExist.email) {
        let tokenNo = Math.floor(Math.random() * 9999999) + 1;
        let mainToken = req.body.userId + tokenNo + "";
        userModel.findOneAndUpdate({ '_id': req.body.userId }, { $set: { "token": mainToken, 'email': req.body.newEmail, "emailConfirm": 0 } }, { useFindAndModify: false }).lean().exec();

        let projectLink = "https://chat.chatto.jp";
  
        mailOptions = {
          from: 'hello@chatto.jp',
          to: req.body.newEmail,
          subject: 'Verify your new email',
          text: "Chatto",
          html:
            `<p><b>Dear, ${userExist.name} </b> Please confirm that you want to use this as your new Chatto email address.` +
            `<br>Click to verify: <a href='${projectLink}/login?verifyid=${userExist._id}'>Verify</a></p>`
        };
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) console.log(error);
          else console.log('Email sent: ' + info.response);
        });
  
        res.json({'status': true, 'message': 'Email change request has been sent' });
      }
      else  return res.json({"status": false, 'message': 'Old email doesnt match' });
    }
    else
      return res.json({"status": false, 'message': 'Change email failed, userId incorrect' });
  }


  router.updateUser = function (req, res) {
    var userId = req.body.userId;
    var name = req.body.name;
    var image = req.body.imageName;
    var skill = req.body.skill;

    userModel.update(
      { "userId": userId, 'projectId': req.body.projectId },
      { $set: { name: name, user_image: image, userTitle: skill } }
    )
      .exec(function (err, result) {
        if (err) res.json(false);
        else res.json(result);
      });
  };

  router.setFavouriteUser = function (req, res) {
    const result = userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { "favourite": req.body.favouriteStatus }, { useFindAndModify: false }).lean().exec();
    res.json(result);
  }

  router.getFavouriteUsers = function (req, res) {
    const result = userModel.find({ "favourite": 1 }).lean().exec();
    res.json(result);
  }


  router.getMessageDocuments = async function (req, res) {
    // console.log('getMessageDocuments :', req.params);
    const result = await chatModel.find({
      'projectId': req.params.projectId, 'messageType': { $ne: 0 },
      $or: [
        { senderId: req.params.userId, receiverId: req.params.friendId },
        { senderId: req.params.friendId, receiverId: req.params.userId }
      ]
    }).lean().exec();
    res.json(result);
  }

  router.getCommonGroups = async function (req, res) {
    // console.log('getCommonGroups: ', req.params);
    var commongroups = await groupsModel.find({
      'projectId': req.params.projectId, "status": 1,
      $and: [
        { "members": { "$eq": req.params.userId } },
        { "members": { "$eq": req.params.friendId } }
      ]
    })
      .lean().exec();

    res.json(commongroups);
  }

  router.hideUser = async function (req, res) {
    console.log('hideUser: ', req.body);
    if (req.body.hideType == 0) {
      if (req.body.hideStatus == 1) {
        await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $push: { 'hiddenUsers': req.body.hideUserId } }, { useFindAndModify: false }).lean().exec();
      }
      else {
        await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $pull: { 'hiddenUsers': req.body.hideUserId } }, { useFindAndModify: false }).lean().exec();
      }
    }
    else {
      if (req.body.hideStatus == 1) {
        await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $push: { 'hiddenGroups': req.body.hideGroupId } }, { useFindAndModify: false }).lean().exec();
      }
      else {
        await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $pull: { 'hiddenGroups': req.body.hideGroupId } }, { useFindAndModify: false }).lean().exec();
      }
    }

    let hiddenData = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }).populate('hiddenUsers').populate('hiddenGroups').lean().exec();
    res.json(hiddenData);
  }

  router.getHiddenUsers = async function (req, res) {
    console.log("getHiddenUsers: ", req.params);
    let _hiddenData = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId }, { 'hiddenUsers': true, 'hiddenGroups': true }).populate('hiddenUsers').populate({ path: 'hiddenGroups', populate: { path: 'members' } }).lean().exec();
    console.log(_hiddenData);
    let extractedHiddenUsers = _hiddenData.hiddenUsers;
    let extractedHiddenGroup = _hiddenData.hiddenGroups;   // FOR LATER USE

    // console.log(extractedHiddenUsers);
    for (let h = 0; h < extractedHiddenUsers.length; h++) {
      var latestMsg = await chatModel.findOne({
        'projectId': req.params.projectId,
        'deletedBy': { $ne: req.params.userId },
        $or: [
          { 'senderId': extractedHiddenUsers[h]._id, 'receiverId': req.params.userId },
          { 'senderId': req.params.userId, 'receiverId': extractedHiddenUsers[h]._id }
        ]
      }, {}, { sort: { 'createdAt': -1 } }).lean().exec();

      extractedHiddenUsers[h]["latestMsg"] = latestMsg;
    }
    //  console.log(extractedHiddenGroup);
    for (let g = 0; g < extractedHiddenGroup.length; g++) {
      var latestMsg = await chatModel.findOne({
        'projectId': req.params.projectId,
        'deletedBy': { $ne: req.params.userId },
        'groupId': extractedHiddenGroup[g]._id
      }, {}, { sort: { 'createdAt': -1 } }).lean().exec();

      extractedHiddenGroup[g]["latestMsg"] = latestMsg;
    }

    const allHiddenData = extractedHiddenUsers.concat(extractedHiddenGroup);
    //  console.log(allHiddenData);
    res.json(allHiddenData);
  }

  router.blockUser = async function (req, res) {
    // console.log('blockUser: ', req.body);

    let blockedList = null;
    if (req.body.blockStatus == 1) {  // block the user
      // userModel.findOneAndUpdate({ '_id': req.body.blockId, 'projectId': req.body.projectId, blockedUsers: { $ne: req.body.userId } }, { $push: { 'blockedUsers': req.body.userId } }, { useFindAndModify: false }).lean().exec();
      await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, blockedUsers: { $ne: req.body.blockId } }, { $push: { 'blockedUsers': req.body.blockId } }, { useFindAndModify: false }).lean().exec();
      blockedList = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }).populate('blockedUsers').lean().exec();
    }
    else {  //unblock the user
      // userModel.findOneAndUpdate({ '_id': req.body.blockId, 'projectId': req.body.projectId, blockedUsers: { $eq: req.body.userId } }, { $pull: { 'blockedUsers': req.body.userId } }, { useFindAndModify: false }).lean().exec();
      await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, blockedUsers: { $eq: req.body.blockId } }, { $pull: { 'blockedUsers': req.body.blockId } }, { useFindAndModify: false }).lean().exec();
      blockedList = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId }).populate('blockedUsers').lean().exec();
    }

    res.json(blockedList);
  }

  router.getBlockedUsers = async function (req, res) {
    //  console.log("getBlockedUsers: ", req.params);
    let _blockedUsers = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId }, { "blockedUsers": true }).populate('blockedUsers').lean().exec();
    // console.log("_blockedUsers: ", _blockedUsers.blockedUsers);
    res.json(_blockedUsers.blockedUsers);
  }

  router.muteUnmute = async function (req, res) {
    // console.log('muteUnmute: ', req.body);

    let userData = null;
    if (req.body.muteType == 0) { // mute user
      if (req.body.muteStatus == 1)
        userData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedUsers': { $ne: req.body.muteId } }, { $push: { 'mutedUsers': req.body.muteId } }, { useFindAndModify: false }).lean().exec();
      else
        userData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedUsers': { $eq: req.body.muteId } }, { $pull: { 'mutedUsers': req.body.muteId } }, { useFindAndModify: false }).lean().exec();
    }
    else { // mute group
      if (req.body.muteStatus == 1)
        userData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedGroups': { $ne: req.body.muteId } }, { $push: { 'mutedGroups': req.body.muteId } }, { useFindAndModify: false }).lean().exec();
      else
        userData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedGroups': { $eq: req.body.muteId } }, { $pull: { 'mutedGroups': req.body.muteId } }, { useFindAndModify: false }).lean().exec();
    }

    res.json(userData);
  }

  router.getMutedInfo = async function (req, res) {
    if (req.body.muteType == 0) {
      let userData = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedUsers': { $eq: req.body.friendId } }, { useFindAndModify: false }).lean().exec();
      if (userData)
        res.json({ "userMuted": true });
      else
        res.json({ "userMuted": false });
    }
    else {
      let userData = await userModel.findOne({ '_id': req.body.userId, 'projectId': req.body.projectId, 'mutedGroups': { $eq: req.body.groupId } }, { useFindAndModify: false }).lean().exec();
      if (userData)
        res.json({ "groupMuted": true });
      else
        res.json({ "groupMuted": false });
    }
  }

  router.getMutedUsers = async (req, res) => {
    let result = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId }, { 'mutedUsers': true }).populate('mutedUsers').lean().exec();
    res.json(result.mutedUsers);
  }

  router.getFriendsProfile = async function (req, res) {
    let friendData = await userModel.findOne({ '_id': req.params.friendId, 'projectId': req.params.projectId }, { password: false, token: false }, { useFindAndModify: false }).lean().exec();
    let muteResult = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'mutedUsers': { $eq: req.params.friendId } }, { useFindAndModify: false }).lean().exec();
    let blockResult = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'blockedUsers': { $eq: req.params.friendId } }, { useFindAndModify: false }).lean().exec();
    let hideResult = await userModel.findOne({ '_id': req.params.userId, 'projectId': req.params.projectId, 'hiddenUsers': { $eq: req.params.friendId } }, { useFindAndModify: false }).lean().exec();

    //  console.log(friendData);

    let friendProfileData = {
      "pstatus": friendData.pStatus,
      "onlineStatus": friendData.onlineStatus,
      "name": friendData.name,
      "user_image": friendData.user_image,
      "userId": friendData.userId,
      "muteStatus": (muteResult ? true : false),
      "blockStatus": (blockResult ? true : false),
      "hideStatus": (hideResult ? true : false)
    };

    res.json(friendProfileData);
  }


  router.readReceiptUpdate = async function (req, res) {
    // console.log("readReceiptUpdate: ", req.body);
    let result = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId }, { $set: { 'readReceipts': req.body.readReceiptStatus } }, { useFindAndModify: false }).lean().exec();
    if (!result) res.json({ 'status': req.body.readReceiptStatus, 'message': "Read receipt status failed" });
    else res.json({ 'status': req.body.readReceiptStatus, 'message': "Read receipt status updated", 'userData': result });
  }


  router.hideChat = async function (req, res) {
    console.log("hideChat: ", req.body);

    if (req.body.chatHideType == 0) {
      if (req.body.chatHideStatus == 1) {
        let chatData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'hiddenO2OChatUsers': { $ne: req.body.friendId } }, { $push: { 'hiddenO2OChatUsers': req.body.friendId } }, { useFindAndModify: false }).lean().exec();
        if (!chatData) res.json({ 'status': req.body.chatHideStatus, 'message': "Chat update failed" });
        else res.json({ 'status': req.body.chatHideStatus, 'message': "Chat hide status updated", 'data': chatData });
      }
      else {
        let chatData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'hiddenO2OChatUsers': { $eq: req.body.friendId } }, { $pull: { 'hiddenO2OChatUsers': req.body.friendId } }, { useFindAndModify: false }).lean().exec();
        if (!chatData) res.json({ 'status': req.body.chatHideStatus, 'message': "Chat update failed" });
        else res.json({ 'status': req.body.chatHideStatus, 'message': "Chat hide status updated", 'data': chatData });
      }
    }
    else {
      if (req.body.chatHideStatus == 1) {
        let chatData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'hiddenGroupChatUsers': { $ne: req.body.groupId } }, { $push: { 'hiddenGroupChatUsers': req.body.groupId } }, { useFindAndModify: false }).lean().exec();
        if (!chatData) res.json({ 'status': req.body.chatHideStatus, 'message': "Chat update failed" });
        else res.json({ 'status': req.body.chatHideStatus, 'message': "Chat hide status updated", 'data': chatData });
      }
      else {
        let chatData = await userModel.findOneAndUpdate({ '_id': req.body.userId, 'projectId': req.body.projectId, 'hiddenGroupChatUsers': { $eq: req.body.groupId } }, { $pull: { 'hiddenGroupChatUsers': req.body.groupId } }, { useFindAndModify: false }).lean().exec();
        if (!chatData) res.json({ 'status': req.body.chatHideStatus, 'message': "Chat update failed" });
        else res.json({ 'status': req.body.chatHideStatus, 'message': "Chat hide status updated", 'data': chatData });
      }
    }
  }

  router.setVoiceCallReceive = async function (req, res) {
    console.log("setVoiceCallReceive: ", req.body);
    let userData = await userModel.findOneAndUpdate({ '_id': req.body.userId }, { $set: { "voiceCallReceive": req.body.callStatus } }, { useFindAndModify: false }).lean().exec();
    res.json(userData);
  }

  router.setVideoCallReceive = async function (req, res) {
    console.log("setVideoCallReceive: ", req.body);
    let userData = await userModel.findOneAndUpdate({ '_id': req.body.userId }, { $set: { "videoCallReceive": req.body.callStatus } }, { useFindAndModify: false }).lean().exec();
    res.json(userData);
  }

  router.deleteUser = async (req, res) => {
    let result = await userModel.findOneAndDelete({ '_id': req.body.userId, 'projectId': req.body.projectId }, { useFindAndModify: false }).lean().exec();

    if (result) return res.json({ "status": 1, "message": 'user deleted', "user": result });
    else return res.json({ 'status': 0, 'message': 'Incorrect userId sent' });
  }

  //   router.downloadProfilePic = function (req, res) {
  //     var filename = req.params.filename;
  //     filepath = path.join(__dirname, "../images/profilePics") + "/" + filename;
  //     res.download(filepath);
  //   };

  router.updateLang = async (req, res) => {
    let userData = userModel.findOneAndUpdate({ '_id': req.body.userId }, { $set: { "languageCode": req.body.lang } }, { useFindAndModify: false }).lean().exec();
    res.json(true);
  }

  router.getLanguage = async (req, res) => {
    let userLang = await userModel.findOne({ '_id': req.params.userId }, {"languageCode": true}, { useFindAndModify: false }).lean().exec();
    res.json(userLang);
  }

  // ***************************************  ***************************************
  // *************************************** TODOS *************************************
  // ***************************************  ***************************************

  router.todoAdd = function (req, res) {
    // console.log(req.body)
    todo = new todoModel({
      userId: req.body.userId,
      assignFrom: req.body.assignFrom,
      todo: req.body.todo,
      assignId: req.body.assignTo._id,
      assignTo: req.body.assignTo.name,
      assignDate: req.body.assignDate,
      projectId: req.body.projectId
    });
    todo.save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  }

  router.getmyTodo = function (req, res) {
    //console.log(req.body);
    todoModel.find({ userId: req.body.userId, projectId: req.body.projectId }).sort({ updatedAt: -1 })
      .exec(function (err, result) {
        if (err) throw err;
        res.json(result);
      });

  }

  router.getTodo = function (req, res) {
    // console.log(req.body);
    todoModel.find({ assignId: req.body.userId, projectId: req.body.projectId }).sort({ updatedAt: -1 })
      .exec(function (err, result) {
        if (err) throw err;
        res.json(result);
      });

  }

  router.todoStatusUpdate = function (req, res) {
    const str = req.body.status;
    var string = str.split(",");
    const result = todoModel.findOneAndUpdate({ '_id': string[1], projectId: req.body.projectId, 'assignId': req.body.userId }, { "status": string[0] }, { useFindAndModify: false }).exec();
    res.json(result);
  }

  // =====================================================================================================================================

  router.forgotPassword = async function (req, res) {
    //console.log('forgotPassword: ', req.body);
    let projectLink = "https://chat.chatto.jp";

    if (req.body.projectId == "5d4c07fb030f5d0600bf5c03")
      projectLink = "https://chat.chatto.jp";

    const emailExist = await userModel.findOne({ 'email': req.body.email, 'projectId': req.body.projectId }).lean().exec();
    if (!emailExist)
      return res.json({ 'status': 0, 'message': 'email does not exists' });

    // ----------- *** SEND EMAIL TO MEMBERS *** -------------
    // transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'personaluse646@gmail.com',
    //     pass: 'tdspgfhrlvcyymhs'
    //   }
    // });

    let tokenNo = Math.floor(Math.random() * 9999999) + 1;
    let mainToken = tokenNo;
    userModel.findOneAndUpdate({ 'email': req.body.email, 'projectId': req.body.projectId }, { "token": mainToken }, { useFindAndModify: false }).exec();

    mailOptions = {
      from: 'hello@chatto.jp',
      to: req.body.email,
      subject: 'Password Reset Request',
      text: 'Chatto',
      html:
        `<p><b>Dear, peekchat user </b> You have requested to reset your password` +
        `<br>Click this link to set your new password: <a href='${projectLink}/forgotpassword?token=${mainToken}'>${projectLink}</a></p>` +
        `<br><p>If its not requested by you then contact us at: <a href="${projectLink}"><b>${projectLink}</b></a> </p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        //  console.log('Forgot Email Sent: ' + info.response);
      }
    });

    res.json({ 'status': 1, 'message': 'email sent successfully' });
  }

  router.verifyResetToken = async function (req, res) {
    console.log('verifyResetToken: ', req.body);
    const verificationResult = await userModel.findOne({ 'projectId': req.body.projectId, 'token': req.body.token }).lean().exec();

    if (verificationResult) {
      const passwordUpdated = await userModel.findOneAndUpdate({ 'token': req.body.token, 'projectId': req.body.projectId }, { $set: { 'password': req.body.newpassword } }, { useFindAndModify: false }).exec();

      if (passwordUpdated)
        res.json({ 'status': 1, 'message': 'password changed successfully' });
      else
        res.json({ 'status': 0, 'message': 'password change failed, try again' });
    }
    else res.json({ 'status': 0, 'message': 'Invalid/Expired Token' });
  }

  router.verifySMSCode = async function (req, res) {
    const smsVerified = await userModel.findOneAndUpdate({ 'token': req.body.smscode, 'projectId': req.body.projectId }, { $set: { 'emailConfirm': 1 } }).exec();

    if (smsVerified)
      res.json({ 'status': 1, 'message': 'sms-code verified successfully' });
    else
      res.json({ 'status': 0, 'message': 'sms-code verification failed' });
  }

  return router;
};
