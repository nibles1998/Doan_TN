const userRoute = require('express').Router();
const userCtrl = require('../controllers').controller.User;

userRoute.get('/s', userCtrl.authenticateJWT, userCtrl.getMany);
userRoute.get('/:id', userCtrl.authenticateJWT, userCtrl.getById);
userRoute.post('/', userCtrl.authenticateJWT, userCtrl.createData);
userRoute.put('/:id', userCtrl.authenticateJWT, userCtrl.updateById);
userRoute.delete('/:id', userCtrl.authenticateJWT, userCtrl.deleteById);
userRoute.post('/login', userCtrl.getToken);

module.exports = userRoute;
