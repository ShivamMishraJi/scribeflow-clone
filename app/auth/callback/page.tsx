"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Check for error in query params
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        router.push(`/sign-in?error=${encodeURIComponent(errorDescription || error)}`);
        return;
      }

      // Check for code in query params
      let code = searchParams.get("code");
      
      // If no code in query params, check hash fragment (for PKCE flow)
      if (!code && typeof window !== "undefined") {
        const hash = window.location.hash.substring(1);
        if (hash) {
          const hashParams = new URLSearchParams(hash);
          code = hashParams.get("code");
          const hashError = hashParams.get("error");
          if (hashError) {
            router.push(`/sign-in?error=${encodeURIComponent(hashError)}`);
            return;
          }
        }
      }
      
      if (code) {
        try {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            router.push(`/sign-in?error=${encodeURIComponent(exchangeError.message)}`);
          } else {
            router.push("/app");
          }
        } catch (err) {
          router.push(`/sign-in?error=${encodeURIComponent("Failed to complete authentication")}`);
        }
      } else {
        // Listen for auth state changes - Supabase might auto-handle the session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN" && session) {
            router.push("/app");
            subscription.unsubscribe();
          }
        });

        // Also check if session already exists
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          subscription.unsubscribe();
          router.push("/app");
          return;
        }

        // Timeout after 3 seconds if no session
        setTimeout(async () => {
          subscription.unsubscribe();
          const { data: { session: finalSession } } = await supabase.auth.getSession();
          if (finalSession) {
            router.push("/app");
          } else {
            router.push("/sign-in?error=authentication_failed");
          }
        }, 3000);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}

