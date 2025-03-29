import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names together while handling conditional logic and deduplication.
 * This combines `clsx` and `tailwind-merge`.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
	return twMerge(clsx(...inputs));
}
