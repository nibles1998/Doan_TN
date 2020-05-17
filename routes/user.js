const userRoute = require('express').Router();
const userCtrl = require('../controllers').controller.User;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

userRoute.get('/s', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), userCtrl.getMany);
userRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), userCtrl.getById);
userRoute.post('/', userCtrl.createData);
userRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { update: true }), userCtrl.updateById);
userRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { delete: true }), userCtrl.deleteById);
userRoute.post('/login', authenticate.getToken);

module.exports = userRoute;
