import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <footer className="text-center bg-[#F6FDF4] py-2">
      Made with <FontAwesomeIcon icon={faHeart} /> 2024
    </footer>
  );
}
