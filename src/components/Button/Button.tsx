import Link from "next/link";
import type * as React from "react";
import { cn } from "@/lib/utils";
import classes from "./Button.module.scss";

const variantClass = {
  outlined: classes.outlined,
};

const sizeClass = {
  large: classes.large,
  small: classes.small,
};

export type ButtonType = {
  variant?: keyof typeof variantClass;
  href: string;
  size?: keyof typeof sizeClass;
  text?: string;
};

export type ButtonComponentType = React.ComponentProps<typeof Link> &
  ButtonType & { children: React.ReactNode };

export default function Button({
  className,
  variant,
  size,
  href,
  children,
}: ButtonComponentType) {
  return (
    <Link
      href={href}
      className={cn(
        classes.button,
        variant && variantClass[variant], // Only apply variant if provided
        size && sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export type ButtonsComponentType = React.ComponentProps<"div"> & {
  buttons: ButtonType[];
};

export function Buttons({ buttons, className }: ButtonsComponentType) {
  return (
    <div className={cn([classes.buttonsContainer, className])}>
      {buttons &&
        buttons.length > 0 &&
        buttons
          .filter((button) => button != null)
          .map((button, idx) => (
            <Button
              key={button.text || `button-${idx}`}
              variant={button.variant}
              size={button.size}
              href={button.href}
              className={classes.button}
            >
              {button.text}
            </Button>
          ))}
    </div>
  );
}
