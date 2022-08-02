export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    return getters.coaches.some((coach) => coach.id === rootGetters.getUserId);
  },

  shouldFetchData(state) {
    const timestamp = new Date().getTime();
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    return (timestamp - lastFetch) / 1000 > 60;
  },
};
