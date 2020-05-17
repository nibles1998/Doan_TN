const tour_TypeTourRoute = require('express').Router();
const tour_TypeTourCtrl = require('../controllers').controller.Tour_TypeTour;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

tour_TypeTourRoute.get('/s', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), tour_TypeTourCtrl.getMany);
tour_TypeTourRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), tour_TypeTourCtrl.getById);
tour_TypeTourRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin"], { create: true }), tour_TypeTourCtrl.createData);
tour_TypeTourRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { update: true }), tour_TypeTourCtrl.updateById);
tour_TypeTourRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { delete: true }), tour_TypeTourCtrl.deleteById);

module.exports = tour_TypeTourRoute;