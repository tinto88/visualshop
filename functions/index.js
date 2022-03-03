// const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getAllProducts = require("./utils/getAllProducts");
exports.getProductById = require("./utils/getProductById");
exports.setProduct = require("./utils/setProduct");
exports.deleteProductById = require("./utils/deleteProductById");
exports.deleteManyProducts = require("./utils/deleteManyProducts");


exports.setPromotion = require("./utils/setPromotion");
exports.deletePromotionById = require("./utils/deletePromotionById");
exports.getAllPromotions = require("./utils/getAllPromotions");
exports.getPromotionById = require("./utils/getPromotionById");
