const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = functions.https.onRequest(async (request, response) => {
    const body = request.body
    const productRequestBody = []
    console.log(body);
    if (!body) {
        /// No body Sent
        response.status(400).send("Body Required")
    } else {
        /// Validate Data
        const validateData = validate(body, productRequestBody)
        console.log(validateData)
        if (validateData) {
            response.status(400).send(validateData + " Required")
            return
        }
        console.log(body)

        await db.collection("users").doc(body.Email).set(body)
            .then(() => {
                response.status(201).send(body)
            }).catch(e => {
                response.send(e)
            })
    }
});

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