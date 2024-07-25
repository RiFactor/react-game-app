import { keyString } from "../constants/api";
import apiClient from "./api-client";

class PlatformService {
  getAllPlatforms() {
    const controller = new AbortController();
    const platformRequest = apiClient.get(
      `/platforms/lists/parents${keyString}`,
      {
        signal: controller.signal,
      }
    );

    return { platformRequest, platformCancel: () => controller.abort() };
  }
}

export default new PlatformService();
