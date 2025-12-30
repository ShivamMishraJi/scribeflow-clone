"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [storedProjects, setStoredProjects] = useState(0);
  const [subscription, setSubscription] = useState("Free Tier");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in");
        return;
      }
      setUser(session.user);
      
      // TODO: Fetch actual project count from database
      setStoredProjects(0);
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

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* User Profile Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-xl font-semibold text-white dark:bg-gray-700">
                  {getUserInitials()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {getUserName()}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                  
                  {/* Account Metrics */}
                  <div className="mt-6 flex gap-8">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Stored Projects
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {storedProjects}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Subscription
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {subscription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Management Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Membership Management
                </h3>
                <Link href="/pricing">
                  <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                    <Sparkles className="mr-2 h-4 w-4" />
                    GO PRO
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cloud synchronization status: <span className="font-medium text-green-600 dark:text-green-500">Active</span>
                </p>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Last Sync
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Project database current
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Just Now
                </p>
              </div>

              <div className="mt-6">
                <Link 
                  href="/app"
                  className="text-sm font-medium uppercase tracking-wide text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Address
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      ••••••••••••
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

