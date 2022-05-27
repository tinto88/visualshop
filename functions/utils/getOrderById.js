const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {

    const param = request.query

    if (!param.id) {
        response.send(400)
    } else {
        const snapshot = await db.collection("orders").doc(param.id).get()
        const orderData = snapshot.data()

        console.log(param)
        functions.logger.info("Hello logs!", { structuredData: true });
        response.send(orderData);
    }


});
