const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {
    const body = request.body
    const productRequestBody = []

    if (!body) {
        /// No body Sent
        response.status(400).send("Body Required")
    } else {
        /// Validate Data
        const validateData = validate(body, productRequestBody)
        console.log(validateData)
        if (validateData) {
            response.status(400).send(validateData + " Required")
        }
        else if (body.Email) {
            /// User Data
            const userSnapshot = await db.collection("users").doc(body.Email).get()
            const userData = userSnapshot.data()
            /// Add Money
            const money = userData.money
            await db.collection("users").doc(body.Email).update({
                money: money + body.money
            })
   
            response.status(201).send(money+" was Added")
        } 
        // else {
        //     /// Add Product
        //     const snapshot = await db.collection("products").get()
        //     const productData = snapshot.docs.map(doc => Number(doc.id))
        //     productData.sort(function (a, b) { return b - a })

        //     const productBody = {
        //         id: zeroPad(productData[0] + 1, 3),
        //         ...body
        //     }

        //     console.log(productData)
        //     // response.send(productBody)

        //     await db.collection("products").doc(productBody.id).set(productBody)
        //         .then(() => {
        //             // response.json(body)
        //             response.status(201).send(productBody)
        //         }).catch(e => {
        //             response.send(e)
        //         })


        // }


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
            console.log(element, body[element], !body[element]);
            return element
        }
    }
    return false
}