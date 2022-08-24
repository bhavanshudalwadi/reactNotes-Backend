const express = require('express');
const {
    createUser,
    getUsers,
    getUser,
    authUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

const fetchUser = require('../middleware/fetchUser')

const router = express.Router();

// Temp
router.get('/', getUsers)
// Use Token and Get User Details: GET "api/auth/getuser" Login Required
router.get('/getuser', fetchUser ,getUser)
// Create New User: POST "api/auth/signup"
router.post('/signup', createUser)
// Authenticate User and Genrate Token: POST "api/auth/login"
router.post('/login', authUser)
// Update User Details: PATCH "api/auth/updateuser" Login Required
router.patch('/updateuser', fetchUser ,updateUser)
// Delete User: DELETE "api/auth/deleteuser" Login Required
router.delete('/deleteuser', fetchUser ,deleteUser)

module.exports = router;