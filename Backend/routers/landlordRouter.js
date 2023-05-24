const express = require("express");
const router = express.Router();
const landlordController = require("../landlordController");
const auth = require("../middleware")


router.get("",auth.authenticateAdmintoken,landlordController.getLandlords);
router.post("",landlordController.registerLandlord); 
router.post("/login",landlordController.loginLandlord);
router.get("/ID/:id",auth.authenticateAdminLandlordUsertoken,landlordController.getLandlordByLocation);  
router.delete("/:id",auth.authenticateAdmintoken,landlordController.deleteLandlord);
router.get("/star",landlordController.getStars);  
router.get("/arch",landlordController.getArch);  
router.get("/total",landlordController.getTotal);  
router.get("/avgReview",landlordController.getAvgReviews);  





module.exports = router;