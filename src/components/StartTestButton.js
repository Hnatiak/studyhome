import { useNavigate } from "react-router-dom";

const StartTestButton = ({ lessonId }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/test/${lessonId}`)}>
      Пройти тест
    </button>
  );
};

export default StartTestButton;