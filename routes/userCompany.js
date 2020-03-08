const userCompanyRoute = require('express').Router();
const userCompanyCtrl = require('../controllers').controller.UserCompany;

userCompanyRoute.get('/s', userCompanyCtrl.getMany);
userCompanyRoute.get('/:id', userCompanyCtrl.getById);
userCompanyRoute.post('/', userCompanyCtrl.createData);
userCompanyRoute.put('/:id', userCompanyCtrl.updateById);
userCompanyRoute.delete('/:id', userCompanyCtrl.deleteById);

module.exports = userCompanyRoute;