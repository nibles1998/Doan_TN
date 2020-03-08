const tourRoute = require('express').Router();
const tourCtrl = require('../controllers').controller.Tour;

tourRoute.get('/s', tourCtrl.getMany);
tourRoute.get('/:id', tourCtrl.getById);
tourRoute.post('/', tourCtrl.createData);
tourRoute.put('/:id', tourCtrl.updateById);
tourRoute.delete('/:id', tourCtrl.deleteById);

module.exports = tourRoute;