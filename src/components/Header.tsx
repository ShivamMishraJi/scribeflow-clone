"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
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
      // Supabase stores auth in localStorage, check for any storage changes
      if (e.key && e.key.startsWith('sb-')) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for focus and visibility change to check auth when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkAuth);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
            Pricing
          </Link>
          {isLoading ? (
            <div className="h-9 w-20 animate-pulse rounded bg-gray-200" />
          ) : isAuthenticated ? (
            <>
              <Link href="/app">
                <Button variant="outline">App</Button>
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
                Sign in
              </Link>
              <Link href="/sign-up">
                <Button>Get started</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

