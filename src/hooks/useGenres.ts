import { useState, useEffect } from "react";
import apiClient, { CanceledError } from "../services/api-client";

type Genre = {
  id: string;
  name: string;
  slug: string;
  image_background: string;
};

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  // error

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/genres", { signal: controller.signal })
      .then(({ data: { results } }) => {
        setGenres(results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching Genre", err);
      });

    return () => controller.abort();
  }, []);

  return { genres };
};

export default useGenres;
