"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminContentManager } from "@/components/admin/admin-content-manager";

export default function AdminChangelogPage() {
  return (
    <AdminLayout>
      <AdminContentManager contentKey="changelog" />
    </AdminLayout>
  );
}
