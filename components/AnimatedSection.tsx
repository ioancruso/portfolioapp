"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
}

const animationVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1 },
};

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
	return (
		<div className="overflow-hidden w-full">
			<motion.section
				className={className}
				initial="hidden"
				animate="visible"
				variants={animationVariants}
				transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
			>
				{children}
			</motion.section>
		</div>
	);
}
