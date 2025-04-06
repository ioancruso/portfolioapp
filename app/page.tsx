import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/AnimatedSection";

import data from "@/data/data.json";

export default function HomePage() {
	const { title, description, buttons, secondaryButtons } = data.home;

	return (
		<AnimatedSection className="flex flex-col items-center bg-primary text-text px-4 py-10">
			<h1 className="text-3xl font-extrabold mb-4 text-highlight text-center tracking-wide">
				{title}
			</h1>

			<p className="text-base font-light text-muted text-center max-w-prose leading-relaxed mx-auto mb-8 mt-3">
				{description}
			</p>

			<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
				{secondaryButtons.map((button, index) => (
					<React.Fragment key={index}>
						<Button
							variant={
								(button.variant as
									| "outline"
									| "default"
									| "destructive"
									| "link"
									| "secondary"
									| "ghost") || "outline"
							}
						>
							<a
								href={button.link}
								target="_blank"
								rel={button.label}
								className="inline-block"
							>
								{button.label}
							</a>
						</Button>

						{index < secondaryButtons.length - 1 && (
							<>
								<Separator
									orientation="horizontal"
									className="block sm:hidden w-6 h-[1px] bg-gray-300"
								/>
								<Separator
									orientation="vertical"
									className="hidden sm:block w-[1px] h-6 bg-gray-300"
								/>
							</>
						)}
					</React.Fragment>
				))}
			</div>

			<Separator
				orientation="horizontal"
				className="block max-w-[60%] sm:w-[300px] h-[1px] bg-gray-300 m-7 mx-auto"
			/>

			<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
				{buttons.map((button, index) => (
					<React.Fragment key={index}>
						<Button
							variant={
								(button.variant as
									| "outline"
									| "default"
									| "destructive"
									| "link"
									| "secondary"
									| "ghost") || "default"
							}
						>
							<Link href={button.link}>{button.label}</Link>
						</Button>
						{index < buttons.length - 1 && (
							<>
								<Separator
									orientation="horizontal"
									className="block sm:hidden w-6 h-[1px] bg-gray-300"
								/>
								<Separator
									orientation="vertical"
									className="hidden sm:block w-[1px] h-6 bg-gray-300"
								/>
							</>
						)}
					</React.Fragment>
				))}
			</div>
		</AnimatedSection>
	);
}
