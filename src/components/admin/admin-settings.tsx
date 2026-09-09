"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { User, Key, Shield, Plus, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type AdminRole = "super_admin" | "admin" | "editor";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [newAdminDialog, setNewAdminDialog] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "", email: "", role: "editor" as AdminRole });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const admins = useQuery(api.cms.listAdminUsers);
  const createAdmin = useMutation(api.cms.createAdminUser);
  const deleteAdmin = useMutation(api.cms.deleteAdminUser);

  const handleCreateAdmin = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Username and password required");
      return;
    }
    setLoading(true);
    try {
      await createAdmin({
        username: formData.username,
        password: formData.password,
        email: formData.email || undefined,
        role: formData.role,
      });
      toast.success("Admin user created");
      setNewAdminDialog(false);
      setFormData({ username: "", password: "", email: "", role: "editor" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to change password");

      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin user?")) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deleteAdmin({ id: id as any });
      toast.success("Admin user deleted");
    } catch {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="max-w-4xl p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-zinc-400">Manage admin users and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="border border-zinc-800 bg-zinc-900/50">
          <TabsTrigger value="profile" className="data-[state=active]:bg-zinc-800">
            <User className="mr-2 size-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-zinc-800">
            <Shield className="mr-2 size-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="admins" className="data-[state=active]:bg-zinc-800">
            <Shield className="mr-2 size-4" /> Admin Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" /> Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value="plex-admin" disabled className="bg-zinc-800" />
                  <p className="text-xs text-zinc-500">Signed in as plex-admin</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="admin@plex.dev" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value="super_admin" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="size-5" /> Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <Button onClick={handleChangePassword} disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5" /> Session Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-400">
                Forgot password on this device? Use the reset keyword “prabhat” from the login
                screen to generate a reset token.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("admin_token");
                  window.location.href = "/dev/admin/login";
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5" /> Admin Users
              </CardTitle>
              <Dialog open={newAdminDialog} onOpenChange={setNewAdminDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 size-4" />
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-zinc-800 bg-zinc-900">
                  <DialogHeader>
                    <DialogTitle>Create Admin User</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateAdmin();
                    }}
                    className="space-y-4 p-1"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="newUsername">Username</Label>
                      <Input
                        id="newUsername"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Email (optional)</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newAdminPassword">Password</Label>
                      <Input
                        id="newAdminPassword"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newRole">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(v) => setFormData({ ...formData, role: v as AdminRole })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super_admin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setNewAdminDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Create Admin
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {admins === undefined && (
                  <p className="py-4 text-center text-sm text-zinc-500">Loading admins…</p>
                )}
                {admins?.map((admin) => (
                  <div
                    key={admin._id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-purple-500/20 p-2">
                        <Shield className="size-5 text-purple-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{admin.username}</p>
                        <p className="truncate text-sm text-zinc-500">
                          {admin.role}
                          {admin.lastLoginAt
                            ? ` • Last login: ${new Date(admin.lastLoginAt).toLocaleDateString()}`
                            : " • Never logged in"}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        {admin.role}
                      </Badge>
                      {admin.username !== "plex-admin" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${admin.username}`}
                          onClick={() => handleDeleteAdmin(admin._id)}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {admins?.length === 0 && (
                  <p className="py-4 text-center text-sm text-zinc-500">No admin users found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
