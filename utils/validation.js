const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequestError');

// validation Url
const validationUrl = (url) => {
  const validate = validator.isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

// validation usrer ID
const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

// validation update profile
const updateProfileUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// validation update avatar
const updateProfileAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
});

// validation create card
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validationUrl),
  }),
});

// validation id card
const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

// validation email and password
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// validation user's all data
const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userIdValidation,
  updateProfileUserValidation,
  updateProfileAvatarValidation,
  createCardValidation,
  cardIdValidation,
  validationLogin,
  validationCreateUser,
};
