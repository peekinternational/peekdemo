const meetingModel = require("../model/meetingModel");
const roomModel = require("../model/roomModel");
const userModel = require("../model/users-model");
const notifiModel = require("../model/notificationModel");

var nodemailer = require('nodemailer');
var cron = require('node-cron');

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

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// =========== CRON JOB ===============
cron.schedule('* * * * *', async () => {
  console.log('Cron job executed');
  var currentDate = new Date();

  let activeMeetingsList = await meetingModel.find({ "activeStatus": 0, "status": 1, 'closedAt': { $eq: null } }).lean().exec();

  for (let m = 0; m <= (activeMeetingsList.length - 1); m++) {
    let meetingOnlyDate = withoutTime(activeMeetingsList[m].meeting_date);
    let currentOnlyDate = withoutTime(currentDate);

    if ((meetingOnlyDate.getFullYear() == currentOnlyDate.getFullYear()) && ((meetingOnlyDate.getMonth() + 1) == (currentOnlyDate.getMonth() + 1)) && (meetingOnlyDate.getDate() == currentOnlyDate.getDate())) {
      if (activeMeetingsList[m].meeting_zone == "") continue; //need recheck ****

      let currentTzTime = convertTZ(currentDate, activeMeetingsList[m].meeting_zone); // convert current time to given Timezone
      let meetingFullData = activeMeetingsList[m].meeting_date.getFullYear() + "-" + (activeMeetingsList[m].meeting_date.getMonth() + 1) + "-" + activeMeetingsList[m].meeting_date.getDate();
      let meetingDateTime = new Date(meetingFullData + ' ' + activeMeetingsList[m].meeting_time); // creating current Date of meeting time

      let remainingTime = Math.abs(meetingDateTime.getTime()) - currentTzTime.getTime(); // Getting remaining time by deducting miliseconds
      let remainingMinutes = Math.floor(remainingTime / 60000); // Convert miliseconds time to minutes

      // console.log(remainingMinutes, " == ", activeMeetingsList[m].meeting_notification);

      if (remainingMinutes == activeMeetingsList[m].meeting_notification) {
        var friendMembers_emails = [];
        for (let f = 0; f <= (activeMeetingsList[m].friend_members.length - 1); f++) {
          friendMembers_emails.push(activeMeetingsList[m].friend_members[f].email);
        }

        const allEmails = friendMembers_emails.concat(activeMeetingsList[m].meeting_members);
        alertMeetingEmail(allEmails, activeMeetingsList[m].meeting_title, remainingMinutes);
      }
      else if (remainingMinutes == 10) {
        console.log("Send Notification");
        let friendMembers_ids = [];
        for (let f = 0; f <= (activeMeetingsList[m].friend_members.length - 1); f++) {
          friendMembers_ids.push(activeMeetingsList[m].friend_members[f]._id);
        }
        // ------------------------- NOTE NOTIFICATION ---------------------------------
        newNotification = new notifiModel({
          "senderId": activeMeetingsList[m]._id,
          "receiverId": null,
          "friendIds": friendMembers_ids,
          "title": "Meeting",
          "body": (`You have a meeting named, ${activeMeetingsList[m].meeting_title}, to attend after 10 minutes`),
          "notificationType": 2
        });
        newNotification.save();
        // ------------------------ ********************* ------------------------------
      }

    }
  }

  // --------------------------------------------------------------

  let roomData = await roomModel.find({ "activeStatus": 0, "status": 1, 'closedAt': { $eq: null }, 'scheduleTypeName': { $ne: "" } }).populate("room_friends", { _id: false, email: true }).lean().exec();

  for (let r = 0; r <= (roomData.length - 1); r++) {
    if (roomData[r].scheduleTypeName == "daily") {
      // console.log("room_tz: ", roomData[r].room_timezone);
      let TZ_CurrentDate = convertTZ(currentDate, roomData[r].room_timezone);
      let roomCurrentDate = TZ_CurrentDate.getFullYear() + "-" + (TZ_CurrentDate.getMonth() + 1) + "-" + TZ_CurrentDate.getDate();
      let roomFullDateTime = new Date(roomCurrentDate + ' ' + roomData[r].scheduleStartTime);

      let remainingTime = Math.abs(roomFullDateTime.getTime()) - TZ_CurrentDate.getTime();
      let remainingMinutes = Math.floor(remainingTime / 60000);

      if (remainingMinutes == 20) {
        console.log("Send email for daily schedule");
        alertRoomEmail(roomData[r].room_friends, roomData[r].room_title, remainingMinutes);
      }
      else if (remainingMinutes == 10) {
        // ------------------------- NOTE NOTIFICATION ---------------------------------
        newNotification = new notifiModel({
          "senderId": roomData[r]._id,
          "receiverId": null,
          "friendIds": roomData[r].room_friends,
          "title": "Meeting",
          "body": (`You have a meeting ${roomData[r].room_title} to attend after 10 minutes`),
          "notificationType": 2
        });
        newNotification.save();
        // ------------------------ ********************* ------------------------------
      }
      // if (roomFullDateTime.getTime() === TZ_CurrentDate.getTime()) {
      //   console.log("Send email for Daily schedule");
      // }
    }
    else if (roomData[r].scheduleTypeName == "weekly") {
      let currentDayNumber = currentDate.getDay();
      let currentDayName = days[currentDayNumber - 1];
      let currentDayShortName = currentDayName.substring(0, 3);

      for (let d = 0; d <= (roomData[r].scheduleWeekDays.length - 1); d++) {
        if (currentDayShortName === roomData[r].scheduleWeekDays[d]) {
          // console.log("room_tz: ", roomData[r].room_timezone);
          let TZ_CurrentDate = convertTZ(currentDate, roomData[r].room_timezone);
          let roomCurrentDate = TZ_CurrentDate.getFullYear() + "-" + (TZ_CurrentDate.getMonth() + 1) + "-" + TZ_CurrentDate.getDate();
          let roomFullDateTime = new Date(roomCurrentDate + ' ' + roomData[r].scheduleStartTime);

          let remainingTime = Math.abs(roomFullDateTime.getTime()) - TZ_CurrentDate.getTime();
          let remainingMinutes = Math.floor(remainingTime / 60000);

          if (remainingMinutes == 20) {
            console.log("Send email for daily schedule");
            alertRoomEmail(roomData[r].room_friends, roomData[r].room_title, remainingMinutes);
          }
          else if (remainingMinutes == 10) {
            // ------------------------- NOTE NOTIFICATION ---------------------------------
            newNotification = new notifiModel({
              "senderId": roomData[r]._id,
              "receiverId": null,
              "friendIds": roomData[r].room_friends,
              "title": "Meeting",
              "body": (`You have a meeting ${roomData[r].room_title} to attend after 10 minutes`),
              "notificationType": 2
            });
            newNotification.save();
            // ------------------------ ********************* ------------------------------
          }
        }
      }
    }
    else if (roomData[r].scheduleTypeName == "monthly") {
      let currentDateNumber = currentDate.getDate();

      if (roomData[r].scheduleStartDate == currentDateNumber) {
        // console.log("room_tz: ", roomData[r].room_timezone);
        let TZ_CurrentDate = convertTZ(currentDate, roomData[r].room_timezone);
        let roomCurrentDate = TZ_CurrentDate.getFullYear() + "-" + (TZ_CurrentDate.getMonth() + 1) + "-" + TZ_CurrentDate.getDate();
        let roomFullDateTime = new Date(roomCurrentDate + ' ' + roomData[r].scheduleStartTime);

        let remainingTime = Math.abs(roomFullDateTime.getTime()) - TZ_CurrentDate.getTime();
        let remainingMinutes = Math.floor(remainingTime / 60000);

        if (remainingMinutes == 20) {
          console.log("Send email for daily schedule");
          alertRoomEmail(roomData[r].room_friends, roomData[r].room_title, remainingMinutes);
        }
        else if (remainingMinutes == 10) {
          // ------------------------- NOTE NOTIFICATION ---------------------------------
          newNotification = new notifiModel({
            "senderId": roomData[r]._id,
            "receiverId": null,
            "friendIds": roomData[r].room_friends,
            "title": "Meeting",
            "body": (`You have a meeting ${roomData[r].room_title} to attend after 10 minutes`),
            "notificationType": 2
          });
          newNotification.save();
          // ------------------------ ********************* ------------------------------
        }
      }
    }
  }

}
  , {
    scheduled: true,
    // timezone: "Asia/Karachi"
  });
