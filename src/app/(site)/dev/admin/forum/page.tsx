"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminContentManager } from "@/components/admin/admin-content-manager";

export default function AdminForumPage() {
  return (
    <AdminLayout>
      <AdminContentManager contentKey="forum" />
    </AdminLayout>
  );
}
