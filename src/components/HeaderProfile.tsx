"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Settings, LogOut, Sun, Moon, Monitor } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HeaderProfile() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  if (isLoading || !user) {
    return null;
  }

  const getUserInitials = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-100 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
          aria-label="User menu"
        >
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={getUserName()}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{getUserInitials()}</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <DropdownMenuLabel className="font-semibold text-gray-900 dark:text-white">
            {getUserName()}
          </DropdownMenuLabel>
          <p className="truncate px-2 text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50 dark:text-green-500 dark:focus:bg-green-950/20"
          onClick={() => router.push("/pricing")}
        >
          <Sparkles className="h-4 w-4" />
          <span>Upgrade to Pro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-gray-900 dark:text-white"
          onClick={() => router.push("/settings")}
        >
          <Settings className="h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <DropdownMenuLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Theme
          </DropdownMenuLabel>
        </div>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="cursor-pointer">
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-950/20"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

