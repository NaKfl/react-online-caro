import { lazyLoad } from 'utils/loadable';

export const ForgotPassword = lazyLoad(
  () => import('./index'),
  module => module.ForgotPassword,
);
