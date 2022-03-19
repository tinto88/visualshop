const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
const { deletePromotionByProduct } = require("../_fn/deletePromotionByProduct")

module.exports = functions.https.onRequest(async (request, response) => {

    const param = request.query
    


    if (!param.id) {
        response.send(400)
    } else {
        const deleteProduct = await deletePromotionByProduct(param.id)
        console.log(deleteProduct);
        if (deleteProduct.status == 200){
            response.status(200).send(deleteProduct.message)
        }else{
            response.send(deleteProduct)
        }

        // await DeletePromotion(param.id)
        // await db.collection("products").doc(param.id).delete()
        //     .then(() => {
        //         response.status(200).send("Delete " + param.id + " Success")
        //     }).catch(e => {
        //         response.send(e)
        //     })



    }


});

async function DeletePromotion(product_id) {
    var jobskill_query = db.collection('promotions').where('product_id', '==', product_id);
    jobskill_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}