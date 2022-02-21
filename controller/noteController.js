const userModel = require("../model/users-model");
const friendModel = require("../model/friendModel");
const noteModel = require("../model/note-model");
const notifiModel = require("../model/notificationModel");

module.exports = function (io, saveUser) {
    var router = {};

    router.createNote = async function (req, res) {
        let noteData = req.body.noteData;
        let noteFriends = JSON.parse(req.body.note_members);

        let note = new noteModel({
            'note_title': noteData.note_title,
            'note_topic': noteData.note_topic,
            'createdBy': noteData.userId,
            'note_date': noteData.note_date,
            'note_category': noteData.note_category,
            'projectId': noteData.projectId,
            'note_members': noteFriends,
        });

        // ------------------------- NOTE NOTIFICATION ---------------------------------
        //   let senderData = await userModel.findOne({ "_id": noteData.userId }, { "_id": true, "name": true, "user_image": true }).lean().exec();

        //   newNotification = new notifiModel({
        //     "senderId": noteData.userId,
        //     "friendIds": noteFriends,
        //     "title": "Note",
        //     "body": (senderData.name + " sent you a note"),
        //     "image": senderData.user_image,
        //     "notificationType": 4
        //   });
        //   newNotification.save();
          // -------------------- ********************* --------------------------
        let noteSaved = await note.save();
        await noteSaved.populate('note_members', "_id name userId user_image").execPopulate();
        res.json(noteSaved);
    }

    router.updateNote = async function (req, res) {
        // console.log("updateNote1:", req.body.noteData);
        // console.log("updateNote2:", req.body.noteData.projectId);
        // console.log("updateNote2:", req.body.id);
        var noteData = req.body.noteData;
        var noteFriends = JSON.parse(req.body.note_members);
       // console.log("noteFriends:", noteFriends);
        let updatedNote = await noteModel.findOneAndUpdate(
            {
                '_id': req.body.id, 'projectId': noteData.projectId
            },
            {
                $set: {
                    'note_title': noteData.note_title,
                    'note_topic': noteData.note_topic,
                    'note_date': noteData.note_date,
                    'note_category': noteData.note_category,
                    'note_members': noteFriends,
                }
            }, { useFindAndModify: false }).lean().exec();

        res.json(updatedNote);
    }

    router.updateNoteMembers = async function (req, res) {
        var noteFriends = JSON.parse(req.body.note_members);

        let updatedMembersList = await noteModel.findOneAndUpdate(
            {
                '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
                $set: { 'note_members': noteFriends }
            }, { useFindAndModify: false }).lean().exec();

        res.json(updatedMembersList);
    }

    router.deleteNote = async function (req, res) {
        let result = await noteModel.deleteOne({ '_id': req.body.id }).lean().exec();
        res.json(result);
    }

    router.getAllNotes = async function (req, res) {
      //  console.log("getAllNotes:", req.params);
        var myNotes = null, joinedNotes = null, allNotes = null;

        if (req.params.noteGetStatus == "0") {  // get all notes
            myNotes = await noteModel.find({ 'createdBy': req.params.userId, 'projectId': req.params.projectId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
            joinedNotes = await noteModel.find({ 'projectId': req.params.projectId, "note_members": req.params.userId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
        }

        else if (req.params.noteGetStatus == "1") { // get all design category notes
            myNotes = await noteModel.find({ 'createdBy': req.params.userId, 'note_category': "design", 'projectId': req.params.projectId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
            joinedNotes = await noteModel.find({ 'projectId': req.params.projectId, 'note_category': "design", "note_members": req.params.userId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
        }

        else if (req.params.noteGetStatus == "2") { // get all general category notes
            myNotes = await noteModel.find({ 'createdBy': req.params.userId, 'note_category': "general", 'projectId': req.params.projectId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
            joinedNotes = await noteModel.find({ 'projectId': req.params.projectId, 'note_category': "general", "note_members": req.params.userId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
        }

        else if (req.params.noteGetStatus == "3") { // get all project category notes
            myNotes = await noteModel.find({ 'createdBy': req.params.userId, 'note_category': "projects", 'projectId': req.params.projectId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
            joinedNotes = await noteModel.find({ 'projectId': req.params.projectId, 'note_category': "projects", "note_members": req.params.userId, 'status': 1 }).sort({ createdAt: -1 }).populate('note_members').lean().exec();
        }

        allNotes = myNotes.concat(joinedNotes);

        res.json(allNotes);
    }

    
    router.getANote = async function (req, res) {
        noteModel.findOne({ '_id': req.params.noteId, 'projectId': req.params.projectId }).lean().exec(function (err, noteData) {
            res.json(noteData);
        });
    }

    return router;
};