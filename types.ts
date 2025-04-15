export type theme = "light" | "dark";

export interface Education {
	degree: string;
	institution: string;
	date: string;
}

export interface Experience {
	title: string;
	company: string;
	date: string;
	description: string[];
	location: string;
}

export interface Skill {
	name: string;
	icon: string;
}

export interface Skills {
	technical: Skill[];
	soft: Skill[];
}

export interface Hobby {
	name: string;
	icon: string;
}

export interface AboutData {
	education: Education[];
	experiences: Experience[];
	skills: Skills;
	hobbies: Hobby[];
}
