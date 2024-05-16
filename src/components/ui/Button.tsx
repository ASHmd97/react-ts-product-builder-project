import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ className, children, ...rest }: IProps) => {
  return (
    <button className={`text-white rounded-md ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
