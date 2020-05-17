const companyRoute = require('express').Router();
const companyCtrl = require('../controllers').controller.Company;
const authenticate = require('../middleware/authenticate');
const role = require('../middleware/role');

companyRoute.get('/s', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), companyCtrl.getMany);
companyRoute.get('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { read: true }), companyCtrl.getById);
companyRoute.post('/', authenticate.authenticateJWT, role.checkRole(["Admin"], { create: true }), companyCtrl.createData);
companyRoute.put('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { update: true }), companyCtrl.updateById);
companyRoute.delete('/:id', authenticate.authenticateJWT, role.checkRole(["Admin"], { delete: true }), companyCtrl.deleteById);

module.exports = companyRoute;