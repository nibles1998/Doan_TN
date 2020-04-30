const tourRoute = require('express').Router();
const tourCtrl = require('../controllers').controller.Tour;
const refactorBody = require('../utils');

tourRoute.get('/s', tourCtrl.getMany);
tourRoute.get('/:id', tourCtrl.getById);
tourRoute.post('/', refactorBody(["displayTourId!"]),tourCtrl.createData);
tourRoute.put('/:id', tourCtrl.updateById);
tourRoute.delete('/:id', tourCtrl.deleteById);

module.exports = tourRoute;