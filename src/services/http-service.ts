import apiClient from "./api-client";

interface IProps {
  selectedGenre?: string | undefined;
  searchGameName?: string | undefined;
  selectedPlatform?: string | undefined;
}

class HttpService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll({ searchGameName, selectedGenre, selectedPlatform }: IProps) {
    const controller = new AbortController();

    const request = apiClient.get(`${this.endpoint}`, {
      // .get<Game[]>?
      signal: controller.signal,
      params: {
        genres: selectedGenre,
        search: searchGameName,
        parent_platforms: selectedPlatform, // id can be string or number?
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
