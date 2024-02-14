import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Button from "./Button";

interface Props {
  icon: IconDefinition;
  onClick: () => void;
}

function RoundButton({ icon, onClick }: Props) {
  return (
    <Button
      border="solid"
      color="transparent"
      height="20px"
      onClick={onClick}
      radius="50%"
      width="20px"
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}

export default RoundButton;
