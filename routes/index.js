const express = require('express');

const router = express.Router();

import {registerController} from '../controllers'

// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

router.post('/register', registerController.register)




export default router;