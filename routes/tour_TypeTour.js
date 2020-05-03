const tour_TypeTourRoute = require('express').Router();
const tour_TypeTourCtrl = require('../controllers').controller.Tour_TypeTour;

tour_TypeTourRoute.get('/s', tour_TypeTourCtrl.getMany);
tour_TypeTourRoute.get('/:id', tour_TypeTourCtrl.getById);
tour_TypeTourRoute.post('/', tour_TypeTourCtrl.createData);
tour_TypeTourRoute.put('/:id', tour_TypeTourCtrl.updateById);
tour_TypeTourRoute.delete('/:id', tour_TypeTourCtrl.deleteById);

module.exports = tour_TypeTourRoute;