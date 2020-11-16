const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

const userController = require("../controllers/user-controller");

router.post("/", userController.createUser);
router.post("/login", userController.login);
router.get("/", login.required, userController.getAllUsers);
router.get("/:id", login.required, userController.getUserDetail);
router.patch("/:id", login.required, userController.updateUser);
router.put("/pwd/", login.required, userController.updateUserPwd);
router.delete("/:id", login.required, userController.deleteUser);

/*


*/
module.exports = router;
