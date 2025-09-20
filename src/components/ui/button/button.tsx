import * as React from "react";
import Link from "next/link";
import classes from "./button.module.scss";
import { cn } from "@/lib/utils";

const variantClass = {
  outlined: classes.outlined,
};

const sizeClass = {
  default: classes.sizeDefault,
  sm: classes.sizeSm,
  lg: classes.sizeLg,
};

export type ButtonType = {
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
  url?: string;
  text?: string;
  buttonColor?: {
    name: string;
    hexCode: string;
  };
};

export type ButtonComponentType = React.ComponentProps<"button"> &
  ButtonType & { children: React.ReactNode };

export function Button({
  className,
  variant, // No default - base class provides default styling
  size = "default",
  url,
  children,
  buttonColor,
  ...props
}: ButtonComponentType) {
  const content = url ? <Link href={url}>{children}</Link> : children;

  const customStyle = buttonColor
    ? ({ "--button-color": buttonColor.hexCode } as React.CSSProperties)
    : {};

  return (
    <button
      data-slot="button"
      className={cn(
        classes.button,
        variant && variantClass[variant], // Only apply variant if provided
        sizeClass[size],
        className
      )}
      style={customStyle}
      {...props}
    >
      {content}
    </button>
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
              key={idx}
              variant={button.variant}
              size={button.size}
              url={button.url}
              buttonColor={button.buttonColor}
              className={classes.button}
            >
              {button.text}
            </Button>
          ))}
    </div>
  );
}
