const router = require('express').Router();

const {
  getInitialCards,
  createNewCardApi,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

// find cards
router.get('/', getInitialCards);
// create cards
router.post('/', createNewCardApi);
// delete cards
router.delete('/:cardId', removeCard);
// add likes
router.put('/:cardId/likes', addLike);
// remove like for the cards
router.delete('/:cardId/likes', removeLike);

module.exports = router;
