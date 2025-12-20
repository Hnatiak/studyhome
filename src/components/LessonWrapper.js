// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect } from "react";

// const LessonWrapper = ({ id, children }) => {
//   const { user } = useAuth();
  
//   const [isOpen, setIsOpen] = useState(() => {
//     const saved = localStorage.getItem(`lesson_access_${id}`);
//     return saved === "true";
//   });

//   useEffect(() => {
//     localStorage.setItem(`lesson_access_${id}`, isOpen);
//   }, [isOpen, id]);

//   const toggleAccess = (e) => {
//     e.stopPropagation();
//     setIsOpen(!isOpen);
//     console.log(`Урок ${id} тепер ${!isOpen ? "відкритий" : "закритий"}`);
//   };

//   if (user.role === "student" && !isOpen) return null;

//   return (
//     <div className="lesson-wrapper">
//       {user.role === "teacher" && (
//         <button
//           onClick={toggleAccess}
//           type="button"
//           style={{
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//             padding: "12px 24px",
//             borderRadius: "12px",
//             border: "none",
//             backgroundColor: isOpen ? "#4CAF50" : "#f44336",
//             backgroundImage: "none", 
//             color: "#fff",
//             boxShadow: isOpen ? "0 4px 0 #2d6a30" : "0 4px 0 #b71c1c",
//             transition: "0.2s",
//             width: "auto",
//             minWidth: "200px",
//             transform: "translateZ(50px)"
//           }}
//         >
//           {isOpen ? "🔓 Доступ відкрито" : "🔒 Доступ закрито"}
//         </button>
//       )}

//       <div className="lesson-content" style={{ width: "100%", textAlign: "center" }}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default LessonWrapper;



// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

// const LessonWrapper = ({ id, children }) => {
//   const { user } = useAuth();

//   // ✅ хуки завжди викликаються
//   const [isOpen, setIsOpen] = useState(() => {
//     const saved = localStorage.getItem(`lesson_access_${id}`);
//     return saved === "true";
//   });

//   useEffect(() => {
//     localStorage.setItem(`lesson_access_${id}`, isOpen);
//   }, [isOpen, id]);

//   // ❗ ЛОГІКА ПІСЛЯ ХУКІВ
//   if (user.role === "student") {
//     if (!user.lessonAccess?.[id]) return null;
//     return <div className="lesson-wrapper">{children}</div>;
//   }

//   // 👨‍🏫 тільки викладач бачить кнопку
//   return (
//     <div className="lesson-wrapper">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           cursor: "pointer",
//           fontSize: "16px",
//           fontWeight: "bold",
//           padding: "12px 24px",
//           borderRadius: "12px",
//           border: "none",
//           backgroundColor: isOpen ? "#4CAF50" : "#f44336",
//           color: "#fff",
//         }}
//       >
//         {isOpen ? "🔓 Доступ відкрито" : "🔒 Доступ закрито"}
//       </button>

//       {isOpen && (
//         <div className="lesson-content" style={{ width: "100%", textAlign: "center" }}>
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LessonWrapper;



import { useAuth } from "../context/AuthContext";

const LessonWrapper = ({ id, children }) => {
  const { user } = useAuth();

  // ⛔ без user — нічого не показуємо
  if (!user) return null;

  // 👨‍🎓 СТУДЕНТ
  if (user.role === "student") {
    // ❗ тільки lessonAccess
    if (!user.lessonAccess?.[id]) return null;

    return (
      <div className="lesson-wrapper">
        <div className="lesson-content" style={{ width: "100%", textAlign: "center" }}>
          {children}
        </div>
      </div>
    );
  }

  // 👨‍🏫 ВИКЛАДАЧ — бачить завжди
  return (
    <div className="lesson-wrapper">
      <div className="lesson-content" style={{ width: "100%", textAlign: "center" }}>
        {children}
      </div>
    </div>
  );
};

export default LessonWrapper;