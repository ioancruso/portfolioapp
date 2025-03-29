"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/themeswitcher/themeswitcher";

import data from "@/data/data.json";
import type { theme } from "@/types";

const navMain = [
	{ title: "Home", url: "/" },
	{ title: "About Me", url: "/about", items: data.sidebar.items },
	{ title: "Public Work", url: "/work", items: [] },
	{ title: "Connect", url: null, items: data.sidebar.connect },
];

export function AppSidebar({
	theme,
	...props
}: React.ComponentProps<typeof Sidebar> & { theme: theme }) {
	const currentPath = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();

	const publicWorkProjects = data.publicWork.projects.map((project) => ({
		title: project.title,
		url: `/work/${project.key}`,
	}));

	const updatedNavMain = navMain.map((item) => {
		if (item.title === "Public Work") {
			return { ...item, items: publicWorkProjects };
		}
		return item;
	});

	const handleMenuClick = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<span>
								<Avatar>
									<AvatarImage
										src="/me2.png"
										alt="Crușoveanu Ioan"
									/>
									<AvatarFallback>CI</AvatarFallback>
								</Avatar>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">
										Crușoveanu Ioan
									</span>
								</div>
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="flex-col justify-between">
				<SidebarGroup>
					<SidebarMenu>
						{updatedNavMain.map((item) => {
							const baseUrl = item.url || "";
							const hasSubItems =
								Array.isArray(item.items) &&
								item.items?.length > 0;
							const isMainActive =
								baseUrl && currentPath === baseUrl;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className={
											isMainActive ? "bg-secondary" : ""
										}
									>
										{item.url ? (
											<Link
												href={item.url}
												prefetch={true}
												className="font-bold"
												onClick={handleMenuClick}
											>
												{item.title}
											</Link>
										) : (
											<span className="font-bold">
												{item.title}
											</span>
										)}
									</SidebarMenuButton>
									{hasSubItems && (
										<SidebarMenuSub>
											{(item.items || []).map(
												(subItem) => {
													const isActive =
														subItem.url ===
														currentPath;
													return (
														<SidebarMenuSubItem
															key={subItem.title}
														>
															<SidebarMenuSubButton
																asChild
																className={
																	isActive
																		? "bg-secondary"
																		: ""
																}
															>
																<Link
																	href={
																		subItem.url
																	}
																	prefetch={
																		true
																	}
																	className="font-normal"
																	onClick={
																		handleMenuClick
																	}
																	target={
																		item.title ===
																		"Connect"
																			? "_blank"
																			: undefined
																	}
																	rel={
																		item.title ===
																		"Connect"
																			? "noopener noreferrer"
																			: undefined
																	}
																>
																	{
																		subItem.title
																	}
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													);
												},
											)}
										</SidebarMenuSub>
									)}
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<div className="ml-5 mb-5">
				<ModeToggle />
			</div>
		</Sidebar>
	);
}
