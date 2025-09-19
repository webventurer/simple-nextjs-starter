import { type ClassValue, clsx } from "clsx";

/**
 * Utility for combining CSS classes conditionally
 * Useful for CSS Modules with conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Utility for creating conditional CSS Module class combinations
 */
export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}
