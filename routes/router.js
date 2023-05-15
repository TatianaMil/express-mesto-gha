const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { validationLogin, validationCreateUser } = require('../utils/validation');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('404: Страница не найдена.'));
});

module.exports = router;
