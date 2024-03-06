import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "./Button";

export interface Props {
  icon: IconDefinition;
  onClick: () => void;
}

export function RoundButton({ icon, onClick }: Props) {
  return (
    <Button
      border="solid"
      color="transparent"
      height="20px"
      onClick={onClick}
      radius="50%"
      width="20px"
      type="button"
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}
