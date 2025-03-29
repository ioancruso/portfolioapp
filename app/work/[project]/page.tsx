import { redirect } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/hooks/getIcon";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import data from "@/data/data.json";
import { AnimatedSection } from "@/components/AnimatedSection";

export async function generateMetadata({
	params,
}: {
	params: { project?: string };
}) {
	const projectKey = params.project;
	if (!projectKey) {
		return {
			title: "Home",
		};
	}

	const project = data.publicWork.projects.find(
		(proj) => proj.key === projectKey,
	);
	if (!project) {
		return {
			title: "Home",
		};
	}

	return {
		title: projectKey.charAt(0).toUpperCase() + projectKey.slice(1),
	};
}

export default async function Home({
	params,
}: {
	params: { project?: string };
}) {
	const projectKey = params.project;
	if (!projectKey) {
		redirect("/work");
	}

	const project = data.publicWork.projects.find(
		(proj) => proj.key === projectKey,
	);
	if (!project) {
		return <div>Project not found</div>;
	}

	return (
		<AnimatedSection className="mt-4 p-10">
			<div className="mb-4 text-center">
				<h2 className="text-2xl sm:text-3xl font-bold">
					{project.title}
				</h2>
				<Separator className="w-full max-w-xs mx-auto opacity-50" />
				<div className="flex justify-center mt-4 space-x-4">
					{project.link && (
						<Button
							asChild
							variant="outline"
							className="flex items-center"
						>
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{(() => {
									const Icon = getIcon("FiExternalLink");
									return Icon ? <Icon /> : null;
								})()}
								<span>Visit</span>
							</a>
						</Button>
					)}
					{project.github && (
						<Button
							asChild
							variant="outline"
							className="flex items-center"
						>
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
							>
								{(() => {
									const Icon = getIcon("FiGithub");
									return Icon ? <Icon /> : null;
								})()}
								<span>Repository</span>
							</a>
						</Button>
					)}
				</div>
			</div>
			<div className="max-w-prose mx-auto mb-6 mt-12">
				<ul className="space-y-4">
					{project.description.map((item, index) => (
						<li
							key={index}
							className="flex items-start gap-3 bg-accent text-white hover:bg-accent-hover p-2 rounded-lg shadow-md"
						>
							<div className="flex-shrink-0 mt-1">
								{(() => {
									const Icon = getIcon("FiArrowRight");
									return Icon ? <Icon /> : null;
								})()}
							</div>
							<p className="text-xs sm:text-sm leading-relaxed">
								{item}
							</p>
						</li>
					))}
				</ul>
			</div>
			{project.technologies && project.technologies.stack && (
				<div className="max-w-prose mx-auto mb-6 text-center mt-8">
					<h3 className="text-xl sm:text-2xl font-bold mb-4">
						Technologies Used
					</h3>
					<div className="flex flex-wrap gap-4 justify-center">
						{project.technologies.stack.map(
							(tech: string, index: number) => {
								const Icon = getIcon(
									project.technologies.icons[index],
								);
								return (
									<div
										key={index}
										className="flex items-center space-x-2 p-2 bg-third text-third-foreground rounded-md shadow"
									>
										{Icon && <Icon />}
										<span className="font-semibold text-[0.75rem]">
											{tech}
										</span>
									</div>
								);
							},
						)}
					</div>
				</div>
			)}
			<Carousel className="w-full max-w-3xl mx-auto">
				<CarouselContent>
					{project.images?.map((image, index) => (
						<CarouselItem key={index}>
							<div className="p-4 relative w-full h-0 pb-[56.25%]">
								<Image
									src={image}
									alt={`Project ${project.title} Slide ${index + 1}`}
									className="rounded-lg shadow-md object-cover"
									fill
									priority={index === 0}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute top-1/2 m-3 lg:m-2 p-2 rounded-full shadow-lg hidden sm:block transform -translate-y-1/2 bg-third" />
				<CarouselNext className="absolute top-1/2 m-3 lg:m-2 p-2 rounded-full shadow-lg hidden sm:block transform -translate-y-1/2 bg-third" />
			</Carousel>
		</AnimatedSection>
	);
}
