import { useEffect, useState } from "react";
import platformService from "../services/platform-service";
import { AxiosError, CanceledError } from "axios";
import { Platform } from "../types/apiTypes";

const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]); // NB: parent_platforms (not platforms)

  useEffect(() => {
    const { request, cancel } = platformService.getAllPlatforms();
    request
      .then((res: any) => {
        setPlatforms(res.data.results);
        // setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching platforms", err);
        // setIsLoading(false);
      });

    return () => {
      cancel();
    };
  }, []);

  return { platforms };
};

export default usePlatforms;
