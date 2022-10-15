const express = require('express');

const router = express.Router();

import {registerController ,loginController} from '../controllers'

// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

router.post('/register', registerController.register)
router.post('/login', loginController.login)




export default router;