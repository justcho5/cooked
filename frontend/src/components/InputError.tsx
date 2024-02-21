import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  message: string | undefined;
}

export function InputError({ message }: Props) {
  return message ? (
    <p className="text-red-500">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      {message}
    </p>
  ) : null;
}
