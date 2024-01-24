const { signUp, logIn } = require("../controllers/user");

const router = require("express").Router();
console.log("+++++++")
router.post("/signup", signUp);
router.post("/login", logIn);
module.exports = router;
