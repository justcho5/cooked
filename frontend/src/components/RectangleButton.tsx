import Button from "./Button";

interface Props {
  text: string;
  onClick: () => void;
}

function RectangleButton({ text, onClick }: Props) {
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

export default RectangleButton;
