const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

// module.exports = functions.https.onRequest(async (request, response) => {
//     const snapshot = await db.collection("products").get()
//     const productData = snapshot.docs.map(doc => doc.data())
//     console.log(productData)

//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send({ result: productData });

// });

module.exports = functions.https.onCall(async (data, context) => {

    const snapshot = await db.collection("map").doc("mapSelect").get()
    const MapData = snapshot.data()
    console.log(MapData)

    functions.logger.info("Hello logs!", { structuredData: true });
    return (MapData);

})