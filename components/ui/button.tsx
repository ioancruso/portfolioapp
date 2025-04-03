import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-transform duration-200 transform",
	{
		variants: {
			variant: {
				default:
					"bg-button-default text-button-default-text hover:bg-button-default-hover border border-current shadow-md hover:shadow-lg hover:scale-105",
				destructive:
					"bg-button-destructive text-button-destructive-text hover:bg-button-destructive-hover shadow-md hover:shadow-lg border border-current hover:scale-105",
				outline:
					"bg-button-outline border border-input shadow-sm hover:shadow-md hover:bg-secondary hover:text-accent-foreground hover:scale-105",
				secondary:
					"bg-secondary text-button shadow-sm hover:shadow-md hover:bg-secondary/80 hover:scale-105",
				ghost: "hover:bg-accent hover:text-accent-foreground shadow-none hover:scale-105",
				link: "text-primary underline-offset-4 hover:underline shadow-none hover:scale-105",
			},
			size: {
				default: "h-9 px-5 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
