import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  className?: string;
}

const ColorCircle = ({ color, className, ...rest }: IProps) => {
  return (
    <span
      className={`block w-4 h-4  rounded-full ${className}`}
      style={{ backgroundColor: color }}
      {...rest}></span>
  );
};

export default ColorCircle;
