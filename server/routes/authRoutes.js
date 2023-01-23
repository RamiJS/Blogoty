const { Router } = require('express');
const authController = require('../controllers/authController')
const fileUploadController = require ('../controllers/fileUploadController');


const router = Router();


router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.delete('/logout', authController.logout_get);
router.patch('/update/:id', authController.update_patch);

// Get a user info
router.get('/userInfo/:id', authController.user_info_get);

// check if user is logged in 
router.get('/checkSession', authController.check_session);


module.exports = router;