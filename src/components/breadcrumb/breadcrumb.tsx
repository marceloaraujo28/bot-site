"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment) => {
    const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      label,
    };
  });

  return (
    <nav className="text-sm text-gray-400 flex gap-1 flex-wrap">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="text-gray-200">{crumb.label}</span>
          {i < breadcrumbs.length - 1 && <span className="text-gray-500">{">"}</span>}
        </span>
      ))}
    </nav>
  );
}
