const express = require("express");
const router = express.Router();
const reviewController = require("../reviewController");
const auth = require("../middleware")

router.get("/:id",auth.authenticateAdminLandlordUsertoken,reviewController.getReviews);
router.post("/:id",auth.authenticateAdminUsertoken,reviewController.postReviews);

module.exports = router;