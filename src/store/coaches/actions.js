export default {
  async saveFormData(context, data) {
    const userId = context.rootGetters.getUserId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-web-app-bbf0d-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch data");
      throw error;
    }
    context.commit("saveData", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldFetchData) {
      return;
    }
    const response = await fetch(
      `https://coach-web-app-bbf0d-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch data");
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coach);
    }
    context.commit("setLastFetch");
    context.commit("saveCoaches", coaches);
  },
};
