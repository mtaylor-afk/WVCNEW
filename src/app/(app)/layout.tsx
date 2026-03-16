"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FolderOpen, Camera, Settings } from "lucide-react";
import { WVCLogo } from "@/components/ui/WVCLogo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "New Quote",
    href: "/quotes/new",
    icon: FileText,
    match: "/quotes/new",
  },
  {
    label: "Saved",
    href: "/quotes/saved",
    icon: FolderOpen,
    match: "/quotes/saved",
  },
  {
    label: "Visualiser",
    href: "/visualiser",
    icon: Camera,
    match: "/visualiser",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    match: "/settings",
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/quotes/new": "New Quote",
  "/quotes/saved": "Saved Quotes",
  "/visualiser": "Room Visualiser",
  "/settings": "Settings",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const pageTitle = PAGE_TITLES[pathname] || "WV Construction";

  return (
    <div className="flex flex-col h-full bg-navy page-container">
      {/* Top Header */}
      <header className="flex-none bg-navy border-b border-gold/20 px-4 pt-[max(env(safe-area-inset-top),12px)]">
        <div className="flex items-center justify-between h-14">
          <WVCLogo size={36} />
          <div className="text-center">
            <h1 className="font-cormorant font-semibold text-cream text-lg leading-none">
              {pageTitle}
            </h1>
            <p className="font-mono text-gold/60 text-[10px] mt-0.5 tracking-wider">
              WV CONSTRUCTION
            </p>
          </div>
          <div className="w-9" /> {/* spacer */}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-none bg-navy border-t border-gold/20 bottom-nav">
        <div className="flex items-stretch">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.match || pathname.startsWith(item.match + "/");
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-2 gap-1 touch-target transition-colors relative",
                  isActive ? "text-gold" : "text-cream/40"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={cn("transition-all", isActive && "scale-110")}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span
                  className={cn(
                    "font-syne text-[10px] leading-none transition-all",
                    isActive ? "font-semibold" : "font-normal"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
