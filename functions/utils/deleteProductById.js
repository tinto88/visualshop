const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {

    const param = request.query

    if (!param.id) {
        response.send(400)
    } else {
        await db.collection("products").doc(param.id).delete()
            .then(() => {
                response.status(200).send("Delete " + param.id + " Success")
            }).catch(e => {
                response.send(e)
            })



    }


});
