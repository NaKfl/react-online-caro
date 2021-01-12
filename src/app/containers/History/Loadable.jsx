import { lazyLoad } from 'utils/loadable';

export const History = lazyLoad(
  () => import('./index'),
  module => module.History,
);
