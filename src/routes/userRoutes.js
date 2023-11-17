const express = require("express");
const createUser = require("../useCases/users/createUser");
const updateUser = require("../useCases/users/updateUser");
const deleteUser = require("../useCases/users/deleteUser");
const getAllUsers = require("../useCases/users/getAllUsers");
const getUserById = require("../useCases/users/getUserById");
const loginUser = require("../useCases/users/loginUser");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/user", verifyToken, getAllUsers);

router.get("/user/:id", verifyToken, getUserById);

router.post("/user", createUser);

router.put("/user", verifyToken, updateUser);

router.delete("/user/:id", verifyToken, deleteUser);

router.post("/user/login", loginUser);

module.exports = router;