"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export function HeroCTAs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    // Listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('sb-')) {
        checkAuth();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkAuth);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10">
        <div className="h-12 w-48 animate-pulse rounded-md bg-gray-200 mx-auto" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="mt-10">
        <Link href="/app">
          <button className="group relative mx-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border-2 bg-white px-8 py-4 text-base font-medium text-black transition-all hover:bg-gray-50">
            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <span className="absolute inset-[2px] rounded-md bg-white" />
            <span className="relative z-10">Go to App</span>
          </button>
        </Link>
      </div>
    );
  }

  return null;
}

