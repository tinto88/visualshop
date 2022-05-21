const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
const { invoice } = require("../_fn/invoice")

module.exports = functions.https.onRequest(async (request, response) => {
    const body = request.body
    const requestBody = ["Email", "product"]
    const productRequestBody = countArray(body.product)
    console.log(productRequestBody);
    if (!body) {
        /// No body Sent
        response.status(400).send("Body Required")
    } else {
        /// Validate Data
        const validateData = validate(body, requestBody)
        if (validateData) {
            response.status(400).send(validateData + " Required")
            return
        }

        /// User Data
        const userSnapshot = await db.collection("users").doc(body.Email).get()
        const userData = userSnapshot.data()


        const invoiceArray = []
        for (const property in productRequestBody) {
            console.log(`${property}: ${productRequestBody[property]}`);
            const product = {
                id: property,
                amount: productRequestBody[property]
            }
            invoiceArray.push(await invoice(product, body.Email))
        }

        const totalInvoice = {
            totalPrice: 0,
            invoices: invoiceArray,
            user: body.Email
        }
        for (const element of invoiceArray) {
            totalInvoice.totalPrice = totalInvoice.totalPrice + element.totalprice

        }


        const validateInvoice = invoiceArray.filter(e => e.error)
        console.log(validateInvoice);
        if (validateInvoice.length > 0) {
            response.status(400).send({
                error: "Out Of Stock",
                products: validateInvoice
            })
            return
        }

        /// Check User Money
        if (userData.money < totalInvoice.totalPrice) {
            response.status(400).send({
                error: "Not Enough Money",
                id: body.Email,
                userMoney: userData.money,
                total: totalInvoice.totalPrice
            })
            return
        }


        /// Purchase Money
        await db.collection("users").doc(body.Email).update({
            "money": userData.money - totalInvoice.totalPrice
        })
        /// Edit Product Data
        for (const element of invoiceArray) {
            const product_amount = element.stock - element.amount
            await db.collection("products").doc(element.id).update({
                "stock": product_amount
            })
        }


        /// Add Order
        const orderSnapshot = await db.collection("orders").get()
        const orderData = orderSnapshot.docs.map(doc => Number(doc.id))
        orderData.sort(function (a, b) { return b - a })

        const orderBody = {
            "id": zeroPad(orderData[0] + 1, 3),
            "Address": "test",
            "total": totalInvoice.totalPrice,
            "purchase": true,
            "user": body.Email,
            "product": invoiceArray,
            "lastUpdated": admin.firestore.FieldValue.serverTimestamp(),
        }

        await db.collection("orders").doc(orderBody.id).set(orderBody)
            .then(() => {
                response.status(201).send(orderBody)
            }).catch(e => {
                response.send(e)
            })



    }
});

function zeroPad(num, count) {
    let newNum = num
    if (isNaN(newNum)) {
        newNum = 1
    }
    var numZeropad = newNum + '';
    while (numZeropad.length < count) {
        numZeropad = "0" + numZeropad;
    }
    return numZeropad;
}

function validate(body, schema) {
    for (let i = 0; i < schema.length; i++) {
        const element = schema[i];
        if (!body[element]) {
            return element
        }
    }
    return false
}

function countArray(array) {
    const counts = {};
    array.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log(counts)
    return counts
}