const express = require('express');

const router = express.Router();

import { registerController, loginController, userController, refreshController ,productController} from '../controllers'
import auth from '../middlewares/auth'
// import admin from '../middlewares/admin'



// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/me', auth, userController.me);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);


router.post('/products',[auth],productController.store);



// router.put('/products/:id',[auth,admin],productController.update);
// router.delete('/products/:id',[auth,admin],productController.destroy);

// router.get('/products',[auth,admin],productController.index);
// router.get('/products/:id',[auth,admin],productController.show);

export default router;