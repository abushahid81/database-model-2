import express from "express"
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js "


const router = express.Router()

router.route('/').post(createUser).get(getUsers)
router.route('/:userId').put(updateUser).delete(deleteUser)

export default router