const { Router } = require('express');


const userController = require('./controller/userController');




const routes = Router();

//Rotas de Usuario

routes.post('/signup', userController.create);
routes.post('/login', userController.login);
routes.put('/user', userController.update);
routes.delete('/user', userController.delete);
routes.get('/user', userController.list);
routes.get('/user/:username', userController.listOne);
routes.put('/user/limparIpHD', userController.limparIpHD);

module.exports = { routes };
