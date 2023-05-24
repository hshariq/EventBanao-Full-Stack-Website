const express = require("express");
const router = express.Router();
const userController = require("../userController");
const auth = require("../middleware")


router.get("",auth.authenticateAdmintoken,userController.getUsers);
router.post("",userController.registerUser); 
router.post("/login",userController.loginUser); 
router.delete("/:id",auth.authenticateAdmintoken,userController.deleteUser);


module.exports = router;