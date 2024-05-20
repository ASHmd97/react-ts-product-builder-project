interface IProps {
  message: string;
}

const ErrorMessage = ({ message }: IProps) => {
  return message ? (
    <span className="block text-xs text-red-500">{message}</span>
  ) : null;
};

export default ErrorMessage;
