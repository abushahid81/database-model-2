import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";


const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (name && email && phone && message) {
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                message: message,
            });

            const createdUser = await newUser.save();

            res.json({
                code: 200,
                remark: "user created",
            });
        } else {
            res.status(400);
            res.json({
                code: 400,
                remark: "title or description missing",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: "failed",
        });
    }
});


const getUsers = asyncHandler(async (req, res) => {
    try {

        let filterObject = {
            isArchived: req.query.isArchived === undefined ? false : req.query.isArchived
        }

        if (req.query.search) {
            filterObject.title = {
                $regex: req.query.search,
                $options: "i"
            }
        }

        const users = await User.find(filterObject);

        res.json({
            code: 200,
            remark: "success",
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: "failed",
        });
    }
});


const updateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (user) {
            const { name, email, phone, message, archivedToggle } = req.body;


            user.name = name || user.name;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            user.message = message || user.message;
            user.isArchived = archivedToggle === undefined ? user.isArchived : archivedToggle;

            await user.save();

            res.json({
                code: 200,
                remarl: "user updated",
            });
        } else {
            console.log(error);
            res.status(404);
            res.json({
                code: 404,
                remark: "User not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: "failed",
        });
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        res.json({
            code: 200,
            remark: "user deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: "Something went wrong",
        });
    }
});

export { createUser, getUsers, updateUser, deleteUser };
