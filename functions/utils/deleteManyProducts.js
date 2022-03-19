const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
const { deletePromotionByProduct } = require("../_fn/deletePromotionByProduct")

module.exports = functions.https.onCall(async (data, context) => {

    if (!data.id) {
        return (new functions.https.HttpsError("not-found", "No Id Selected"))
    } else {
        for (const id of data.id) {
            await deletePromotionByProduct(id)
        }
        return (new functions.https.HttpsError("ok", "", { message: "Delete Success" }))
    }

})
