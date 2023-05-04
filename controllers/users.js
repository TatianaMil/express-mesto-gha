const User = require('../models/user');

// find everyone users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

// find users id
module.exports.getUserId = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при поиске пользователя',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({
            message: 'Пользователь c указанным _id не найден',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

// create new user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// edit profile
module.exports.editProfileUserApi = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail().then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

// avatar update
module.exports.updateProfileUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
