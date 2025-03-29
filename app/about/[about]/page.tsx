import React from "react";
import { redirect } from "next/navigation";
import data from "@/data/data.json";
import { Separator } from "@/components/ui/separator";
import { getIcon } from "@/hooks/getIcon";
import { StepperControls } from "@/components/stepper";
import { AnimatedSection } from "@/components/AnimatedSection";

export async function generateMetadata({
	params,
}: {
	params: { about?: string };
}) {
	const validSections = ["education", "experience", "skills", "hobbies"];
	const section = params.about;

	if (!section || !validSections.includes(section)) {
		return {
			title: "Home",
		};
	}
	return {
		title: section.charAt(0).toUpperCase() + section.slice(1),
	};
}

export default async function Home({ params }: { params: { about?: string } }) {
	const validSections = ["education", "experience", "skills", "hobbies"];
	const section = params.about;

	if (!section || !validSections.includes(section)) {
		redirect("/about");
	}

	let content = null;
	switch (section) {
		case "education":
			content = (
				<AnimatedSection className="h-min w-full flex flex-col justify-center items-center px-4">
					<div className="text-center">
						<h2 className="text-2xl sm:text-3xl font-bold text-highlight mb-4">
							Education
						</h2>
						<Separator className="w-full max-w-xs mx-auto mb-6 opacity-50" />
					</div>
					<div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
						{data.about.education.map((edu, index) => (
							<div
								key={index}
								className="p-4 sm:p-6 rounded-lg bg-secondary text-text shadow border-l-4 border-accent w-full sm:w-3/4 lg:w-1/2"
							>
								<h3 className="text-lg sm:text-xl font-semibold text-highlight mb-1">
									{edu.degree}
								</h3>
								<p className="text-xs sm:text-sm text-muted mb-1 italic">
									{edu.institution}
								</p>
								<p className="text-xs sm:text-sm text-muted">
									{edu.date}
								</p>
							</div>
						))}
					</div>
				</AnimatedSection>
			);
			break;

		case "experience":
			content = (
				<AnimatedSection className="h-full flex flex-col justify-center items-center px-2 sm:px-4">
					<div className="text-center">
						<h2 className="text-xl sm:text-3xl font-bold text-highlight mb-3 sm:mb-4">
							Experience
						</h2>
						<Separator className="w-full max-w-[200px] sm:max-w-xs mx-auto mb-4 opacity-50" />
					</div>
					<div className="space-y-3 sm:space-y-4 w-full flex flex-col items-center">
						{data.about.experiences.map((exp, index) => (
							<div
								key={index}
								className="p-3 sm:p-4 rounded-lg bg-secondary text-secondary-foreground shadow border-l-4 border-accent w-full sm:w-[90%] lg:w-2/3"
							>
								<p className="text-xs text-muted">{exp.date}</p>
								<h3 className="text-base sm:text-lg font-semibold text-highlight">
									{exp.title}
								</h3>
								<p className="text-xs text-muted italic">
									{exp.company}
								</p>
								<ul className="mt-1 text-xs sm:text-sm text-text list-disc list-inside">
									{exp.description.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</AnimatedSection>
			);
			break;

		case "skills":
			content = (
				<AnimatedSection className="h-full flex flex-col justify-center items-center px-4">
					<div className="space-y-6">
						<div>
							<h3 className="text-lg sm:text-xl font-semibold text-highlight mb-3 text-center mt-8">
								Technical Skills
							</h3>
							<div className="flex flex-wrap gap-1 justify-center w-full max-w-[600px]">
								{data.about.skills.technical.map(
									(skill, index) => {
										const Icon = getIcon(skill.icon);
										return (
											<div
												key={index}
												className="flex items-center space-x-1 p-1.5 bg-accent text-white rounded-md shadow hover:bg-accent-hover transition"
											>
												{Icon && (
													<Icon
														className="w-4 h-4 sm:w-4 sm:h-4"
														aria-label={skill.name}
													/>
												)}
												<span className="font-semibold text-[0.75rem]">
													{skill.name}
												</span>
											</div>
										);
									},
								)}
							</div>
						</div>
						<div>
							<h3 className="text-lg sm:text-xl font-semibold text-highlight mb-3 text-center mt-10">
								Soft Skills
							</h3>
							<div className="flex flex-wrap gap-1 justify-center w-full max-w-[600px]">
								{data.about.skills.soft.map((skill, index) => {
									const Icon = getIcon(skill.icon);
									return (
										<div
											key={index}
											className="flex items-center space-x-1 p-1.5 bg-accent text-white rounded-md shadow hover:bg-accent-hover transition"
										>
											{Icon && (
												<Icon
													className="w-4 h-4 sm:w-4 sm:h-4"
													aria-label={skill.name}
												/>
											)}
											<span className="font-semibold text-[0.75rem]">
												{skill.name}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</AnimatedSection>
			);
			break;

		case "hobbies":
			content = (
				<AnimatedSection className="h-full flex flex-col justify-center items-center px-4">
					<div className="text-center">
						<h2 className="text-2xl sm:text-3xl font-bold text-highlight mb-4">
							Hobbies
						</h2>
						<Separator className="w-full max-w-xs mx-auto mb-6 opacity-50" />
					</div>
					<ul className="flex flex-wrap gap-2 sm:gap-4 justify-center">
						{data.about.hobbies.map((hobby, index) => {
							const Icon = getIcon(hobby.icon);
							return (
								<li
									key={index}
									className="flex items-center space-x-1.5 p-2 rounded-lg bg-third text-third-foreground font-semibold shadow"
								>
									{Icon && (
										<Icon
											className="w-5 h-5"
											aria-label={hobby.name}
										/>
									)}
									<span className="text-xs">
										{hobby.name}
									</span>
								</li>
							);
						})}
					</ul>
				</AnimatedSection>
			);
			break;
	}

	return (
		<div className="bg-primary text-text h-full relative">
			<div className="relative h-[94vh] flex items-center justify-center">
				{content}
			</div>
			<StepperControls currentSection={section} />
		</div>
	);
}
