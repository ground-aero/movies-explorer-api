const router = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUserMe,
} = require('../controllers/users');
const { updateMeValidator } = require('../middlewares/validator');

router.get('/users/', getUsers); // TEST ROUTE!
router.get('/users/me', getUserMe); // в '/me' итак передается authorization header, поэтому не нужно 2-й раз его защищать
router.patch('/users/me', updateMeValidator, updateUserMe);

module.exports = router;
