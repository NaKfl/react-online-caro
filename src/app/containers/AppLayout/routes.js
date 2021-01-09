import { Dashboard } from 'app/containers/Dashboard/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { Game } from 'app/containers/Game/Loadable';
import { UserList } from 'app/containers/Admin/UserList/Loadable';
import { GameList } from 'app/containers/Admin/GameList/Loadable';
export const privateRoutes = [
  {
    path: '/',
    component: Dashboard,
    key: 'home',
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
export const adminRoutes = [
  {
    path: '/admin/user',
    component: UserList,
    key: 'userlist',
  },
  {
    path: '/admin/game',
    component: GameList,
    key: 'gameList',
  },
];
export const gameRoutes = [{ path: '/game/:id', component: Game, key: 'game' }];
