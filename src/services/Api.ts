import { RouteSearchRequest, RouteSearchResponse } from "../types/RouteSearch";

class Api {
  constructor(public baseUrl: String) {}

  postRouteSearch = async (
    query: RouteSearchRequest
  ): Promise<RouteSearchResponse> => {
    try {
      const response = await fetch(`${this.baseUrl}/routes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-language": "en-US",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      });
      const res: RouteSearchResponse = await response.json();
      return res;
    } catch (e) {
      throw e;
    }
  };
}

const API = new Api("https://api.demo.kyyti.io/routing/v1");

export default API;
