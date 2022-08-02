export default {
  async loadRequests(context) {
    //Alternative-1
    // const response = await fetch(
    //   "https://coach-web-app-bbf0d-default-rtdb.firebaseio.com/requests.json"
    // );

    //Alternative-2
    const userId = context.rootGetters.getUserId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-web-app-bbf0d-default-rtdb.firebaseio.com/requests/${userId}.json?auth=` +
        token
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch data");
      throw error;
    }
    // Alternative-1
    // const userId = context.rootGetters.getUserId;
    // const requests = [];
    // for (const key in responseData) {
    //   if (key === userId) {
    //     for (const res in responseData[key]) {
    //       const request = {
    //         id: res,
    //         coachId: key,
    //         email: responseData[key][res].email,
    //         message: responseData[key][res].message,
    //       };
    //       requests.push(request);
    //     }
    //     break;
    //   }
    // }

    //Alternative-2
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: userId,
        email: responseData[key].email,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    context.commit("saveRequests", requests);
  },
  async addRequest(context, payload) {
    const request = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://coach-web-app-bbf0d-default-rtdb.firebaseio.com/requests/${payload.id}.json`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = new Error(response.message || "Failed to add data");
      throw error;
    }

    const responseData = await response.json();

    request.id = responseData.name;
    request.coachId = payload.id;

    context.commit("addRequest", request);
  },
};
