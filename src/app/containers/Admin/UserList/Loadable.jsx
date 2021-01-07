import { lazyLoad } from 'utils/loadable';

export const UserList = lazyLoad(
  () => import('./index'),
  module => module.UserList,
);
