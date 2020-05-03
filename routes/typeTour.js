const typeTourRoute = require('express').Router();
const typeTourCtrl = require('../controllers').controller.TypeTour;

typeTourRoute.get('/s', typeTourCtrl.getMany);
typeTourRoute.get('/:id', typeTourCtrl.getById);
typeTourRoute.post('/', typeTourCtrl.createData);
typeTourRoute.put('/:id', typeTourCtrl.updateById);
typeTourRoute.delete('/:id', typeTourCtrl.deleteById);

module.exports = typeTourRoute;