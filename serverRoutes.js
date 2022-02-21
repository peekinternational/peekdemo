const chatController = require('./controller/chatController');
const groupController = require('./controller/groupController');
const settingsController = require('./controller/settingsController');
const meetingController = require('./controller/meetingController');
const one2oneController = require('./controller/one2oneController');
const broadcastController = require('./controller/broadcastController');
const roomController = require('./controller/roomController');
const noteController = require('./controller/noteController');
const notificationController = require('./controller/notificationController');

const multer = require('multer');
const auth = require('./auth');

// ------------------- MULTER IMAGE STORING CODE -----------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/chatImages/')
    },

    filename: function (req, file, cb) {
        console.log('multer file: ', file);
        cb(null, file.originalname);
    }
})
const upload = multer({
    storage: storage
})
// ---------------------------------------------------------------------------------------

module.exports = function (app, io, saveUser) {
    var chatCon = new chatController(io, saveUser);
    var groupCon = new groupController(io, saveUser);
    var settingsCon = new settingsController(io, saveUser);
    var meetingCon = new meetingController(io, saveUser);

    var broadcastCon = new broadcastController(io, saveUser);
    var roomCon = new roomController(io, saveUser);
    var noteCon = new noteController(io, saveUser);
    var notifyController = new notificationController(io, saveUser);

    // var one2oneCon = new one2oneController(io, saveUser);
    // app.post('/notification', clientPushNotif.send);
    // app.post('/notification');
    app.post('/userLastSeen', chatCon.userLastSeen);  // === needs recheck ===
    app.post('/updateCallStatus', chatCon.updateCallStatus);
    app.post('/setPerStatus', chatCon.setPerStatus);
    app.post('/setOnlineStatus', chatCon.setOnlineStatus);
    app.post('/searchChat', chatCon.chatMessageFind);
    app.post('/searchGroupChat', chatCon.groupChatMessageFind);

    app.get('/getUsers/:userId/:allList/:projectId', chatCon.getUsers);
    app.get('/emptyChatWithId/:_id/:projectId', chatCon.chatWithId);
    app.get('/getPerStatus/:userId/:projectId', chatCon.getPerStatus);
    app.get('/download/:filename', chatCon.downloadFile); // ---- needs recheck ----

    // -------------- Chat ROUTES -------------------------------------------------------
    app.post('/chat', chatCon.chat);
    app.post('/updateChat', chatCon.updateChat);
    app.post('/chatFilesShare', upload.array('file'), chatCon.addfiles);
    app.post('/documentChat', chatCon.getDocumentChat); // === needs recheck ===
    app.post('/allDocumentChat', chatCon.getAllDocumentChat);
    app.post('/imageChat', chatCon.getImageChat); // === needs recheck ===
    app.post('/allImageChat', chatCon.getAllImageChat);
    app.post('/linkChat', chatCon.getLinksChat); // === needs recheck ===
    app.post('/deleteAllChat', chatCon.deleteAllChat);
    app.post('/readAllChat', chatCon.readAllChat);
    app.post('/unreadAllChat', chatCon.unreadAllChat);
    app.post('/bookmarkChat', chatCon.bookmarkChat);
    app.post('/bookmarkMyChat', chatCon.bookmarkMyChat);
    app.post('/clearAllChats', chatCon.clearAllChats);

    app.get('/getBookmarkedChats/:userId/:projectId', chatCon.getBookmarkedChats);
    app.get('/getMyBookmarkChats/:userId/:friendId/:projectId', chatCon.getMyBookmarkChats);
    app.get('/getMyBookmarkGroupChats/:userId/:groupId/:projectId', chatCon.getMyBookmarkGroupChats);
    app.get('/getChat/:senderId/:receiverId/:limit/:projectId/:chatHideStatus', chatCon.getChat);
    app.get('/getMoreChat/:senderId/:receiverId/:limit/:chatTime/:projectId', chatCon.getMoreChat);
    app.get('/deleteMsg/:msgId/:type/:projectId', chatCon.deleteMsg);
    app.get('/messsageCount/:userId/:projectId', chatCon.getUserMessageCount);

    // ----------------------------------------------------------------------------------

    // -------------- BROADCAST ROUTES -------------------------------------
    app.post('/startPresenter', broadcastCon.startPresenter);
    app.post('/joinViewer', broadcastCon.joinViewer);
    app.post('/stopViewer', broadcastCon.stopViewer);
    app.get('/stopPresenter/:userId/:broadcastId/:projectId', broadcastCon.stopPresenter);
    app.get('/getBroadcastId/:presenterId/:projectId', broadcastCon.getBroadcastId);
    // app.get('/getBroadcastId/:presenterId', chatCon.getBroadcastId);

    // -------------- PROJECT ROUTES --------------------------------------
    app.post('/getProject', chatCon.getProjectData);
    app.post('/login', auth.optional, chatCon.login);
    app.post('/mobileLogin', auth.optional, chatCon.mobileLogin);
    app.post('/loginwebsite', auth.optional, chatCon.loginwebsite);
    // app.post('/autologin', auth.optional, chatCon.autoLogin);
    app.post('/checkSession', auth.required, chatCon.checkSession); // === needs recheck ====
    // app.get('/logout/:userId', chatCon.logout);  // === needs recheck ====
    // ------------------------------------------------------------------------

    // -------------- GROUP ROUTES --------------------------------------------
    app.post('/createUserGroup', upload.array('file'), groupCon.createUserGroup);
    app.post('/removeGroupUser', groupCon.removeGroupUser);
    app.post('/editGroupName', groupCon.editGroupName);
    app.post('/addNewMembers', groupCon.addNewMembers);
    app.post('/deleteGroup', groupCon.deleteGroup);
    app.post('/uploadGroupPic', upload.array('file'), groupCon.uploadGroupPic);
    // app.post('/groupFilesShare', upload.array('file'), chatCon.groupFilesShare);

    app.post('/groupChat', groupCon.groupChat);
    app.post('/getLastGroupMsg', groupCon.getLastGroupMsg);  // ==== needs recheck ====
    app.post('/getcurrentgroupchat', groupCon.getcurrentgroupchat); // === needs recheck ===
    app.post('/updateGroupChat', groupCon.updateGroupChat);
    app.post('/addgroup', groupCon.addGroup);  // === needs recheck ====
    app.post('/changeAdmin', groupCon.changeAdmin);

    app.get('/getCreatedGroups/:userId/:projectId', groupCon.getCreatedGroups);
    app.get('/getGroupChat/:groupId/:userId/:limit/:projectId', groupCon.getGroupChat);
    app.get('/getMoreGroupChat/:groupId/:limit/:chatTime/:projectId', groupCon.getMoreGroupChat);
    app.get('/deleteGroupMsg/:msgId/:type/:groupId/:projectId', groupCon.deleteGroupMsg); // --- needs recheck ---
    app.get('/getGroups/:userId', groupCon.getGroups); // --- needs recheck ----

    // -------------- GROUP CALL ROUTES ---------------------------------------------------
    app.post('/callAGroup', groupCon.callAGroup);  // === needs recheck ====
    app.post('/createGroupCall', groupCon.createGroupCall);
    app.post('/joinCallGroup', groupCon.joinCallGroup);
    app.post('/leaveCallGroup', groupCon.leaveCallGroup);
    app.post('/getCallGroups', groupCon.getCallGroups); // === needs recheck ===
    app.post('/updateGroupCall', groupCon.updateGroupCallStatus);

    app.get('/getSingleUser/:userId', chatCon.getSingleUser); // ==== needs recheck ====
    app.get('/getGroupCalls/:userId/:projectId', groupCon.getGroupCalls);

    // -------------- ONE2ONE CALL ROUTES --------------------------------------------
    app.post('/createOne2oneCall', one2oneController.createCall);
    app.post('/updateOne2oneCall', one2oneController.updateCallStatus);
    app.post('/clearOne2oneHistory', one2oneController.clearOne2oneHistory);
    app.get('/getOne2oneCalls/:callerId/:projectId/:listType', one2oneController.getAllone2oneCalls);
    // app.get('/getUserCallHistory/:callerId/:projectId', one2oneController.getUserCallHistory);
    // app.get('/getAllCalls/:callerId/:projectId', one2oneController.getAllCalls);
    // app.get('/getSelectedCalls/:callerId/:projectId/:listType', one2oneController.getSelectedCallHistory);

    // -------------- SETTINGS ROUTES ------------------------------------------------------
    app.post('/uploadProfilePic', upload.array('file'), settingsCon.uploadProfilePic);
    app.post('/deactivateAccount', settingsCon.deactivateAccount); 
    app.post('/updateUser', settingsCon.updateUser); // === needs recheck ===
    app.post('/updateUserId', settingsCon.updateUserId);
    app.post('/updatePhone', settingsCon.updatePhone);
    app.post('/setFavouriteUser', settingsCon.setFavouriteUser); // === needs recheck ===
    app.post('/getFavouriteUsers', settingsCon.getFavouriteUsers); // === needs recheck ===
    app.post('/updateName', settingsCon.updateUserName);
    app.post('/updateDOB', settingsCon.updateDOB);
    app.post('/forgotPassword', settingsCon.forgotPassword);
    app.post('/verifySMSCode', settingsCon.verifySMSCode);
    app.post('/editPassword', settingsCon.editPassword);
    app.post('/hideUser', settingsCon.hideUser);
    app.post('/blockUser', settingsCon.blockUser);
    app.post('/muteUnmute', settingsCon.muteUnmute);
    app.post('/getMutedInfo', settingsCon.getMutedInfo);
    app.post('/verifyPasswordReset', settingsCon.verifyResetToken);
    app.post('/editEmail', settingsCon.editEmail);
    app.post('/deleteUser', settingsCon.deleteUser);
    app.post('/updateLang', settingsCon.updateLang);
    app.get('/updateLang/:userId/:projectId', settingsCon.getLanguage);

    app.post('/readReceipt', settingsCon.readReceiptUpdate);
    app.post('/chatHide', settingsCon.hideChat);
    app.post('/setVoiceCallReceive', settingsCon.setVoiceCallReceive);
    app.post('/setVideoCallReceive', settingsCon.setVideoCallReceive);

    app.get('/hiddenUsers/:userId/:projectId', settingsCon.getHiddenUsers);
    app.get('/blockedUsers/:userId/:projectId', settingsCon.getBlockedUsers);
    app.get('/mutedUsers/:userId/:projectId', settingsCon.getMutedUsers);
    app.get('/getMessageDocuments/:projectId/:userId/:friendId', settingsCon.getMessageDocuments);
    app.get('/getCommonGroups/:userId/:friendId/:projectId', settingsCon.getCommonGroups);
    app.get('/getFriendsProfile/:userId/:friendId/:projectId', settingsCon.getFriendsProfile);

    // --------------  TODOS --------------------------------------------------
    app.post('/addTodo', settingsCon.todoAdd);
    app.post('/getmyTodo', settingsCon.getmyTodo);
    app.post('/getTodo', settingsCon.getTodo);
    app.post('/todoStatus', settingsCon.todoStatusUpdate);

    // -------------- MEETING ROUTES --------------------------------------------------
    
    app.post('/createMeeting', upload.array('file'), meetingCon.createMeeting);
    app.post('/updateMeeting', upload.array('file'), meetingCon.updateMeeting);
    app.post('/joinMeeting', meetingCon.joinMeeting);
    app.post('/leaveMeeting', meetingCon.leaveMeeting);
    app.post('/endMeetingSession', meetingCon.endMeetingSession);
    app.post('/updateMeetingStatus', meetingCon.activateMeeting);
    app.post('/checkJoiningUser', meetingCon.checkJoiningUser);
    app.post('/checkAdmin', meetingCon.checkAdminStatus);
    app.post('/updateMeetingFile', upload.array('file'), meetingCon.updateMeetingFile);
    app.post('/uploadMeetingDocument', upload.array('file'), meetingCon.uploadMeetingDocument);
    app.post('/removeMeetingDocument', meetingCon.removeMeetingDocument);

    app.get('/getMeetingMembers/:meetingId/:projectId', meetingCon.getMeetingMembers);
    app.get('/getMeeting/:userId/:projectId', meetingCon.getMeetings);
    app.get('/getMembersMeeting/:userId/:projectId', meetingCon.getMeetingList);
    app.get('/getSingleMeeting/:meetingId/:projectId', meetingCon.getMeeting);
    app.get('/getCompletedMeeting/:userId/:projectId', meetingCon.getCompletedMeetings);

    // -------------- ROOM ROUTES ------------------------------------------------------
    
    app.post('/createRoom', upload.array('file'), roomCon.createRoom);
    app.post('/updateRoom', upload.array('file'), roomCon.updateRoom);
    app.post('/updateRoomSchedule', roomCon.updateRoomSchedule);
    app.post('/updateRoomFriends', roomCon.updateRoomFriends);
    app.post('/leaveRoom', roomCon.leaveRoom);
    app.post('/deleteRoom', roomCon.deleteRoom);
    app.post('/updateRoomCallStatus', roomCon.updateRoomCallStatus);
    app.post('/leaveRoomCall', roomCon.leaveRoomCall);
    app.post('/uploadRoomDocument', upload.array('file'), roomCon.uploadRoomDocument);
    app.post('/removeRoomDocument', roomCon.removeRoomDocument);

    app.get('/getRoomChat/:roomId/:projectId', roomCon.getRoomChat);
    app.get('/getSingleRoom/:roomId/:projectId', roomCon.getSingleRoom);
    app.get('/getRooms/:userId/:projectId/:roomGetStatus', roomCon.getRooms);

    // -------------- NOTE ROUTES ------------------------------------------------------

    app.post('/createNote', noteCon.createNote);
    app.post('/updateNote', noteCon.updateNote);
    app.post('/updateNoteMembers', noteCon.updateNoteMembers);
    app.post('/deleteNote', noteCon.deleteNote);

    app.get('/getANote/:noteId/:projectId', noteCon.getANote);
    app.get('/getAllNotes/:userId/:projectId/:noteGetStatus', noteCon.getAllNotes);

    // -------------- NOTIFICATION ROUTES ------------------------------------------------------
    app.post('/notificationsList', notifyController.notificationsList);
    app.post('/readNotification', notifyController.readNotification);
    app.post('/deleteNotification', notifyController.deleteNotification);

    app.get('/notificationsCount/:userId/:projectId', notifyController.notificationsCount);

    // ... Mobile ...
    app.get('/getGroup_Users/:userId/:projectId/:hideStatus/:clearedUserStatus', chatCon.getGroup_Users);
    app.get('/getSingleMeetingStatus/:meetingId/:projectId', meetingCon.getSingleMeetingStatus);
    app.post('/updateMobileMeeting', upload.array('file'), meetingCon.updateMobileMeeting);
}