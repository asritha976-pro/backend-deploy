const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const {authenticate} = require('../middlewares/authMiddleware');
const {requiredRole} = require('../middlewares/verifyRoleMiddleware');

userRouter.get('/',authenticate,requiredRole(['admin']),userController.getAllUsers);
userRouter.patch('/balance',userController.modifyInitialBalance);
userRouter.get('/balance',authenticate,userController.getBalance);

userRouter.put('/set-balance',authenticate,userController.updateBalance)

module.exports = userRouter;