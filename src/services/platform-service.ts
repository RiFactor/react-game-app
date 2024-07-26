import apiClient from "./api-client";

class PlatformService {
  getAllPlatforms() {
    const controller = new AbortController();
    const request = apiClient.get(`/platforms/lists/parents`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new PlatformService();
