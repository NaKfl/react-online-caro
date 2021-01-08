const classifyRank = point => {
  switch (true) {
    case point < 100: {
      return 'Bronze';
    }
    case point < 200: {
      return 'Silver';
    }
    case point < 300: {
      return 'Gold';
    }
    case point < 400: {
      return 'Platinum';
    }
    case point < 500: {
      return 'Diamond';
    }
    default: {
      return 'Master';
    }
  }
};
export default classifyRank;
