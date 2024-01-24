const {
  signUp,
  logIn,
  changePassword,
  updateDetails,
} = require("../controllers/user");
const isAuthorized = require("../middlewares/auth");

const router = require("express").Router();
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/changepassword/:userId",isAuthorized, changePassword);
router.put("/updatedetails/:userId",isAuthorized, updateDetails);

module.exports = router;
