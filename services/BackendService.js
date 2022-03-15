import apiClient from "~/services/apiClient";

export default class BackendService {
  constructor () {
    this.apiClient = apiClient;
  }
}