// ------------ *** *********** *** --------------

function withoutTime(dateTime) {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
}

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

function alertMeetingEmail(allEmails, title, remainingMinutes) {
  mailOptions = {
    from: "hello@chatto.jp",
    to: allEmails,
    subject: 'You have a Meeting to Attend',
    text: "Chatto",
    html:
      `<p><b>Dear, Chatto user </b> You have a meeting to attend named <b> ${title} </b> after <b> ${remainingMinutes} </b> minutes`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log("Email sent");
  });
}

function alertRoomEmail(allFriends, title, remainingMinutes) {
  let projectName = "";
  // if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") projectName = "Chatto";
  // else if (req.body.projectId == "5d4c07fb030f5d0600bf5c07") projectName = "AlsWebcam";

  allFriends.forEach(function (friend, i) {
    mailOptions = {
      from: 'hello@chatto.jp',
      to: friend.email,
      subject: 'You are invited in a room meeting',
      text: projectName,
      html:
        `<p><b>Dear, Chatto user </b> You have a room meeting to attend named <b> ${title} </b> after <b> ${remainingMinutes} </b> minutes`
    };

    transporter.sendMail(mailOptions, function (err) {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  });
}

// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// }

// const convertTime12to24 = (time12h) => {
//   const [time, modifier] = time12h.split(' ');
//   let [hours, minutes] = time.split(':');

//   if (hours === 12) {
//     hours = 00;
//   }

//   if (modifier === 'pm') {
//     hours = parseInt(hours, 10) + 12;
//   }

//   return `${hours}:${minutes}`;
// }

// =============================================================================================================================

module.exports = function (io, saveUser) {
  var router = {};

  router.createMeeting = async function (req, res) {

    var meetingData = JSON.parse(req.body.meetingData);
    var meetingFilename = req.body.filename;
    var meetingMembers = ((req.body.meetingPersons.length == 0) ? [] : req.body.meetingPersons.split(","));
    var meetingFriends = JSON.parse(req.body.meetingFriends);

    let meeting = new meetingModel({
      'createdBy': req.body.userId,
      'meeting_id': meetingData.meeting_id,
      'meeting_title': meetingData.meeting_title,
      'meeting_zone': meetingData.meeting_zone,
      'meeting_notification': meetingData.meeting_notification,
      'meeting_topic': meetingData.meeting_topic,
      'meeting_password': meetingData.meeting_password,
      'meeting_time': meetingData.meeting_time,
      'meeting_date': meetingData.meeting_date,
      'meeting_duration': meetingData.meeting_duration,
      // 'meeting_file': meetingFilename,
      'meeting_members': [],
      'projectId': req.body.projectId
    });

    await meeting.save(function (err, data) { if (err) throw err; });

    // store meeting members in database array
    await meetingModel.findOneAndUpdate({ 'meeting_id': meetingData.meeting_id }, { $push: { 'meeting_members': meetingMembers } }, { useFindAndModify: false }).lean().exec();
    await meetingModel.findOneAndUpdate({ 'meeting_id': meetingData.meeting_id }, { $push: { 'friend_members': meetingFriends } }, { useFindAndModify: false }).lean().exec();

    let savedMeeting = await meetingModel.findOne({ 'meeting_id': meetingData.meeting_id }).populate('createdBy').lean().exec();

    let files = meetingFilename;
    try {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let file = {
            "filename": files[i],
          };

          meetingModel.findOneAndUpdate(
            {
              '_id': savedMeeting._id, 'projectId': req.body.projectId
            },
            {
              $push: {
                'meeting_file': file,
              }
            }, { useFindAndModify: false }).lean().exec();
        }
      }

    } catch (error) {
      console.error(error);
    }

    // ----------- *** SEND EMAIL TO MEMBERS *** -------------
    var emailFrom = "hello@chatto.jp";
    var emailPass = "";

    if (req.body.projectId == "5d4c07fb030f5d0600bf5c08") {
      emailFrom = "sintonusmedia@gmail.com";
      emailPass = "ruZbQKLdDEAEc38";
    }
    else if (req.body.projectId == "5d4c07fb030f5d0600bf5c07") {
      emailFrom = "deniel@jobcallme.com";
      emailPass = "syKIM2103";
    }

    // transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: emailFrom,
    //     pass: emailPass
    //   }
    // });

    let meetingDate = new Date(meetingData.meeting_date);
    let meetingFormatedDate =
      (("0" + meetingDate.getDate()).slice(-2)) + "-" +
      (("0" + (meetingDate.getMonth() + 1)).slice(-2));// + "-" +
    // meetingDate.getFullYear() + " at " +
    // meetingDate.getHours() + ":" +
    // meetingDate.getMinutes() + ":" +
    // meetingDate.getSeconds();

    let meetingDuration = meetingData.meeting_duration.split(':');
    let durationHour, durationMinute = 0;
    let _expiryFullDate = meetingDate;

    //console.log("meetingDuration: ", meetingDuration);
    if (meetingDuration[0]) {
      durationHour = +(meetingDuration[0]);
      //console.log(durationHour);
      _expiryFullDate.setHours(_expiryFullDate.getHours() + durationHour);
    }
    if (meetingDuration[1]) {
      durationMinute = +(meetingDuration[1]);
      //  console.log(durationMinute);
      _expiryFullDate.setMinutes(_expiryFullDate.getMinutes() + durationMinute);
    }

    let meetingTime = meetingData.meeting_time.split(':');
    let meetingHour, meetingMinute = 0;
    let expiryAMPM = "";
    let expiryTime = "";

    // console.log("meetingTime: ", meetingTime);
    if (meetingTime[0]) {
      meetingHour = +(meetingTime[0]);
      // console.log(meetingHour);
      expiryTime += (meetingHour + durationHour + ":");
    }
    if (meetingTime[1]) {
      let getMinutes = meetingTime[1].split(' ');
      meetingAMPM = getMinutes[1];
      meetingMinute = getMinutes[0];
      // console.log(meetingMinute);
      expiryTime += (meetingMinute);

      if (meetingAMPM == "pm") {
        let expiryTimeHours = meetingHour + durationHour + 12;
        if (expiryTimeHours < 24) expiryAMPM = "pm";
        else expiryAMPM = "am";
      }
      else if (meetingAMPM == "am") {
        let expiryTimeHours = meetingHour + durationHour;
        if (expiryTimeHours < 12) expiryAMPM = "am";
        else expiryAMPM = "pm";
      }
    }

    // let expiryDate = (("0" + meetingDate.getDate()).slice(-2)) + "-" +
    //   (("0" + (meetingDate.getMonth() + 1)).slice(-2)) + "-" +
    //   meetingDate.getFullYear() + " at " +
    //   (meetingDate.getHours() + expiryHour) + ":" +
    //   (meetingDate.getMinutes() + expiryMinute);

    meetingModel.findOneAndUpdate({ 'meeting_id': meetingData.meeting_id }, { $set: { 'meeting_endDate': _expiryFullDate } }, { useFindAndModify: false }).lean().exec();

    let projectLink = "";
    let projectName = "";

    if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") {
      projectLink = "https://chat.chatto.jp";
      projectName = "Chatto user";
    }


    var friendMembers_emails = [];
    for (let f = 0; f <= (meetingFriends.length - 1); f++) {
      friendMembers_emails.push(meetingFriends[f].email);
    }
    const allEmails = friendMembers_emails.concat(meetingMembers);

    console.log("allEmails: ", allEmails);

    try {
      if (allEmails) {
        for (let e = 0; e < allEmails.length; e++) {

          let user = await userModel.findOne({ 'email': allEmails[e], 'projectId': req.body.projectId }).lean().exec();
          if (user) projectName = user.name;

          const meeting_EmailTemplate =
            `
          <html>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet">
      
      <style>
          @media screen and (max-device-width: 480px),
          screen and (max-width: 480px) {
              #main-template-div{
                  width: 100% !important;
              }

              .meeting-joinline{
                font-size: 12px !important;
            }

            .meeting-name{
                font-size: 18px !important;
            }

            .meeting-link{
                font-size: 12px !important;
            }

            .meeting-id{
              font-size: 12px !important;
            }
            .meeting-password{
              font-size: 12px !important;
            }
            .meeting-id-val{
              font-size: 14px !important;
            }

        .meeting-password-val{
            font-size: 14px !important;
        }
          }
      </style>
      </head>
      
      <body style="font-family: 'Lato', sans-serif;  background-color: #3e3e52;">
      <div id="main-template-div" style="margin-top: -10px; margin-right: auto; margin-left: auto; width: 75%; background-color: white;">
          <div id="template-header">
              <img src="https://chat.chatto.jp:22000/images/chatto-logo.png" style="width: 75px; margin-left: 20px; margin-top: 8px">
          </div>
      
          <div id="template-body" style="text-align: center">
              <img src="https://chat.chatto.jp:22000/images/meeting-main-img.png" style="width: 75%; min-width: 250px">
      
              <div id="template-meeting_details" style="text-align: center; color: #2e2d2d; margin-top: 35px;">
                  <span class="meeting-name" style="font-size: 24px; font-weight: 900; font-weight: 600;">Dear, ${projectName}</span>
                  <p class="meeting-joinline" style="margin-top: 10px; font-size: 16px; font-weight: 600;">Join the meeting ${meetingData.meeting_title} at <span
                          style="color: #2468e5;">${meetingFormatedDate + ' ' + meetingData.meeting_time} </span>
                          ${meetingData.meeting_zone + ''}</p>
      
                  <div style="margin-top: 42px;">
                      <p style="margin-bottom: 7px; font-size: 14px; font-weight: 600;">Click this link to join:</p>
                      <span class="meeting-link" style="color: #00adff; font-size: 16px; font-weight: 600;">
                      <a href='${projectLink}/meeting?meetingId=${meetingData.meeting_id}'>${projectLink}/meeting</a>
                      </span>
                  </div>
              </div>
      
              <div id="template-meeting_creds"
                  style="width: 90%; margin-top: 32px; padding: 5%; background-color: #eaf8fd;">
                  <div style="color: #2e2d2d; height: 95px; width: 100%;">
                  <table style="width: 100%; border: 0">
                  <tr>
                      <th>
                          <div>
                              <p class="meeting-id" style="font-size: 14px; font-weight: 600;">Your meeting id:</p>
                              <p class="meeting-id-val" style="font-size: 16px; font-weight: 600;">${meetingData.meeting_id}</p>
                          </div>
                      </th>
                      <th style="border-left: 1px solid #d3d1d1">
                          <div>
                              <p class="meeting-password" style="font-size: 14px; font-weight: 600;">Meeting session password:</p>
                              <p class="meeting-password-val" style="font-size: 16px; font-weight: 600;">${meetingData.meeting_password}</p>
                          </div>
                      </th>
                  </tr>
              </table>
                  </div>
              </div>
          </div>
      
          <div id="template-footer" style="margin-top: 40px; color: #2e2d2d;">
              <div style="text-align: center;  padding-bottom: 1px;">
                  <p style="margin-bottom: 0; font-size: 14px; font-weight: 600;">Link expiry date:</p>
                  <p style="margin-top: 7px; color: #2468e5; font-size: 16px; font-weight: 600;">${expiryTime + "" + expiryAMPM + " " + meetingData.meeting_zone}</p>
              </div>
          </div>
      </div>
      </body>
      
      </html>`;

          mailOptions = {
            from: emailFrom,
            to: allEmails,
            subject: 'You have a Meeting to Attend',
            text: projectName,
            html: meeting_EmailTemplate
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) console.log(error);
            else console.log("Email sent");
          });

        }
      }

    } catch (error) {
      console.error(error);
    }

    // mailOptions = {
    //   from: emailFrom,
    //   to: allEmails,
    //   subject: 'You have a Meeting to Attend',
    //   text: projectName,
    //   html: meeting_EmailTemplate
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) console.log(error);
    //   else console.log("Email sent");
    // });

    res.json(savedMeeting);
  }


  router.joinMeeting = async function (req, res) {
    //  console.log('joinMeeting ', req.body);
    var meetingData = JSON.parse(req.body.meetingData);
    var meetingMembers = meetingData.meetingPersons;

    let joinedMembers = await meetingModel.findOneAndUpdate({ '_id': meetingData.meeting_id }, { $push: { 'meeting_members': meetingMembers } }, { useFindAndModify: false }).lean().exec();
    res.json(joinedMembers);
  }


  router.leaveMeeting = async function (req, res) {
    // console.log('leaveMeeting ', req.body);
    var meetingData = JSON.parse(req.body.meetingData);

    let updatedMembers = await meetingModel.findOneAndUpdate(
      { '_id': meetingData.meeting_id, "meeting_members.memberId": meetingData.memberId },
      {
        $set: {
          "meeting_members.$.endDate": new Date(), "hasLeft": 1
        }
      }, { useFindAndModify: false }).lean().exec();

    res.json(updatedMembers);
  }

  router.endMeetingSession = async function (req, res) {
    // console.log('endMeetingSession: ', req.body);
    let endedMeeting = await meetingModel.deleteOne(
      { '_id': req.body._id }
    ).lean().exec();

    // let endedMeeting = await meetingModel.findOneAndUpdate(
    //   { '_id': req.body._id },
    //   {
    //     $set: {
    //       "closedAt": new Date()
    //     }, { useFindAndModify: false }
    //   }).lean().exec();

    res.json(endedMeeting);
  }


  router.updateMeeting = async function (req, res) {
    var meetingData = JSON.parse(req.body.meetingData);
    var meetingMembers = req.body.meetingPersons.split(",");
    var meetingFriends = JSON.parse(req.body.meetingFriends);

    var meetingFile = req.body.filename;
    let meetingDate = new Date(meetingData.meeting_date);
    let meetingFormatedDate = (("0" + meetingDate.getDate()).slice(-2)) + "-" + (("0" + (meetingDate.getMonth() + 1)).slice(-2));

    let meetingDuration = meetingData.meeting_duration.split(':');
    let durationHour, durationMinute = 0;
    let _expiryFullDate = meetingDate;

    if (meetingDuration[0]) {
      durationHour = +(meetingDuration[0]);
      _expiryFullDate.setHours(_expiryFullDate.getHours() + durationHour);
    }
    if (meetingDuration[1]) {
      durationMinute = +(meetingDuration[1]);
      _expiryFullDate.setMinutes(_expiryFullDate.getMinutes() + durationMinute);
    }

    let meetingTime = meetingData.meeting_time.split(':');
    let meetingHour, meetingMinute = 0;
    let expiryAMPM = "";
    let expiryTime = "";

    if (meetingTime[0]) {
      meetingHour = +(meetingTime[0]);
      expiryTime += (meetingHour + durationHour + ":");
    }
    if (meetingTime[1]) {
      let getMinutes = meetingTime[1].split(' ');
      meetingAMPM = getMinutes[1];
      meetingMinute = getMinutes[0];
      expiryTime += (meetingMinute);

      if (meetingAMPM == "pm") {
        let expiryTimeHours = meetingHour + durationHour + 12;
        if (expiryTimeHours < 24) expiryAMPM = "pm";
        else expiryAMPM = "am";
      }
      else if (meetingAMPM == "am") {
        let expiryTimeHours = meetingHour + durationHour;
        if (expiryTimeHours < 12) expiryAMPM = "am";
        else expiryAMPM = "pm";
      }
    }


    // ----------- *** SEND EMAIL TO MEMBERS *** -------------
    var emailFrom = "hello@chatto.jp";
    var emailPass = "";
    let projectLink = "";
    let projectName = "";


    if (req.body.projectId == "5d4c07fb030f5d0600bf5c03") {
      projectLink = "https://chat.chatto.jp";
      projectName = "Chatto";
    }


    // transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: emailFrom,
    //     pass: emailPass
    //   }
    // });

    let updatedMeeting = await meetingModel.findOneAndUpdate(
      {
        '_id': req.body._id, 'projectId': req.body.projectId
      },
      {
        $set: {
          'meeting_id': meetingData.meeting_id,
          'meeting_title': meetingData.meeting_title,
          'meeting_zone': meetingData.meeting_zone,
          'meeting_notification': meetingData.meeting_notification,
          'meeting_topic': meetingData.meeting_topic,
          'meeting_password': meetingData.meeting_password,
          'meeting_time': meetingData.meeting_time,
          'meeting_date': meetingData.meeting_date,
          'meeting_duration': meetingData.meeting_duration,
          // 'meeting_file': meetingFile,
          'meeting_members': []
        }
      }, { useFindAndModify: false }).lean().exec();

    let files = meetingFile;
    try {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let file = {
            "filename": files[i],
          };

          meetingModel.updateOne(
            {
              '_id': req.body._id, 'projectId': req.body.projectId
            },
            {
              $push: {
                'meeting_file': file,
              }
            }, { useFindAndModify: false }).lean().exec();
        }
      }
    } catch (error) {
      console.error(error);
    }

    // console.log("meetingFriends: ", meetingFriends);
    if (meetingMembers && (meetingMembers != null || meetingMembers != '') && meetingMembers.length != 0 && meetingMembers[0] != '') {

      const meeting_EmailTemplate =
        `
    <html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet">

<style>
    @media screen and (max-device-width: 480px),
    screen and (max-width: 480px) {
        #main-template-div{
            width: 100% !important;
        }

        .meeting-joinline{
          font-size: 12px !important;
      }

      .meeting-name{
          font-size: 18px !important;
      }

      .meeting-link{
          font-size: 12px !important;
      }

      .meeting-id{
        font-size: 12px !important;
      }
      .meeting-password{
        font-size: 12px !important;
      }
      .meeting-id-val{
        font-size: 14px !important;
      }

  .meeting-password-val{
      font-size: 14px !important;
  }
    }
</style>
</head>

<body style="font-family: 'Lato', sans-serif;  background-color: #3e3e52;">
<div id="main-template-div" style="margin-top: -10px; margin-right: auto; margin-left: auto; width: 75%; background-color: white;">
    <div id="template-header">
        <img src="https://chat.chatto.jp:22000/images/chatto-logo.png" style="width: 75px; margin-left: 20px; margin-top: 8px">
    </div>

    <div id="template-body" style="text-align: center">
        <img src="https://chat.chatto.jp:22000/images/meeting-main-img.png" style="width: 75%; min-width: 250px">

        <div id="template-meeting_details" style="text-align: center; color: #2e2d2d; margin-top: 35px;">
            <span class="meeting-name" style="font-size: 24px; font-weight: 900; font-weight: 600;">Dear, ${projectName}</span>
            <p class="meeting-joinline" style="margin-top: 10px; font-size: 16px; font-weight: 600;">Join the meeting ${meetingData.meeting_title} at <span
                    style="color: #2468e5;">${meetingFormatedDate + ' ' + meetingData.meeting_time} </span>
                    ${meetingData.meeting_zone + ''}</p>

            <div style="margin-top: 42px;">
                <p style="margin-bottom: 7px; font-size: 14px; font-weight: 600;">Click this link to join:</p>
                <span class="meeting-link" style="color: #00adff; font-size: 16px; font-weight: 600;">
                <a href='${projectLink}/meeting?meetingId=${meetingData.meeting_id}'>${projectLink}/meeting</a>
                </span>
            </div>
        </div>

        <div id="template-meeting_creds"
            style="width: 90%; margin-top: 32px; padding: 5%; background-color: #eaf8fd;">
            <div style="color: #2e2d2d; height: 95px; width: 100%;">
            <table style="width: 100%; border: 0">
            <tr>
                <th>
                    <div>
                        <p class="meeting-id" style="font-size: 14px; font-weight: 600;">Your meeting id:</p>
                        <p class="meeting-id-val" style="font-size: 16px; font-weight: 600;">${meetingData.meeting_id}</p>
                    </div>
                </th>
                <th style="border-left: 1px solid #d3d1d1">
                    <div>
                        <p class="meeting-password" style="font-size: 14px; font-weight: 600;">Meeting session password:</p>
                        <p class="meeting-password-val" style="font-size: 16px; font-weight: 600;">${meetingData.meeting_password}</p>
                    </div>
                </th>
            </tr>
        </table>
            </div>
        </div>
    </div>

    <div id="template-footer" style="margin-top: 40px; color: #2e2d2d;">
        <div style="text-align: center;  padding-bottom: 1px;">
            <p style="margin-bottom: 0; font-size: 14px; font-weight: 600;">Link expiry date:</p>
            <p style="margin-top: 7px; color: #2468e5; font-size: 16px; font-weight: 600;">${expiryTime + "" + expiryAMPM + " " + meetingData.meeting_zone}</p>
        </div>
    </div>
</div>
</body>

</html>`;

      mailOptions = {
        from: emailFrom,
        to: meetingMembers,
        subject: 'You have a Meeting to Attend',
        text: projectName,
        html: meeting_EmailTemplate
      };

      // needs recheck
      // meetingModel.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'friend_members': [] } }, { useFindAndModify: false }).lean().exec();
      meetingModel.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'meeting_members': meetingMembers } }, { useFindAndModify: false }).lean().exec();
    }
    else {
      meetingModel.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'friend_members': meetingFriends } }, { useFindAndModify: false }).lean().exec();
    }


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(updatedMeeting);
  }

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ MOBILE MEETING $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  router.updateMobileMeeting = async function (req, res) {

    var meetingData = JSON.parse(req.body.meetingData);
    var meetingMembers = req.body.meetingPersons.split(",");
    var meetingFile = req.body.filename;
    //    console.log('updateMobileMeeting: ',  req.body);
    if (meetingData.meeting_title == "" || meetingData.meeting_title == null) meetingData.meeting_title = undefined;
    if (meetingData.meeting_zone == "" || meetingData.meeting_zone == null) meetingData.meeting_zone = undefined;
    if (meetingData.meeting_notification == "" || meetingData.meeting_notification == null) meetingData.meeting_notification = undefined;
    if (meetingData.meeting_topic == "" || meetingData.meeting_topic == null) meetingData.meeting_topic = undefined;
    if (meetingData.meeting_time == "" || meetingData.meeting_time == null) meetingData.meeting_time = undefined;
    if (meetingData.meeting_date == "" || meetingData.meeting_date == null) meetingData.meeting_date = undefined;
    if (meetingData.meeting_duration == "" || meetingData.meeting_duration == null) meetingData.meeting_duration = undefined;
    if (meetingFile == null) meetingFile = undefined;

    // await meetingModel.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'meeting_members': [] } }, { useFindAndModify: false }).lean().exec();

    let updatedMeeting = await meetingModel.findOneAndUpdate(
      {
        '_id': req.body._id, 'projectId': req.body.projectId
      },
      {
        $set: {
          'meeting_id': meetingData.meeting_id,
          'meeting_title': meetingData.meeting_title,
          'meeting_zone': meetingData.meeting_zone,
          'meeting_notification': meetingData.meeting_notification,
          'meeting_topic': meetingData.meeting_topic,
          'meeting_password': meetingData.meeting_password,
          'meeting_time': meetingData.meeting_time,
          'meeting_date': meetingData.meeting_date,
          'meeting_duration': meetingData.meeting_duration,
          'meeting_file': meetingFile,
          'meeting_members': meetingMembers
        }
      }, { useFindAndModify: false }).lean().exec();

    // if(meetingMembers && (meetingMembers != null || meetingMembers != '') && meetingMembers.length != 0 && meetingMembers[0] != ''){
    //    await meetingModel.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'meeting_members': meetingMembers } }, { useFindAndModify: false }).lean().exec();
    // }
    res.json(updatedMeeting);
  }


  router.getMeetings = async function (req, res) {
    // let myMeetings = await meetingModel.find({ 'createdBy': req.params.userId, 'projectId': req.params.projectId, 'status': 1 }).sort({ createdAt: -1 }).lean().exec();
    // let joinedMeetings = await meetingModel.find({ 'status': 1, 'projectId': req.params.projectId, "friend_members._id": req.params.userId }).sort({ createdAt: -1 }).lean().exec();

    let allMeetings = await meetingModel.find({
      'status': 1, 'projectId': req.params.projectId,
      $or: [
        { 'createdBy': req.params.userId },
        { "friend_members._id": req.params.userId }
      ]
    }).sort({ createdAt: -1 }).lean().exec();

    // let allMeetings = myMeetings.concat(joinedMeetings);
    // console.log("allMeetings: ", allMeetings);
    res.json(allMeetings);
  }

  // ------------- Get single meeting ---------------------------
  router.getMeeting = async function (req, res) {
    // console.log('getCurrentMeeting ', req.params);
    let meeting = await meetingModel.findOne({ 'projectId': req.params.projectId, 'status': 1, 'meeting_id': req.params.meetingId }).populate("createdBy").sort({ createdAt: -1 }).lean().exec();
    res.json(meeting);
  }

  router.getMeetingList = async function (req, res) {
    //  console.log(req.params);
    let meetingsList = await meetingModel.find({ 'status': 1, 'projectId': req.params.projectId, "friend_members._id": req.params.userId }).sort({ createdAt: -1 }).lean().exec();
    res.json(meetingsList);
  }

  router.getSingleMeetingStatus = async function (req, res) {
    //  console.log('getSingleMeetingStatus ', req.params);
    // >>> needs reTest (changed on 1-29-2021) during screensharing fix <<<
    meetingModel.findOne({ 'projectId': req.params.projectId, 'meeting_id': req.params.meetingId }).lean().exec(function (err, meetData) {
      //  console.log("meetingmeetingmeeting: ", meetData);
      res.json(meetData);
    });
  }

  router.getCompletedMeetings = async function (req, res) {
    //  console.log('getCompletedMeetings ', req.body);
    let allMeetings = await meetingModel.find({ 'createdBy': req.params.userId, 'projectId': req.params.projectId, 'status': 0 }).sort({ createdAt: -1 }).lean().exec();
    res.json(allMeetings);
  }

  router.getMeetingMembers = async function (req, res) {
    let meetingMembers = await meetingModel.find({ 'meeting_id': req.params.meetingId, 'projectId': req.params.projectId }, { meeting_member }).lean().exec();
    res.json(meetingMembers);
  }

  router.activateMeeting = async function (req, res) {
    //  console.log('activateMeeting???? ', req.body);
    let updateMeeting = meetingModel.findOneAndUpdate({ 'meeting_id': req.body._id, 'projectId': req.body.projectId }, { $set: { 'activeStatus': req.body.activeStatus, 'status': req.body.meetingStatus } }, { useFindAndModify: false }).lean().exec();
    res.json(updateMeeting);
  }

  router.checkAdminStatus = async function (req, res) {
    let meeting = await meetingModel.findOne({ 'meeting_id': req.body._id, 'status': 1, 'projectId': req.body.projectId }).lean().exec();
    res.json({ 'adminActive': meeting.activeStatus });
  }

  router.checkJoiningUser = async function (req, res) {
   // console.log('checkJoiningUser::: ', req.body);
    let meeting = await meetingModel.findOne({ 'meeting_id': req.body._id, 'status': 1, 'projectId': req.body.projectId }).lean().exec();
    //  console.log('meeting::: ', meeting);

    if (meeting == null) {
      res.json({ "message": 'meeting doesnt exist, please check meeting_id being sent', "status": 0 });
      return;
    }

    const userExist = meeting.meeting_members.filter((obj) => {
      return req.body.email === obj;
    });

    //  console.log('userExist >>> ', userExist);
    if (userExist) {
      let meetingAuth = await meetingModel.findOne({ 'meeting_password': req.body.password, 'projectId': req.body.projectId }).lean().exec();
      //  console.log('meetingAuth <<<< ', meetingAuth);
      if (meetingAuth) {
        let userAlreadyReg = await userModel.findOne({ 'email': req.body.email, 'projectId': req.body.projectId }).lean().exec();
        if (!userAlreadyReg) {
          let newUser = new userModel({
            'projectId': req.body.projectId,
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.password,
          });
          newUser.save();
        }

        res.json({ 'data': meetingAuth, 'status': 1, 'adminActive': meeting.activeStatus });
      }
      else
        res.json({ "message": 'incorrect session password', "status": 0 });
    }
    else
      res.json({ "message": 'user is not a member of this meeting', "status": 0 });
  }


  router.updateMeetingFile = async function (req, res) {
    console.log(req.body);

    let updatedMeetingFile = await meetingModel.findOneAndUpdate(
      {
        '_id': req.body._id, 'projectId': req.body.projectId
      },
      {
        $set: {
          'recorded_file': req.body.fileName,
        }
      }, { useFindAndModify: false }).lean().exec();

    console.log("updatedMeetingFile: ", updatedMeetingFile);
    res.json(updatedMeetingFile);
  }


  router.uploadMeetingDocument = async function (req, res) {
    console.log("uploadMeetingDocument: ", req.body);

    let files = req.body.fileName;

    try {
      for (let i = 0; i < files.length; i++) {
        let file = {
          "filename": files[i],
        };

        meetingModel.findOneAndUpdate(
          {
            '_id': req.body._id, 'projectId': req.body.projectId
          },
          {
            $push: {
              'meeting_file': file,
            }
          }, { useFindAndModify: false }).lean().exec();
      }

      let meetingData = await meetingModel.findOne(
        {
          '_id': req.body._id, 'projectId': req.body.projectId
        }, { useFindAndModify: false }).lean().exec();

      res.json(meetingData);

    } catch (error) {
      console.error(error);
      res.json("Something went wrong");
    }
  }

  router.removeMeetingDocument = async function (req, res) {
    console.log("removeMeetingDocument: ", req.body);

    let updatedMeetingDoc = await meetingModel.findOneAndUpdate(
      {
        '_id': req.body._id, 'projectId': req.body.projectId
      },
      {
        $pull: {
          'meeting_file': { "_id": req.body.fileId },
        }
      }, { useFindAndModify: false }).lean().exec();

    res.json(updatedMeetingDoc);
  }


  return router;
}