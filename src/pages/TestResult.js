// import { useLocation, useNavigate } from "react-router-dom";

// const TestResult = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Очікуємо, що у state передається wrong та total
//   const { lessonId, wrong = 0, total = 0 } = location.state || {};

//   if (!location.state) {
//     return <h2>Немає даних для відображення результату</h2>;
//   }

//   const correct = total - wrong;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Результат тесту</h2>

//       <p><strong>Урок:</strong> {lessonId}</p>
//       <p>✅ Правильних відповідей: {correct}</p>
//       <p>❌ Помилок: {wrong}</p>
//       <p>📊 Всього питань: {total}</p>

//       <button
//         onClick={() => navigate("/dashboard")}
//         style={{ marginTop: "20px", padding: "10px 20px" }}
//       >
//         Повернутись на головну
//       </button>
//     </div>
//   );
// };

// export default TestResult;



import { useLocation, useNavigate } from "react-router-dom";

const TestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { lessonId, correct = 0, wrong = 0, total = 0 } = location.state || {};

  if (!location.state) {
    return <h2>Немає даних для відображення результату</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Результат тесту</h2>

      <p><strong>Урок:</strong> {lessonId}</p>
      <p>✅ Правильних відповідей: {correct}</p>
      <p>❌ Неправильних відповідей: {wrong}</p>
      <p>📊 Всього питань: {total}</p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Повернутись на головну
      </button>
    </div>
  );
};

export default TestResult;