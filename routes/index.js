const express = require('express');

const router = express.Router();

import { registerController, loginController, userController } from '../controllers'
import auth from '../middlewares/auth'


// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/me', auth, userController.me);




export default router;