"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminContentManager } from "@/components/admin/admin-content-manager";

export default function AdminDocsPage() {
  return (
    <AdminLayout>
      <AdminContentManager contentKey="docs" />
    </AdminLayout>
  );
}
