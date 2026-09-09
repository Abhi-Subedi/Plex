"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { AdminSidebar } from "./admin-sidebar";
import { cn } from "@/lib/utils";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ADMIN_PREFIX = "/dev/admin";
const LOGIN_PATH = "/dev/admin/login";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  // If there is no token, there is nothing to verify — skip the loading state.
  const [checking, setChecking] = useState(() => {
    if (typeof window === "undefined") return true;
    return !!localStorage.getItem("admin_token");
  });

  const verifyToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        localStorage.removeItem("admin_token");
        setAuthed(false);
      }
    } catch {
      localStorage.removeItem("admin_token");
      setAuthed(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      // Auth verification must run on mount; state settles after the async check.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      verifyToken(savedToken);
    }
  }, [verifyToken]);

  const isLoginPage = pathname === LOGIN_PATH;
  const isAdminRoute =
    pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);

  useEffect(() => {
    if (checking) return;
    if (!authed && isAdminRoute && !isLoginPage) {
      router.push(LOGIN_PATH);
    } else if (authed && isLoginPage) {
      router.push(ADMIN_PREFIX);
    }
  }, [checking, authed, isAdminRoute, isLoginPage, router]);

  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch {
        // ignore network errors on logout
      }
    }
    localStorage.removeItem("admin_token");
    setAuthed(false);
    router.push(LOGIN_PATH);
  }, [router]);

  if (checking) {
    return (
      <ConvexProvider client={convex}>
        <div className="flex min-h-screen items-center justify-center bg-zinc-950">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
        </div>
      </ConvexProvider>
    );
  }

  // While redirecting, render nothing to avoid flashing protected content.
  if (!authed && isAdminRoute && !isLoginPage) return null;
  if (authed && isLoginPage) return null;

  const showChrome = authed && !isLoginPage;

  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {showChrome && <AdminSidebar onLogout={handleLogout} />}
        <main
          className={cn("transition-all duration-200", showChrome && "lg:pl-64")}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </main>
      </div>
    </ConvexProvider>
  );
}
