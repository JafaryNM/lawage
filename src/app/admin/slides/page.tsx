import { SlidesManager } from "./SlidesManager";

// Data comes from GET /api/admin/slides via TanStack Query; the admin layout checks the session
export default function SlidesPage() {
  return <SlidesManager />;
}
