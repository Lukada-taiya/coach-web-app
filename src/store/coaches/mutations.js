export default {
  saveData(state, payload) {
    state.coaches.push(payload);
  },

  saveCoaches(state, payload) {
    state.coaches = payload;
  },
  setLastFetch(state) { 
    const time = new Date().getTime();
    state.lastFetch = time;
  },
};
