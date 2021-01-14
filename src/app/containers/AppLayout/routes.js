import { Dashboard } from 'app/containers/Dashboard/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { Verify } from 'app/containers/Verify/Loadable';
import { ForgotPassword } from 'app/containers/ForgotPassword/Loadable';
import { Game } from 'app/containers/Game/Loadable';
import { UserList } from 'app/containers/Admin/UserList/Loadable';
import { GameList } from 'app/containers/Admin/GameList/Loadable';
import { Profile } from 'app/containers/Profile/Loadable';
import { History } from 'app/containers/History/Loadable';

export const privateRoutes = [
  {
    path: '/',
    component: Dashboard,
    key: 'home',
  },
  {
    path: '/profile',
    component: Profile,
    key: 'profile',
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
  {
    path: '/verify',
    component: Verify,
    key: 'verify',
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    key: 'forgotpassword',
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
  {
    path: '/admin',
    component: UserList,
    key: 'default',
  },
];

export const gameRoutes = [
  { path: '/game/:id', component: Game, key: 'game' },
  {
    path: '/history/:id',
    component: History,
    key: 'history',
  },
];
