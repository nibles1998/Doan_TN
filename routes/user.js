const userRoute = require('express').Router();
const userCtrl = require('../controllers').controller.User;

userRoute.get('/s', userCtrl.getMany);
userRoute.get('/:id', userCtrl.getById);
userRoute.post('/', userCtrl.createData);
userRoute.put('/:id', userCtrl.updateById);
userRoute.delete('/:id', userCtrl.deleteById);

module.exports = userRoute;
