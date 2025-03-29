import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["selector", '[data-theme="dark"]'],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary-color)",
				secondary: "var(--secondary-color)",
				third: "var(--third-color)",
				fourth: "var(--fourth-color)",
				text: {
					DEFAULT: "var(--text-color)",
					muted: "var(--text-muted)",
					highlight: "var(--text-highlight)",
				},
				clickable: {
					DEFAULT: "var(--clickable-color)",
					hover: "var(--clickable-hover-color)",
					disabled: "var(--clickable-disabled)",
				},
				button: {
					link: {
						DEFAULT: "var(--text-highlight)",
						hover: "var(--text-muted)",
						text: "var(--clickable-color)",
					},
					default: {
						DEFAULT: "var(--button-color)",
						hover: "var(--button-color-hover)",
						text: "var(--button-text-color)",
					},
					destructive: {
						DEFAULT: "var(--destructive-color)",
						hover: "var(--destructive-hover-color)",
						text: "var(--button-text-color)",
					},
					outline: {
						DEFAULT: "var(--primary-color)",
						hover: "var(--third-color)",
						text: "var(--text-color)",
					},
					secondary: {
						DEFAULT: "var(--third-color)",
						hover: "var(--fourth-color)",
						text: "var(--text-muted)",
					},
					ghost: {
						DEFAULT: "var(--primary-color)",
						hover: "var(--secondary-color)",
						text: "var(--text-muted)",
					},
				},
				scrollbar: {
					bg: "var(--scrollbar-bg)",
					thumb: "var(--scrollbar-thumb)",
				},
				boxShadow: "var(--box-shadow-color)",
				accent: {
					DEFAULT: "var(--accent-color)",
					hover: "var(--accent-hover-color)",
				},
				destructive: {
					DEFAULT: "var(--destructive-color)",
					hover: "var(--destructive-hover-color)",
				},
				chart: {
					"1": "var(--chart-1)",
					"2": "var(--chart-2)",
					"3": "var(--chart-3)",
					"4": "var(--chart-4)",
					"5": "var(--chart-5)",
				},
				sidebar: {
					DEFAULT: "var(--primary-color)",
					foreground: "var(--text-color)",
					primary: "var(--third-color)",
					"primary-foreground": "var(--primary-color)",
					accent: "var(--secondary-color)",
					"accent-foreground": "var(--text-highlight)",
					border: "var(--scrollbar-thumb)",
					ring: "var(--clickable-hover-color)",
				},
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
