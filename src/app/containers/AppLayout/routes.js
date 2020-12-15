import { Dashboard } from 'app/containers/Dashboard/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { Game } from 'app/containers/Game/Loadable';
export const privateRoutes = [
  {
    path: '/',
    component: Dashboard,
    key: 'home',
  },
  {
    path: '/game/:id',
    component: Game,
    key: 'game',
  },
];

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
    key: 'login',
  },
  {
    path: '/register',
    component: Register,
    key: 'register',
  },
];
