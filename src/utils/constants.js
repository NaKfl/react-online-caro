export const AUTH_INFO_KEY = 'AuthenticationInfo';

export const ACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const STATUS = {
  WAITING: {
    value: 1,
    color: 'green',
    title: 'Waiting',
  },
  PLAYING: {
    value: 2,
    color: 'red',
    title: 'Playing',
  },
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};
export const COMMON_PROPERTIES = {
  status: '',
  data: null,
  error: null,
};

export const USER_STATUS = {
  ONLINE: {
    value: 'ONLINE',
    color: 'green',
    title: 'Online',
  },
  PLAYING: {
    value: 'PLAYING',
    color: 'orange',
    title: 'Playing',
  },
  IN_ROOM: {
    value: 'IN_ROOM',
    color: 'blue',
    title: 'In a room',
  },
  SEARCHING: {
    value: 'SEARCHING',
    color: 'purple',
    title: 'Searching a game',
  },
  READY: {
    value: 'READY',
    color: 'blue',
    title: 'In a room',
  },
  START: {
    value: 'START',
    color: 'orange',
    title: 'Playing',
  },
};

export const USER_RANK = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
  MASTER: 'MASTER',
};

export const RANKS = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  'MASTER',
];
