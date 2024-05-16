interface IProps {
  imageURL: string;
  alt: string;
  className?: string;
}

const Image = ({ imageURL, alt, className }: IProps) => {
  return (
    <img src={imageURL} alt={alt} className={`object-cover ${className}`} />
  );
};

export default Image;
