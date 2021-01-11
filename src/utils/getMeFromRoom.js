import { getUser } from 'utils/localStorageUtils';

const me = getUser();
const getMeFromRoom = room => {
  if (room.firstPlayer?.id === me.id) return room.firstPlayer;
  if (room.secondPlayer?.id === me.id) return room.secondPlayer;
  return room.viewingList?.find(item => item.id === me.id);
};

export default getMeFromRoom;
