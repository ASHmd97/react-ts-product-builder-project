interface IProps {
  color: string;
}

const ColorBox = ({ color }: IProps) => {
  return (
    <span
      className="block w-fit h-6 rounded-md mb-1 text-white text-center text-xs font-semibold p-1"
      style={{ backgroundColor: color }}>
      {color}
    </span>
  );
};

export default ColorBox;
