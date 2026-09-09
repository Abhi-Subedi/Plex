"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminContentManager } from "@/components/admin/admin-content-manager";

export default function AdminStatusPage() {
  return (
    <AdminLayout>
      <AdminContentManager contentKey="status" />
    </AdminLayout>
  );
}
