"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";

type GalleryPhoto = Database["public"]["Tables"]["gallery_photos"]["Row"];

interface UseGalleryOptions {
  eventName?: string;
  limit?: number;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    async function fetchPhotos() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("gallery_photos")
        .select("*")
        .order("sort_order", { ascending: true });

      if (options.eventName) {
        query = query.eq("event_name", options.eventName);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setPhotos(data || []);
      }
      setLoading(false);
    }

    fetchPhotos();
  }, [options.eventName, options.limit]);

  return { photos, loading, error };
}
