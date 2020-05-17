const userRoleRoute = require('express').Router();
const userRoleCtrl = require('../controllers').controller.UserRole;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

userRoleRoute.get('/s', userRoleCtrl.getMany);
userRoleRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), userRoleCtrl.getById);
userRoleRoute.post('/', userRoleCtrl.createData);
userRoleRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { up: true }), userRoleCtrl.updateById);
userRoleRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { del: true }), userRoleCtrl.deleteById);

module.exports = userRoleRoute;