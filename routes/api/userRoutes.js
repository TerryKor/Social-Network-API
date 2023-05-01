const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    createUser
} = require ('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

module.exports = router;