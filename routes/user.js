const {
  signUp,
  logIn,
  changePassword,
  updateDetails,
  getDetails,
  forgotpassword,
  reset,
  resetpassword,
} = require("../controllers/user");
const isAuthorized = require("../middlewares/auth");

const router = require("express").Router();
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/changepassword/:userId", isAuthorized, changePassword);
router.put("/updatedetails/:userId", isAuthorized, updateDetails);
router.get("/getdetails/:userId", isAuthorized, getDetails);
router.post("/forgotpassword", forgotpassword);
router.route("/reset/:resetToken").get(reset).post(resetpassword);
module.exports = router;
