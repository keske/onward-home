import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ children, ...props }, ref) => (
    <input
      {...props}
      className="rounded-xl border-none bg-slate-100 p-3"
      ref={ref}
    />
  ),
);

export default Input;
