// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { testsData } from "../tests/testsData";

// const TestRoom = () => {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();

//   const questions = testsData[lessonId];
//   const [current, setCurrent] = useState(0);
//   const [correct, setCorrect] = useState(0);
//   const [wrong, setWrong] = useState(0);

//   if (!questions) return <h2>Тест для цього уроку не знайдено</h2>;

//   const question = questions[current];

//   const handleAnswer = (index) => {
//       // локальні змінні
//       const newCorrect = correct + (question.options[index].correct ? 1 : 0);
//       const newWrong = wrong + (question.options[index].correct ? 0 : 1);

//       if (current + 1 < questions.length) {
//         setCorrect(newCorrect);
//         setWrong(newWrong);
//         setCurrent(prev => prev + 1);
//       } else {
//         navigate("/test-result", {
//           replace: true,
//           state: {
//             lessonId,
//             correct: newCorrect,
//             wrong: newWrong,
//             total: questions.length,
//           }
//         });
//       }
//     };

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
//           }}
//         >
//           {opt.text}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default TestRoom;
















// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { testsData } from "../tests/testsData";

// const TestRoom = () => {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();
//   const testEnded = useRef(false);

//   const questions = testsData[lessonId];
//   const [current, setCurrent] = useState(0);
//   const [correct, setCorrect] = useState(0);
//   const [wrong, setWrong] = useState(0);

//   const endTest = (reason) => {
//     if (testEnded.current) return;
//     testEnded.current = true;

//     navigate("/test-result", {
//       replace: true,
//       state: {
//         lessonId,
//         correct,
//         wrong,
//         total: questions ? questions.length : 0,
//         reason,
//       },
//     });
//   };

//   // АНТИ-CHEAT
//   useEffect(() => {
//     if (!questions) return; // умова всередині useEffect — це ОК

//     const SAFE_TIME_MS = 500;
//     const startTime = Date.now();
//     const isSafeTime = () => Date.now() - startTime > SAFE_TIME_MS;

//     const handleVisibility = () => { if (document.hidden && isSafeTime()) endTest("ви покинули вкладку"); };
//     const handleBlur = () => { if (isSafeTime()) endTest("ви перейшли в інше вікно"); };
//     const handleKeyDown = (e) => {
//       if (!isSafeTime()) return;
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
//         (e.ctrlKey && e.key === "r") ||
//         e.key === "F5"
//       ) {
//         e.preventDefault();
//         endTest("заборонена дія");
//       }
//     };
//     const handleContextMenu = (e) => { if (!isSafeTime()) return; e.preventDefault(); endTest("права кнопка миші"); };
//     const handleBeforeUnload = (e) => { e.preventDefault(); endTest("ви покинули сторінку"); e.returnValue = ""; };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("contextmenu", handleContextMenu);
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("contextmenu", handleContextMenu);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [questions]); // endTest не додаємо, бо це стабільна функція

//   if (!questions) return <h2>Тест для цього уроку не знайдено</h2>;

//   const question = questions[current];

//   const handleAnswer = (index) => {
//     const newCorrect = correct + (question.options[index].correct ? 1 : 0);
//     const newWrong = wrong + (question.options[index].correct ? 0 : 1);

//     setCorrect(newCorrect);
//     setWrong(newWrong);

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
//           }}
//         >
//           {opt.text}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default TestRoom;





// import { useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { testsData } from "../tests/testsData";

// const TestRoom = () => {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();

//   const questions = testsData[lessonId];
//   const [current, setCurrent] = useState(0);

//   const scoreRef = useRef({ correct: 0, wrong: 0 }); // накопичувальний стан

//   if (!questions) return <h2>Тест для цього уроку не знайдено</h2>;

//   const question = questions[current];

//   const handleAnswer = (index) => {
//     if (question.options[index].correct) {
//       scoreRef.current.correct += 1;
//     } else {
//       scoreRef.current.wrong += 1;
//     }

//     if (current + 1 < questions.length) {
//       setCurrent(prev => prev + 1);
//     } else {
//       navigate("/test-result", {
//         replace: true,
//         state: {
//           lessonId,
//           correct: scoreRef.current.correct,
//           wrong: scoreRef.current.wrong,
//           total: questions.length,
//         }
//       });
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
  const scoreRef = useRef({ correct: 0, wrong: 0 });
  const testEnded = useRef(false);
  const testStartedAt = useRef(Date.now());

  // Завжди оголошуємо endTest перед useEffect
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

  // АНТИ-CHEAT
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
    if (question.options[index].correct) scoreRef.current.correct += 1;
    else scoreRef.current.wrong += 1;

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
    } else {
      endTest("тест завершено");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Тест: {lessonId}</h2>
      <h3>{question.question}</h3>

      {question.options.map((opt, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
};

export default TestRoom;