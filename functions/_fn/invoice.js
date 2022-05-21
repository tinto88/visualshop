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
}
