const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {

    const body = request.body

    if (!body) {
        response.send(400)
    } else {
        const snapshot = await db.collection("users").doc(body.Email).get()
        const bodyData = snapshot.data()

        console.log(body)
        functions.logger.info("Hello logs!", { structuredData: true });
        response.send(bodyData);
    }


});
