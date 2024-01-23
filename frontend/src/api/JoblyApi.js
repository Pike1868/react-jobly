import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** POST "/auth/register" - { user } => { token }
   * user must include { username, password, firstName, lastName, email }
   * Returns JWT token
   */

  static async register({ username, password, firstName, lastName, email }) {
    const endpoint = "auth/register";
    const method = "post";
    const data = { username, password, firstName, lastName, email };
    console.log("Register method called:", data);

    try {
      const response = await this.request(endpoint, data, method);
      if (response.status === 200) {
        JoblyApi.token = response.token;
        localStorage.setItem("joblyToken", response.token);
        return response.token;
      }
    } catch (err) {
      throw err;
    }
  }

  /** POST "/auth/token" - { username, password } => { token }
   * Authenticates username and password
   * Returns JWT token
   **/
  static async login(username, password) {
    const endpoint = "auth/token";
    const method = "post";
    const data = { username, password };
    console.log("Login method called:");
    try {
      const response = await this.request(endpoint, data, method);
      //Save token to api class
      if (response.status === 200) {
        JoblyApi.token = response.token;
        localStorage.setItem("joblyToken", response.token);
        return response.token;
      }
    } catch (err) {
      throw err;
    }
  }
  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
}

export default JoblyApi;
