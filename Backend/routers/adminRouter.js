const express = require("express");
const router = express.Router();
const adminController = require("../adminController");
const auth = require("../middleware")

router.post("",auth.authenticateAdmintoken,adminController.registerAdmin);
router.post("/login",adminController.loginAdmin);
router.delete("/:id",auth.authenticateAdmintoken,adminController.deleteAdmin);

module.exports = router;