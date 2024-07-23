const User = require('../models/user');
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(201).json({message:"All users", user: users});

    }catch (err) {
        res.status(403).json({message: err.message});
    }
}
async function getUserById(req, res) {
    const {id} =req.body;
    try {
        const users = await User.findById({id: id});
        return res.status(201).json({message:"user saved successfully", user: users});

    }catch (err) {
        res.status(403).json({message: err.message});
    }
}
async function updateUser(req, res) {
    const {firstName, lastName, email, password} =req.body;
    try {
        // const users = await User.updateOne();
        // return res.status(201).json({message:"user saved successfully", user: users});

    }catch (err) {
        res.status(403).json({message: err.message});
    }
}
async function deleteUser(req, res) {
    const {id} =req.body;
    try {
        const users = await User.deleteOne({id:id});
        return res.status(201).json({message:"user saved successfully", user: users});

    }catch (err) {
        res.status(403).json({message: err.message});
    }
}

module.exports = {getAllUsers, getUserById, updateUser, deleteUser}