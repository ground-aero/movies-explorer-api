const router = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUserMe,
} = require('../controllers/users');
const { validateUpdateMe } = require('../middlewares/validator');

router.get('/users/', getUsers); // TEST ROUTE!
router.get('/users/me', getUserMe); // в '/me' итак передается authorization header, поэтому не нужно 2-й раз его защищать
router.patch('/users/me', validateUpdateMe, updateUserMe);

module.exports = router;
