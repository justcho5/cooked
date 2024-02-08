import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/recipes");
  };
  return (
    <div>
      <p>I cooked that.</p>
      <Button text="View all" onClick={handleClick} />
    </div>
  );
}

export default Home;
