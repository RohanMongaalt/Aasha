import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-elegant hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-subtle hover:bg-destructive/90",
        outline:
          "border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent/80 hover:text-accent-foreground hover:border-primary/50",
        secondary:
          "bg-secondary/20 text-secondary-foreground border border-secondary/30 hover:bg-secondary/30 backdrop-blur-sm",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary hover:text-accent underline-offset-4 hover:underline",
        glass: "bg-card/20 backdrop-blur-md border border-border/30 hover:bg-card/40 text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
