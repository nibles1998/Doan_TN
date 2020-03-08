const companyRoute = require('express').Router();
const companyCtrl = require('../controllers').controller.Company;

companyRoute.get('/s', companyCtrl.getMany);
companyRoute.get('/:id', companyCtrl.getById);
companyRoute.post('/', companyCtrl.createData);
companyRoute.put('/:id', companyCtrl.updateById);
companyRoute.delete('/:id', companyCtrl.deleteById);

module.exports = companyRoute;