"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const result = window.matchMedia(query);

    const update = () => setValue(result.matches);

    update();

    result.addEventListener("change", update);

    return () => result.removeEventListener("change", update);
  }, [query]);

  return value;
}
