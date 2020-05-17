const typeTourRoute = require('express').Router();
const typeTourCtrl = require('../controllers').controller.TypeTour;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

typeTourRoute.get('/s', typeTourCtrl.getMany);
typeTourRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), typeTourCtrl.getById);
typeTourRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin"], { create: true }), typeTourCtrl.createData);
typeTourRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { update: true }), typeTourCtrl.updateById);
typeTourRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { delete: true }), typeTourCtrl.deleteById);

module.exports = typeTourRoute;