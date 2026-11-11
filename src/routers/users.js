import express from "express"
import userController from "../controller/users.js"

const router = express.Router()

router.post("/users", userController.register)
router.get("/users", userController.usersGet)
router.get("/foods", userController.foodsGet)
router.post("/orders", userController.orderCreate)

export default router