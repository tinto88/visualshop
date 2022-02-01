// const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getAllProducts = require("./utils/getAllProducts");
exports.getProductById = require("./utils/getProductById");
exports.addProduct = require("./utils/addProduct");
