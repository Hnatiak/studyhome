import LessonWrapper from "../components/LessonWrapper";
import { useAuth } from "../context/AuthContext";
import StartTestButton from "../components/StartTestButton";
import lesson1 from '../video-lesson/video-lesson-1.mp4';

const Dashboard = () => {
    const { user, logout } = useAuth();

  return (
    <div className="card-dashboard">
      <h1>Вітаю, {user.name}</h1>
      <p>Статус: {user.role === "teacher" ? "Викладач" : "Учень"}</p>

      {user.role === "teacher" && (
        <p>Тільки викладач бачить цей текст</p>
      )}

      <LessonWrapper id="lesson1">
        <div className="table-scroll">
          <h2>Урок 1</h2>
          <p>Якщо буква в транскрипці пишеться з великої літери, то це наголос, приклад: жО = жó</p>
          <table>
            <thead>
              <tr>
                <th>Французька</th>
                <th>Транскрипція</th>
                <th>Українська</th>
                <th>Примітка</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Je</td>
                <td>жО</td>
                <td>Я</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Tu</td>
                <td>тЮ</td>
                <td>Ти</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Il / Elle</td>
                <td>Іль / Ель</td>
                <td>Він / Вона</td>
                <td>-</td>
              </tr>
              <tr>
                <td>On</td>
                <td>Он</td>
                <td>Ми</td>
                <td>Всі в країні, в місті, в школі, народ і тд</td>
              </tr>
              <tr>
                <td>Nous</td>
                <td>нУ</td>
                <td>Ми</td>
                <td>Певна кількість людей</td>
              </tr>
              <tr>
                <td>Vous</td>
                <td>вУ</td>
                <td>Ви</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Ils / Elles</td>
                <td>Іль / Ель</td>
                <td>Вони</td>
                <td>Іль / Ель – Вони (чоловіки і жінки) / Вони (лише жінки)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br/>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
          <video
            controls
            controlsList="nodownload" 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <source src={lesson1} type="video/mp4" />
            Ваш браузер не підтримує відео.
          </video>
        </div>
        <br/>
        <StartTestButton lessonId="lesson-1" />
        <br/>
      </LessonWrapper>

      <LessonWrapper id="lesson2">
        <div className="lesson">
          <h2>Урок 2</h2>
          <p>Цей урок закритий для учня</p>
        </div>
      </LessonWrapper>

        <button onClick={logout}>Вийти</button>

    </div>
  );
};

export default Dashboard;