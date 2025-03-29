import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/AnimatedSection";

import data from "@/data/data.json";

export const metadata = {
	title: "Work",
};

export default function WorkIntro() {
	const projects = data.publicWork.projects;

	return (
		<AnimatedSection className="h-full flex flex-col justify-center items-center px-4">
			<h1 className="text-3xl sm:text-4xl font-extrabold text-center">
				My Public Work
			</h1>
			<p className="text-xs sm:text-sm text-text-muted text-center max-w-prose mt-2">
				Explore my projects below. Select a project to view more
				details:
			</p>
			<Separator className="w-full max-w-xs mx-auto my-6 opacity-50" />
			<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
				{projects.map((project) => (
					<Button key={project.key} variant="outline" asChild>
						<Link
							href={`/work/${encodeURIComponent(project.key)}`}
							prefetch={true}
						>
							{project.title}
						</Link>
					</Button>
				))}
			</div>
		</AnimatedSection>
	);
}
