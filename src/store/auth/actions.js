let timer;
export default {
  async login(context, payload) {
    return context.dispatch("authenticate", {
      ...payload,
      mode: "login",
    });
  },
  async signUp(context, payload) {
    return context.dispatch("authenticate", {
      ...payload,
      mode: "signup",
    });
  },
  async authenticate(context, payload) {
    const mode = payload.mode;
    var url = "";
    if (mode === "login") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABLx1HNAYhO-ljO__NYvwZK_kfcNhBxAk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABLx1HNAYhO-ljO__NYvwZK_kfcNhBxAk";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to authenticate");
      throw error;
    }
    const token = responseData.idToken;
    const userId = responseData.localId;
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = expiresIn + new Date().getTime();

    timer = setTimeout(function() {
      context.dispatch("logout");
    }, expirationDate);
    const user = {
      token: token,
      userId: userId,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationDate", expirationDate);
    context.commit("setUser", user);
  },

  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiration = localStorage.getItem("expirationDate"); 
    const expirationDate = +expiration - new Date().getTime();
    if (expirationDate < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("logout");
    }, expirationDate);
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
};
