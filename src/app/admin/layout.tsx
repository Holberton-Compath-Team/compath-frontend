import { AdminGuard } from "@/components/auth/admin-guard";
import { AdminHeader } from "@/components/layout/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="bg-background flex-1">{children}</main>
      </div>
    </AdminGuard>
  );
}
