"use client";

import { useRouter } from "next/navigation";

import { useEffect, useCallback, useRef } from "react";
import { ChevronUp, ChevronDown, CircleDot, Circle } from "lucide-react";

type ArrowButtonProps = {
	direction: "up" | "down";
	onClick: () => void;
	disabled: boolean;
};

function ArrowButton({ direction, onClick, disabled }: ArrowButtonProps) {
	const Icon = direction === "up" ? ChevronUp : ChevronDown;
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className="
        rounded-full
        p-1
        bg-accent/10
        hover:bg-accent/20
        disabled:opacity-50
        transition
      "
		>
			<Icon className="w-4 h-4 text-highlight" />
		</button>
	);
}

type VerticalStepperProps = {
	steps: string[];
	currentIndex: number;
	onStepClick?: (index: number) => void;
};

function VerticalStepper({
	steps,
	currentIndex,
	onStepClick,
}: VerticalStepperProps) {
	return (
		<div className="flex flex-col items-center gap-1">
			{steps.map((step, index) => (
				<div key={step} className="flex flex-col items-center">
					{index !== 0 && (
						<div className="w-[1px] h-3 bg-muted/40 mb-1" />
					)}
					<button
						onClick={() => onStepClick?.(index)}
						className="flex items-center justify-center cursor-pointer"
					>
						{index === currentIndex ? (
							<CircleDot className="w-4 h-4 text-accent animate-pulse" />
						) : (
							<Circle className="w-3 h-3 text-muted/60 hover:text-accent transition" />
						)}
					</button>
				</div>
			))}
		</div>
	);
}

type StepperControlsProps = {
	currentSection: string;
	steps?: string[];
};

export function StepperControls({
	currentSection,
	steps = ["about", "education", "experience", "skills", "hobbies"],
}: StepperControlsProps) {
	const router = useRouter();
	const activeIndex = steps.indexOf(currentSection);
	const isScrollingRef = useRef(false);
	const touchStartY = useRef<number | null>(null);

	const navigateToStep = useCallback(
		(index: number) => {
			const step = steps[index];
			if (step === "about") {
				router.push("/about");
			} else {
				router.push(`/about/${step}`);
			}
		},
		[router, steps],
	);

	const goUp = useCallback(() => {
		if (activeIndex > 0) {
			navigateToStep(activeIndex - 1);
		}
	}, [activeIndex, navigateToStep]);

	const goDown = useCallback(() => {
		if (activeIndex < steps.length - 1) {
			navigateToStep(activeIndex + 1);
		}
	}, [activeIndex, navigateToStep, steps.length]);

	const handleStepClick = (index: number) => {
		navigateToStep(index);
	};

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			if (isScrollingRef.current) return;

			const threshold = 30;
			if (event.deltaY > threshold) {
				isScrollingRef.current = true;
				goDown();
			} else if (event.deltaY < -threshold) {
				isScrollingRef.current = true;
				goUp();
			}

			setTimeout(() => {
				isScrollingRef.current = false;
			}, 700);
		};

		const handleTouchStart = (event: TouchEvent) => {
			touchStartY.current = event.touches[0].clientY;
		};

		const handleTouchEnd = (event: TouchEvent) => {
			if (touchStartY.current === null || isScrollingRef.current) return;

			const touchEndY = event.changedTouches[0].clientY;
			const deltaY = touchStartY.current - touchEndY;
			const swipeThreshold = 50;

			if (deltaY > swipeThreshold) {
				isScrollingRef.current = true;
				goDown();
			} else if (deltaY < -swipeThreshold) {
				isScrollingRef.current = true;
				goUp();
			}

			touchStartY.current = null;

			setTimeout(() => {
				isScrollingRef.current = false;
			}, 700);
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		window.addEventListener("touchstart", handleTouchStart, {
			passive: true,
		});
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [goDown, goUp]);

	return (
		<div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
			<ArrowButton
				direction="up"
				onClick={goUp}
				disabled={activeIndex === 0}
			/>
			<VerticalStepper
				steps={steps}
				currentIndex={activeIndex}
				onStepClick={handleStepClick}
			/>
			<ArrowButton
				direction="down"
				onClick={goDown}
				disabled={activeIndex === steps.length - 1}
			/>
		</div>
	);
}
