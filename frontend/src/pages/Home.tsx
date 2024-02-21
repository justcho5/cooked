import { RectangleButton } from "../components/RectangleButton";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/recipes");
  };
  return (
    <div>
      <p>I cooked that.</p>
      <RectangleButton text="View All" onClick={handleClick} />
    </div>
  );
}
