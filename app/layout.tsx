import { ReactNode, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbTrail } from "@/components/ui/breadcrumb";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { theme } from "@/types";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | Crușoveanu Ioan",
		default: "Home | Crușoveanu Ioan",
	},
	description:
		"The official portfolio of Ioan Crușoveanu, showcasing me and my work.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	const cookieStore = cookies();
	const themeFromCookie =
		(cookieStore.get("theme")?.value as theme) || ("dark" as theme);

	return (
		<html suppressHydrationWarning lang="en">
			<body className="flex h-screen">
				<Suspense>
					<ThemeProvider
						defaultTheme={themeFromCookie}
						disableTransitionOnChange={true}
					>
						<SidebarProvider>
							<AppSidebar theme={themeFromCookie} />
							<Suspense
								fallback={<div>Loading Breadcrumbs...</div>}
							>
								<SidebarInset>
									<header className="flex h-[6vh] shrink-0 items-center gap-2 border-b">
										<div className="flex items-center gap-2 px-3">
											<SidebarTrigger />
											<Separator
												orientation="vertical"
												className="mr-2 h-4 w-[1px] bg-gray-300"
											/>
											<BreadcrumbTrail />
										</div>
									</header>

									<main className="flex flex-1 flex-col justify-center ">
										{children}
									</main>
								</SidebarInset>
							</Suspense>
						</SidebarProvider>
					</ThemeProvider>
					<Analytics />
				</Suspense>
			</body>
		</html>
	);
}
