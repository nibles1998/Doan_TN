const userRoleRoute = require('express').Router();
const userRoleCtrl = require('../controllers').controller.UserRole;

userRoleRoute.get('/s', userRoleCtrl.getMany);
userRoleRoute.get('/:id', userRoleCtrl.getById);
userRoleRoute.post('/', userRoleCtrl.createData);
userRoleRoute.put('/:id', userRoleCtrl.updateById);
userRoleRoute.delete('/:id', userRoleCtrl.deleteById);

module.exports = userRoleRoute;