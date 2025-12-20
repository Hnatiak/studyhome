import { useNavigate } from "react-router-dom";

const StartTestButton = ({ lessonId }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/test/${lessonId}`)} style={{ marginBottom: "15px" }}>
      Пройти тест
    </button>
  );
};

export default StartTestButton;