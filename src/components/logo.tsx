import { cn } from "@/lib/utils";

/**
 * Theme-aware Plex wordmark.
 * Light theme → plex.png (dark-navy text), dark theme → plex-alt.png
 * (white text on dark pill). Follows the next-themes `dark` class,
 * which tracks the OS setting (no manual toggle).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <>
      <img
        src="/plex.png"
        alt="Plex"
        className={cn("w-auto object-contain dark:hidden", className)}
      />
      <img
        src="/plex-alt.png"
        alt=""
        aria-hidden
        className={cn("hidden w-auto object-contain dark:block", className)}
      />
    </>
  );
}
