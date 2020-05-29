const billRoute = require('express').Router();
const billCtrl = require('../controllers').controller.Bill;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

billRoute.get('/s', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { read: true }), billCtrl.getMany);
billRoute.get('/:_id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { read: true }), billCtrl.getById);
billRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin"], { create: true }), billCtrl.createData);
billRoute.put('/:_id', authenticate.authenticateJWT, role.checkRole(["Admin"], { up: true }), billCtrl.updateById);
// billRoute.delete('/:id', billCtrl.deleteById);

module.exports = billRoute;
