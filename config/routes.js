const router = require('express').Router();
const user = require('../controller/user-controller');

router.get("/users", user.getUsers)
router.post("/users", user.addUser)
router.post("/users/update", user.updateUser)
router.get("/users/:id", user.getUserByID)
router.get("/users/delete/:id", user.deleteUser)

module.exports = router