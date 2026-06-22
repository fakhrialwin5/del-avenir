"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  role: string;
  guests: number;
}

interface UseRegistrationReturn {
  submit: (data: RegistrationData) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
}

export function useRegistration(): UseRegistrationReturn {
  const [loading, setLoading] = useState(false);

  async function submit(data: RegistrationData) {
    setLoading(true);
    const supabase = createBrowserClient();

    const { error } = await (supabase as any)
      .from("registrations")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        guests: data.guests,
        status: "pending",
      });

    setLoading(false);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  return { submit, loading };
}
