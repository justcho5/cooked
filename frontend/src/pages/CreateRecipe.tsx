import Button from "../components/Button";
import Form from "../components/Form";
export default function CreateRecipe() {
  const handleClick = () => {
    return;
  };
  return (
    <div className="flex flex-col gap-5">
      <Button text={"Import by URL"} onClick={handleClick} />
      <p className="text-center">-OR-</p>
      <Form />
    </div>
  );
}
