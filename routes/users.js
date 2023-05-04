const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  editProfileUserApi,
  updateProfileUserAvatar,
} = require('../controllers/users');

// find everyone users
router.get('/', getUsers);
// find users id
router.get('/:userId', getUserId);
// create new user
router.post('/', createUser);
// edit profile
router.patch('/me', editProfileUserApi);
// avatar update
router.patch('/me/avatar', updateProfileUserAvatar);

module.exports = router;
