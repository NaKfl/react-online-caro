import { lazyLoad } from 'utils/loadable';

export const GameList = lazyLoad(
  () => import('./index'),
  module => module.GameList,
);
