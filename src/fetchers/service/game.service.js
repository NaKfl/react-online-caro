import { WEB_API } from 'configs';
import request, { handleGeneralError } from '../index';

export const getList = () => {
  return request(WEB_API, {
    url: 'game',
    method: 'GET',
  })
    .then(({ data }) => data.data?.rows)
    .then(data => {
      if (data.length > 0) {
        const r = data.map(e => {
          return {
            firstUserName: e?.infoPlayerFirst?.name,
            secondUserName: e?.infoPlayerSecond?.name,
            winner:
              e?.playerFirst === e?.userWin
                ? e?.infoPlayerFirst?.name
                : e?.infoPlayerSecond?.name,
            id: {
              game: e.id,
              first: e?.playerFirst,
              second: e?.playerSecond,
              winner: e?.userWin,
              room: e?.room?.id,
            },
            updatedAt: e?.updatedAt,
            roomName: e?.room?.name,
          };
        });
        return { response: r };
      }
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const getListGameByUser = () => {
  return request(WEB_API, {
    url: 'game/user',
    method: 'GET',
  })
    .then(({ data }) => data.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
