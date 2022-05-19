const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

exports.invoice = async (product, email) => {

    const snapshot = await db.collection("products").doc(product.id).get()
    const productData = snapshot.data()

    /// Total Price
    const totalprice = productData.price * product.amount



    /// Check Product Stock
    if (productData.stock < product.amount) {
        return {
            error: "Out Of Stock",
            id: product.id,
            stock: productData.stock,

        }
    }

    return {
        totalprice: totalprice,
        id: product.id,
        stock:productData.stock,
        amount: product.amount
    }

    // /// Check User Money
    // if (userData.money < totalprice) {
    //     return {
    //         error: "Not Enough Money",
    //         id: email,
    //         userMoney: userData.money,
    //         total: totalprice

    //     }
    // }

    // /// Purchase Money
    // else {
    //     await db.collection("users").doc(body.Email).update({
    //         "money": userData.money - totalprice
    //     })
    //     /// Edit Product Data
    //     const product_amount = productData.stock - product.amount
    //     await db.collection("products").doc(product.id).update({
    //         "stock": product_amount
    //     })
    // }
}
