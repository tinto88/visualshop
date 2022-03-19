const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

exports.deletePromotionByProduct = async (product_id) => {

    if (!product_id) {
        return {
            status: 400,
        }
    } else {
        await DeletePromotion(product_id)
        return await DeleteProduct(product_id)
    }


};

async function DeletePromotion(product_id) {
    var jobskill_query = db.collection('promotions').where('product_id', '==', product_id);
    jobskill_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}

async function DeleteProduct(product_id) {
    return await db.collection("products").doc(product_id).delete()
        .then(() => {
            return {
                status: 200,
                message: "Delete " + product_id + " Success"
            }
        }).catch(e => {
            return e
        })
}