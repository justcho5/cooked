import { Button } from "./Button";

export interface Props {
  text: string;
  onClick: () => void;
}

export function RectangleButton({ text, onClick }: Props) {
  return (
    <Button
      border="solid"
      color="transparent"
      height="32px"
      width="64px"
      onClick={onClick}
      radius="5px"
      type="button"
    >
      {text}
    </Button>
  );
}
