// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// admin.initializeApp();


// module.exports.uploadTest = functions.https.onRequest(async (request, response) => {
//     const imgData = request.body.imgData;

//     const bucket = admin.storage().bucket('my-bucket.appspot.com');
//     const file = bucket.file('myFolder/myFile.jpg');

//     var imgBuffer = new Buffer.from(imgData, 'base64')

//     await file.save(imgBuffer, {
//         contentType: 'image/jpeg'
//     }).catch(err => {
//         console.error("Upload bad!", err);
//         response.send('0');
//     });

//     response.send('1');
// })