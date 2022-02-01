const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {
    const body = request.body

    if (!body) {
        response.send(400)
    } else {
        // await db.collection("products").add(body)
        //     .then(() => {
        //         response.send(201)
        //     }).catch(e => {
        //         response.send(e)
        //     })
        await db.collection("products").doc(body.id).set(body)
            .then(() => {
                response.send(201)
            }).catch(e => {
                response.send(e)
            })
    }
});
