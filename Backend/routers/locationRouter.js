const express = require("express");
const router = express.Router();
const locationController = require("../locationController");
const auth = require("../middleware")

router.get("/id",auth.authenticateAdminLandlordtoken,locationController.getLocationLength);
router.get("/allLocations",auth.authenticateAdmintoken,locationController.getLocations); 
router.get("",auth.authenticateAdminLandlordUsertoken,locationController.displayLocations);
router.get("/archived",auth.authenticateAdminLandlordtoken,locationController.getArchivedLocations);
router.get("/displaylocation",auth.authenticateAdminLandlordtoken,locationController.displayLandlordLocations);
router.post("",auth.authenticateAdminLandlordtoken,locationController.addLocation);
router.patch("/archive/:id",auth.authenticateAdminLandlordtoken,locationController.archiveLocation);
router.patch("/unarchive/:id",auth.authenticateAdminLandlordtoken,locationController.unarchiveLocation);
router.get("/filter",auth.authenticateAdminLandlordUsertoken,locationController.FilterSearch);
router.get("/sortBy",auth.authenticateAdminLandlordUsertoken,locationController.OrderBy);
router.patch("/increment/:id",auth.authenticateAdminUsertoken,locationController.incrementCount);
router.get("/distinctLocations",auth.authenticateAdminLandlordUsertoken,locationController.getLocationArea);
router.get("/:id",auth.authenticateAdminLandlordUsertoken,locationController.getLocationByID);


module.exports = router;