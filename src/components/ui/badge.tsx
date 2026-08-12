import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-3 py-1 text-caption font-medium",
  {
    variants: {
      variant: {
        default: "bg-ku-green-soft text-ku-green-dark",
        accent: "bg-ku-blue-light text-text-primary",
        success: "bg-ku-green-soft text-ku-green-dark",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-danger text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
