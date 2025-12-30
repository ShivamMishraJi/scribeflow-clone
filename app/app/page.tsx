"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Upload, FileVideo, Loader2 } from "lucide-react";

export default function AppPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in");
        return;
      }
      setUser(session.user);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/sign-in");
      } else {
        setUser(session.user);
      }
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
  }, [router]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // TODO: Implement video upload and Gemini API integration
    console.log("File selected:", file.name);
    
    // Placeholder for now
    setTimeout(() => {
      setIsUploading(false);
      alert("Video upload functionality will be implemented here with Gemini API");
    }, 1000);
  };


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
                Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Upload your video to generate accurate subtitles using AI.
              </p>
            </div>

            {/* Upload Section */}
            <div className="rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-12">
              <div className="text-center">
                <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90">
                      <Upload className="h-4 w-4" />
                      {isUploading ? "Uploading..." : "Upload Video"}
                    </span>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*,.mp4,.mov,.avi,.mkv,.webm"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Support for MP4, MOV, AVI, MKV, WebM and more
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Or paste a YouTube URL (coming soon)
                </p>
              </div>
            </div>

            {/* Placeholder for video list/transcripts */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">Your Transcripts</h2>
              <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No transcripts yet. Upload your first video to get started.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

