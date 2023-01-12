import clsx from "clsx";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
  size?: "lg" | "md" | "sm" | "xl" | "xs" | null;
  variant?: "primary" | "secondary";
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      as = "button",
      children,
      className,
      disabled = false,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) =>
    React.createElement(
      as,
      {
        className: clsx(
          className,
          "cursor-pointer rounded-full border-none py-3 px-5 font-bold text-white duration-200 hover:scale-105",
          {
            // variant states
            "bg-blue-700 text-white": variant === "primary",
            "bg-white text-white": variant === "secondary",
            // size states
            "text-lg": size == "lg",
            "text-md": size == "md",
            "text-sm": size == "sm",
            "text-xl": size == "xl",
            "text-xs py-1 px-1 font-normal bg-white text-black": size == "xs",
          },
        ),
        disabled,
        ref,
        type,
        ...props,
      },
      children,
    ),
);

export default Button;
