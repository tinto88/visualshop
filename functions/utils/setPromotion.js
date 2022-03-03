const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {
    const body = request.body
    const promotionRequestBody = ["name"]

    if (!body) {
        /// No body Sent
        response.status(400).send("Body Required")
    } else {
        /// Validate Data
        const validateData = validate(body, promotionRequestBody)
        // console.log(validateData)
        if (validateData) {
            response.status(400).send(validateData + " Required")
        }
        else if (body.id) {
            /// Edit Product
            await db.collection("promotions").doc(body.id).set(body)
                .then(() => {
                    response.status(201).send(body)
                }).catch(e => {
                    response.send(e)
                })
        } else {
            /// Add Product
            const snapshot = await db.collection("promotions").get()
            const promotionData = snapshot.docs.map(doc => Number(doc.id))
            promotionData.sort(function (a, b) { return b - a })
            
            const productsnapshot = await db.collection("products").doc(body.product_id).get()
            const productData = productsnapshot.data()
            const promotionBody = {
                id: zeroPad(promotionData[0] + 1, 3),
                promotion_price: productData.price - (((body.discount_percentage)/100) * productData.price),
                ...body
            }

            // console.log(productData.data().price)
            // response.send(promotionBody)

            await db.collection("promotions").doc(promotionBody.id).set(promotionBody)
                .then(() => {
                    // response.json(body)
                    response.status(201).send(promotionBody)
                }).catch(e => {
                    response.send(e)
                })


        }


    }
});

function zeroPad(num, count) {
    var numZeropad = num + '';
    while (numZeropad.length < count) {
        numZeropad = "0" + numZeropad;
    }
    return numZeropad;
}

function validate(body, schema) {
    for (let i = 0; i < schema.length; i++) {
        const element = schema[i];
        if (!body[element]) {
            // console.log(element, body[element], !body[element]);
            return element
        }
    }
    return false
}