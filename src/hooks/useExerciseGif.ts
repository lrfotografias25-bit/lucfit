import { useState, useEffect } from "react";

interface GifResult {
  url: string | null;
  loading: boolean;
}

// Cache so repeated renders don't re-fetch
const cache: Record<string, string | null> = {};
const inFlight: Record<string, Promise<string | null>> = {};

async function fetchWgerGif(term: string): Promise<string | null> {
  if (term in cache) return cache[term];
  if (term in inFlight) return inFlight[term];

  const promise = (async () => {
    try {
      const searchRes = await fetch(
        `https://wger.de/api/v2/exercise/search/?term=${encodeURIComponent(term)}&language=en&format=json`,
        { signal: AbortSignal.timeout(6000) }
      );
      const searchData = await searchRes.json();
      const baseId = searchData.suggestions?.[0]?.data?.base_id;
      if (!baseId) return null;

      const imgRes = await fetch(
        `https://wger.de/api/v2/exerciseimage/?format=json&exercise_base=${baseId}&is_main=True`,
        { signal: AbortSignal.timeout(6000) }
      );
      const imgData = await imgRes.json();
      const url: string | null = imgData.results?.[0]?.image ?? null;
      cache[term] = url;
      return url;
    } catch {
      cache[term] = null;
      return null;
    } finally {
      delete inFlight[term];
    }
  })();

  inFlight[term] = promise;
  return promise;
}

export function useExerciseGif(term: string): GifResult {
  const [url, setUrl] = useState<string | null>(cache[term] ?? null);
  const [loading, setLoading] = useState(!(term in cache));

  useEffect(() => {
    if (!term) return;
    if (term in cache) {
      setUrl(cache[term]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchWgerGif(term).then((result) => {
      if (!cancelled) {
        setUrl(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [term]);

  return { url, loading };
}
