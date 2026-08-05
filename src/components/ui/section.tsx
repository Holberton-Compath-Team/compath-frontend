import * as React from "react";

import { cn } from "@/utils/cn";

export type SectionProps = React.HTMLAttributes<HTMLElement>;

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("tablet:py-16 laptop:py-24 py-12", className)}
      {...props}
    />
  ),
);
Section.displayName = "Section";

export { Section };
