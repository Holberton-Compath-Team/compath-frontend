import * as React from "react";

import { cn } from "@/utils/cn";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-w-page tablet:px-8 mx-auto w-full px-4", className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";

export { Container };
