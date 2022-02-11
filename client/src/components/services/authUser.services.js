import axios from "axios";

const API_URL = "https://localhost:443/api/user/";

class AuthService {
  login(name, password) {
    return axios
      .post(API_URL + "login", {
        name,
        password
      }, {
        withCredentials:true,
      })
  }

  register(name, password) {
    return axios.post(API_URL + "register", {
      name,
      password
    });
  }

  getCurrentUser() {
    return axios.get(API_URL + "infos", {
      withCredentials:true,
    });
  }

  deleteCurrentUser() {
    return axios.get(API_URL + "removeCurrentUser", {
      withCredentials:true,
    });
  }

  deleteUser() {
    return axios.delete(API_URL + "forget", {
      withCredentials: true,
    })
    .then(() => console.log("Account deleted."));
  }
}

export default new AuthService();