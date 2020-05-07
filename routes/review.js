const reviewRoute = require('express').Router();
const reviewCtrl = require('../controllers').controller.Review;

reviewRoute.get('/s', reviewCtrl.getMany);
reviewRoute.get('/:id', reviewCtrl.getById);
reviewRoute.post('/', reviewCtrl.createData);
reviewRoute.put('/:id', reviewCtrl.updateById);
reviewRoute.delete('/:id', reviewCtrl.deleteById);

module.exports = reviewRoute;