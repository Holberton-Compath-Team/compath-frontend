import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputVariants = cva(
  "w-full rounded-lg border bg-surface px-4 py-2 text-body text-text-primary placeholder:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      hasError: {
        true: "border-danger focus-visible:ring-danger",
        false: "border-border focus-visible:ring-ku-green",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, error, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-small font-medium text-text-primary">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(inputVariants({ hasError: Boolean(error) }), className)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-small text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
