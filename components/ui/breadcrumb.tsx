"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav">
>(({ className, ...props }, ref) => (
	<nav
		ref={ref}
		aria-label="breadcrumb"
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
	<ol
		ref={ref}
		className={cn("flex items-center space-x-1", className)}
		{...props}
	/>
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		className={cn("inline-flex items-center", className)}
		{...props}
	/>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, href, ...props }, ref) => (
	<Link href={href} prefetch={true} legacyBehavior>
		<a
			ref={ref}
			className={cn(
				"text-muted-foreground hover:text-foreground transition-colors",
				className,
			)}
			{...props}
		/>
	</Link>
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cn("font-semibold text-foreground", className)}
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		aria-hidden="true"
		className={cn("flex-shrink-0 text-muted-foreground", className)}
		{...props}
	>
		<ChevronRight className="h-4 w-4" />
	</li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export function BreadcrumbTrail() {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Home</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	const pathParts = pathname
		.split("/")
		.filter((part) => part)
		.map((part, index, arr) => ({
			name: part.charAt(0).toUpperCase() + part.slice(1),
			href: `/${arr.slice(0, index + 1).join("/")}`,
		}));

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{pathParts.map((part, index) => (
					<React.Fragment key={part.href}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{index === pathParts.length - 1 ? (
								<BreadcrumbPage>{part.name}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={part.href}>
									{part.name}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
