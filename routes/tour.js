const tourRoute = require('express').Router();
const tourCtrl = require('../controllers').controller.Tour;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

tourRoute.get('/s', role.checkRoleQuery(["code"], ["Admin"], { read: true }), tourCtrl.getMany);
tourRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), tourCtrl.getById);
tourRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin"], { create: true }), tourCtrl.createData);
tourRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { up: true }), tourCtrl.updateById);
tourRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { del: true }), tourCtrl.deleteById);

module.exports = tourRoute;