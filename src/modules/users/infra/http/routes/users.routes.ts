import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const routes = Router();
const usersController = new UsersController();

routes.use(ensureAuthenticated);

routes.get('/', usersController.index);

export default routes;
