"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminLogin } from "@/components/admin/admin-login";

export default function AdminLoginPage() {
  return (
    <AdminLayout>
      <AdminLogin />
    </AdminLayout>
  );
}