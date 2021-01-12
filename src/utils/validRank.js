import classifyRank from './classifyRank';
import { RANKS, USER_RANK } from './constants';
const validRank = point => {
  const userRank = classifyRank(point);
  const indexUserRank = RANKS.indexOf(userRank);
  if (userRank === USER_RANK.BRONZE) {
    return [USER_RANK.SILVER, USER_RANK.SILVER];
  }
  if (userRank === USER_RANK.MASTER) {
    return [USER_RANK.DIAMOND, USER_RANK.DIAMOND];
  }
  return [RANKS[indexUserRank - 1], RANKS[indexUserRank + 1]];
};
export default validRank;
