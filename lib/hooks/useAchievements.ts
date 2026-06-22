"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";

type Achievement = Database["public"]["Tables"]["achievements"]["Row"];

interface UseAchievementsOptions {
  category?: string;
  search?: string;
  limit?: number;
  year?: number;
}

export function useAchievements(options: UseAchievementsOptions = {}) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    async function fetchAchievements() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("achievements")
        .select("*")
        .order("year", { ascending: false })
        .order("ranking", { ascending: true });

      if (options.category && options.category !== "all") {
        query = query.eq("category", options.category);
      }

      if (options.year) {
        query = query.eq("year", options.year);
      }

      if (options.search) {
        query = query.or(
          `title.ilike.%${options.search}%,description.ilike.%${options.search}%`,
        );
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setAchievements(data || []);
      }
      setLoading(false);
    }

    fetchAchievements();
  }, [options.category, options.search, options.limit, options.year]);

  return { achievements, loading, error };
}
