import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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
    // console.debug("API Call:", endpoint, data, method);

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

    try {
      const response = await this.request(endpoint, data, method);
      JoblyApi.token = response.token;
      localStorage.setItem("joblyToken", response.token);
      return response.token;
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
    try {
      const response = await this.request(endpoint, data, method);
      //Save token to api class
      JoblyApi.token = response.token;
      localStorage.setItem("joblyToken", response.token);
      return response.token;
    } catch (err) {
      throw err;
    }
  }

  /** GET "/companies/""  =>
   * { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
   * Returns an array of company objects
   *
   * Can filter on provided search filters:
   * - minEmployees
   * - maxEmployees
   * - nameLike (will find case-insensitive, partial matches)
   */

  static async getAllCompanies(query = {}) {
    const { name, minEmployees, maxEmployees } = query;

    // Build url with company filters as query strings
    let queryString = "";
    const queryParams = [];
    if (name) queryParams.push(`name=${name}`);
    if (minEmployees) queryParams.push(`minEmployees=${minEmployees}`);
    if (maxEmployees) queryParams.push(`maxEmployees=${maxEmployees}`);

    if (queryParams.length) {
      queryString = `?${queryParams.join("&")}`;
    }

    const endpoint = `companies${queryString}`;
    try {
      const response = await this.request(endpoint);
      return response;
    } catch (err) {
      console.error("Error in getAllCompanies:", err);
      throw err;
    }
  }

  /** GET /[handle]  =>  { company }
   * Returns Company object
   *
   *  Where Company = { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   *
   */

  static async getCompany(handle) {
    try {
      let response = await this.request(`companies/${handle}`);
      return response;
    } catch (err) {
      console.error("Error in getCompany:handle", err);
      throw err;
    }
  }

  /** GET "/jobs/" => { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
   *
   * Returns an object with an array of jobs
   *
   * Can filter on:
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   */

  static async getAllJobs(query = {}) {
    const { title, minSalary, hasEquity } = query;

    // Build url with job filters as query strings
    let queryString = "";
    const queryParams = [];
    if (title) queryParams.push(`title=${title}`);
    if (minSalary) queryParams.push(`minSalary=${minSalary}`);
    if (hasEquity !== undefined) queryParams.push(`hasEquity=${hasEquity}`);

    if (queryParams.length) {
      queryString = `?${queryParams.join("&")}`;
    }

    const endpoint = `jobs${queryString}`;
    try {
      const response = await this.request(endpoint);
      return response;
    } catch (err) {
      console.error("Error in getAllJobs:", err);
      throw err;
    }
  }

  /** GET /[jobId] => { job }
   *
   * Returns { id, title, salary, equity, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Authorization required: none
   */

  static async getJob(id) {
    const endpoint = `jobs/${id}`;
    try {
      const response = await this.request(endpoint);
      return response;
    } catch (err) {}
  }

  /** GET /[username] => { user }
   *
   * Returns { username, firstName, lastName, isAdmin, jobs }
   *   where jobs is { id, title, companyHandle, companyName, state }
   *
   * Authorization required: admin or same user-as-:username
   **/

  static async getUser(username) {
    const endpoint = `users/${username}`;
    try {
      const response = await this.request(endpoint);
      return response;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }

  /** PATCH /[username] { user } => { user }
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Authorization required: admin or same-user-as-:username
   **/

  static async updateUser(username, userData) {
    const endpoint = `users/${username}`;
    const data = userData;
    const method = "patch";
    try {
      const response = await this.request(endpoint, data, method);
      return response;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }

  /** POST /[username]/jobs/[id]  { state } => { application }
   *
   * Returns {"applied": jobId}
   *
   * Authorization required: admin or same-user-as-:username
   * */
  static async applyToJob(username, jobId) {
    const endpoint = `users/${username}/jobs/${jobId}`;
    const method = "post";

    try {
      const response = await this.request(endpoint, {}, method);
      return response;
    } catch (err) {
      console.error(err);

      throw new Error(err);
    }
  }
}

export default JoblyApi;
