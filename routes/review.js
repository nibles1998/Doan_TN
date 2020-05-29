const reviewRoute = require('express').Router();
const reviewCtrl = require('../controllers').controller.Review;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

reviewRoute.get('/s', role.checkRoleQuery(["userid"], ["Admin", "Customer"], { read: true }), reviewCtrl.getMany);
reviewRoute.get('/:_id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { read: true }), reviewCtrl.getById);
reviewRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { create: true }), reviewCtrl.createData);
reviewRoute.put('/:_id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { up: true }), reviewCtrl.updateById);
reviewRoute.delete('/:_id', authenticate.authenticateJWT, role.checkRole(["Admin", "Customer"], { del: true }), reviewCtrl.deleteById);

module.exports = reviewRoute;