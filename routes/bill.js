const billRoute = require('express').Router();
const billCtrl = require('../controllers').controller.Bill;

billRoute.get('/s', billCtrl.getMany);
billRoute.get('/:id', billCtrl.getById);
billRoute.post('/', billCtrl.createData);
billRoute.put('/:id', billCtrl.updateById);
billRoute.delete('/:id', billCtrl.deleteById);

module.exports = billRoute;
