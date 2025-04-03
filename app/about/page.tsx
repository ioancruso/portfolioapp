import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StepperControls } from "@/components/stepper";

const sections = ["education", "experience", "skills", "hobbies"];

export const metadata = {
	title: "About",
};

export default function Page() {
	return (
		<div className="bg-primary text-text h-full relative">
			<AnimatedSection className="relative h-[94vh] flex items-center justify-center">
				<div className="h-full flex flex-col justify-center items-center px-4">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-center text-highlight">
						About Me
					</h1>
					<p className="text-xs sm:text-sm text-muted text-center max-w-prose mt-2">
						Explore my journey, including my education, professional
						experiences, technical skills, and hobbies. Select a
						section below or just scroll:
					</p>
					<Separator className="w-full max-w-xs mx-auto my-6 opacity-50" />
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
						{sections.map((sectionItem, index) => (
							<Button
								key={index}
								variant="outline"
								size="sm"
								asChild
							>
								<Link
									href={`/about/${sectionItem}`}
									prefetch={true}
								>
									{sectionItem.charAt(0).toUpperCase() +
										sectionItem.slice(1)}
								</Link>
							</Button>
						))}
					</div>
				</div>
			</AnimatedSection>
			<StepperControls currentSection="about" />
		</div>
	);
}
