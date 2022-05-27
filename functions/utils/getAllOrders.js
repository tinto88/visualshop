const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onCall(async (data, context) => {

    const snapshot = await db.collection("orders").get()
    const orderData = snapshot.docs.map(doc => doc.data())
    console.log(orderData)

    functions.logger.info("Hello logs!", { structuredData: true });
    return (orderData);

})