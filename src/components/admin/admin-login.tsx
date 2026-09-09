"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetKeyword, setResetKeyword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("admin_token", data.token);
      toast.success("Welcome back!");
      router.push("/dev/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: resetUsername, keyword: resetKeyword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reset request failed");
      }

      setResetToken(data.token);
      setShowReset(false);
      toast.success("Reset token generated. Use it below to set new password.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset request failed");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      toast.success("Password reset successful. Please login with new password.");
      setResetToken("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
            <Lock className="size-6 text-zinc-100" />
          </div>
          <CardTitle className="text-xl">Admin Sign In</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resetToken ? (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-900/30 border border-emerald-800 rounded-lg text-sm text-emerald-300">
                <strong>Reset Token:</strong>{" "}
                <code className="break-all">{resetToken}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(resetToken)}
                  className="ml-2 text-xs underline hover:text-emerald-400"
                >
                  Copy
                </button>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
                    <AlertCircle className="size-4" />
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="size-4 animate-spin" /> : "Reset Password"}
                </Button>
              </form>
              <Button variant="ghost" onClick={() => setResetToken("")} className="w-full">
                Back to login
              </Button>
            </div>
          ) : showReset ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetUsername">Username</Label>
                <Input
                  id="resetUsername"
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resetKeyword">Reset Keyword</Label>
                <Input
                  id="resetKeyword"
                  type="password"
                  value={resetKeyword}
                  onChange={(e) => setResetKeyword(e.target.value)}
                  placeholder="Enter reset keyword"
                  autoComplete="off"
                />
                <p className="text-xs text-zinc-500">Keyword: &quot;prabhat&quot;</p>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
                  <AlertCircle className="size-4" />
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={resetLoading}>
                {resetLoading ? <Loader2 className="size-4 animate-spin" /> : "Generate Reset Token"}
              </Button>
              <Button variant="ghost" onClick={() => setShowReset(false)} className="w-full">
                Back to login
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReset(true)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 p-0 h-auto"
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
                  <AlertCircle className="size-4" />
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Sign In"}
              </Button>
              <p className="text-xs text-center text-zinc-500">
                Default: <code className="bg-zinc-800 px-1 rounded">plex-admin</code> / <code className="bg-zinc-800 px-1 rounded">974232573320660512@@BHi.PLEX</code>
              </p>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-zinc-500">
          <span>Plex Admin Panel</span>
        </CardFooter>
      </Card>
    </div>
  );
}