function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler;
}) {
  return (
    <button className="border rounded-md" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
