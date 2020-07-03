const userRoute = require('express').Router();
const userCtrl = require('../controllers').controller.User;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');
const refactorBody = require('../utils');

userRoute.get('/s', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), userCtrl.getMany);
userRoute.get('/:id', userCtrl.getById);
userRoute.post('/', refactorBody(['roleId-']), userCtrl.createData);
userRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { up: true }), userCtrl.updateById);
userRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { del: true }), userCtrl.deleteById);
userRoute.post('/login', authenticate.getToken);

module.exports = userRoute;
