// import { useRef, useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { testsData } from "../tests/testsData";

// const TestRoom = () => {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();
//   const questions = testsData[lessonId];

//   const [current, setCurrent] = useState(0);
//   const scoreRef = useRef({ correct: 0, wrong: 0 });
//   const testEnded = useRef(false);
//   const testStartedAt = useRef(Date.now());

//   // Завжди оголошуємо endTest перед useEffect
//   const endTest = useCallback((reason) => {
//     if (testEnded.current) return;
//     testEnded.current = true;

//     navigate("/test-result", {
//       replace: true,
//       state: {
//         lessonId,
//         correct: scoreRef.current.correct,
//         wrong: scoreRef.current.wrong,
//         total: questions.length,
//         reason,
//       },
//     });
//   }, [navigate, lessonId, questions.length]);

//   // АНТИ-CHEAT
//   useEffect(() => {
//     if (!questions) return;

//     const SAFE_TIME_MS = 500;
//     const isSafeTime = () => Date.now() - testStartedAt.current > SAFE_TIME_MS;

//     const handleVisibility = () => { if (document.hidden && isSafeTime()) endTest("ви покинули вкладку"); };
//     const handleBlur = () => { if (isSafeTime()) endTest("ви перейшли в інше вікно"); };
//     const handleBeforeUnload = (e) => { e.preventDefault(); endTest("ви покинули сторінку"); e.returnValue = ""; };
//     const handleKeyDown = (e) => {
//       if (!isSafeTime()) return;
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
//         (e.ctrlKey && e.key === "r") ||
//         e.key === "F5"
//       ) {
//         e.preventDefault();
//         endTest("заборонена дія");
//       }
//     };
//     const handleContextMenu = (e) => { if (!isSafeTime()) return; e.preventDefault(); endTest("права кнопка миші"); };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("contextmenu", handleContextMenu);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("contextmenu", handleContextMenu);
//     };
//   }, [endTest, questions]);

//   if (!questions) return <h2>Тест для цього уроку не знайдено</h2>;

//   const question = questions[current];

//   const handleAnswer = (index) => {
//     if (question.options[index].correct) scoreRef.current.correct += 1;
//     else scoreRef.current.wrong += 1;

//     if (current + 1 < questions.length) {
//       setCurrent(prev => prev + 1);
//     } else {
//       endTest("тест завершено");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Тест: {lessonId}</h2>
//       <h3>{question.question}</h3>

//       {question.options.map((opt, index) => (
//         <button
//           key={index}
//           onClick={() => handleAnswer(index)}
//           style={{
//             display: "block",
//             margin: "10px 0",
//             padding: "10px",
//             marginBottom: "20px",
//           }}
//         >
//           {opt.text}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default TestRoom;










import { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { testsData } from "../tests/testsData";

const TestRoom = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const questions = testsData[lessonId];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // Індекс вибраної відповіді
  const [showAnswer, setShowAnswer] = useState(false);

  const scoreRef = useRef({ correct: 0, wrong: 0 });
  const testEnded = useRef(false);
  const testStartedAt = useRef(Date.now());

  const endTest = useCallback((reason) => {
    if (testEnded.current) return;
    testEnded.current = true;

    navigate("/test-result", {
      replace: true,
      state: {
        lessonId,
        correct: scoreRef.current.correct,
        wrong: scoreRef.current.wrong,
        total: questions.length,
        reason,
      },
    });
  }, [navigate, lessonId, questions.length]);

  useEffect(() => {
    if (!questions) return;

    const SAFE_TIME_MS = 500;
    const isSafeTime = () => Date.now() - testStartedAt.current > SAFE_TIME_MS;

    const handleVisibility = () => { if (document.hidden && isSafeTime()) endTest("ви покинули вкладку"); };
    const handleBlur = () => { if (isSafeTime()) endTest("ви перейшли в інше вікно"); };
    const handleBeforeUnload = (e) => { e.preventDefault(); endTest("ви покинули сторінку"); e.returnValue = ""; };
    const handleKeyDown = (e) => {
      if (!isSafeTime()) return;
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "r") ||
        e.key === "F5"
      ) {
        e.preventDefault();
        endTest("заборонена дія");
      }
    };
    const handleContextMenu = (e) => { if (!isSafeTime()) return; e.preventDefault(); endTest("права кнопка миші"); };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [endTest, questions]);

  if (!questions) return <h2>Тест для цього уроку не знайдено</h2>;

  const question = questions[current];

  const handleAnswer = (index) => {
    if (selected !== null) return; // Забороняємо повторне натискання

    setSelected(index);
    setShowAnswer(true);

    if (question.options[index].correct) scoreRef.current.correct += 1;
    else scoreRef.current.wrong += 1;

    // Переходимо до наступного питання через 1.5 секунди
    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);
      if (current + 1 < questions.length) {
        setCurrent(prev => prev + 1);
      } else {
        endTest("тест завершено");
      }
    }, 1500);
  };

  const getButtonStyle = (index) => {
    let style = {
      display: "block",
      margin: "10px 0",
      padding: "10px",
      marginBottom: "20px",
      cursor: "pointer",
      color: "#fff",
      background: "linear-gradient(145deg, #6a7cff, #4c5bff)", // дефолтний градієнт
    };

    if (showAnswer) {
      const option = question.options[index];
      if (option.correct) {
        style.background = "green"; // <--- використовуємо background
        style.color = "white";
      }
      if (index === selected && !option.correct) {
        style.background = "red"; // <--- використовуємо background
        style.color = "white";
      }
    }

    return style;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Тест: {lessonId}</h2>
      <h3>{question.question}</h3>

      {question.options.map((opt, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          style={getButtonStyle(index)}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
};

export default TestRoom;