import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }, ref) => (
    <input
      {...props}
      className="rounded-xl border-none bg-slate-100 p-3"
      ref={ref}
    />
  ),
);
