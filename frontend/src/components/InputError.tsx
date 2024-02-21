import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function InputError({ message }: { message: string | undefined }) {
  return message ? (
    <p className="text-red-500">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      {message}
    </p>
  ) : null;
}
