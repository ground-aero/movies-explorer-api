const router = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUserMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
// router.use(auth);

router.get('/users/', getUsers); // TEST ROUTE!
router.get('/users/me', auth, getUserMe); // в '/me' итак передается authorization header, поэтому не нужно 2-й раз его защищать
router.patch('/users/me', auth, updateUserMe);

module.exports = router;
