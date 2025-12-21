import React, { useState } from "react";
import LessonWrapper from "../components/LessonWrapper";
import { useAuth } from "../context/AuthContext";
import StartTestButton from "../components/StartTestButton";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [lesson1Open, setLesson1Open] = useState(true);
  const [lesson2Open, setLesson2Open] = useState(true);
  const [lesson3Open, setLesson3Open] = useState(true);

  const hasAccess = (lessonId) => {
    if (!user) return false;
    if (user.role === "teacher") return true;
    return !!user.lessonAccess?.[lessonId];
  };

  return (
    <div className="card-dashboard">
      <h1>Вітаю {user.name}</h1>
      <p>Статус: {user.role === "teacher" ? "Викладач" : "Учень"}</p>

      {user.role === "teacher" && (
        <p>Тільки викладач бачить цей текст</p>
      )}
      {hasAccess("lesson1") && (
        <LessonWrapper id="lesson1">
          <button
            onClick={() => setLesson1Open(!lesson1Open)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "16px",
            }}
          >
            {lesson1Open ? "▼" : "►"} Урок 1 - Відмінювання займенників
          </button>
          {lesson1Open && (
          <div>
          <div className="table-scroll">
            <h2>Урок 1 - Відмінювання займенників</h2>
            <p>Якщо буква в транскрипці пишеться з великої літери, то це наголос, приклад: жО = жó</p>
            <table style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Французька</th>
                  <th>Транскр</th>
                  <th>Переклад</th>
                  <th>Додаток</th>
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
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/8VJQ7VgE9lo"
              title="Урок 1 - Франц мова"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
          <br/>
          <StartTestButton lessonId="lesson1" />
        </div>
          )}
      </LessonWrapper>
      )}

      {hasAccess("lesson2") && (
        <LessonWrapper id="lesson2">
          <button
            onClick={() => setLesson2Open(!lesson2Open)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "16px",
            }}
          >
            {lesson2Open ? "▼" : "►"} Урок 2 - Дієслово être (Бути) і avoir (Мати)
          </button>
          {lesson2Open && (
            <div>
          <div className="table-scroll">
            <h2>Урок 2 - Дієслово être (Бути) і avoir (Мати)</h2>
            <table style={{ textAlign: "left" }}>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>Être</th>
                  <th>Переклад</th>
                  <th>Avoir</th>
                  <th>Переклад</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Je <span class="red">suis</span> (жО свІ)</td>
                  <td>Я є</td>
                  <td>J <span class="red">'ai</span> (жЕ)</td>
                  <td>Я маю</td>
                </tr>
                <tr>
                  <td>Tu <span class="red">es</span> (тЮ Е)</td>
                  <td>Ти є</td>
                  <td>Tu <span class="red">as</span> (тЮ А)</td>
                  <td>Ти маєш</td>
                </tr>
                <tr>
                  <td>Il / Elle <span class="red">est</span> (Іль / Ель Е)</td>
                  <td>Він / Вона є</td>
                  <td>Il / Elle <span class="red">a</span> (Іль / Ель А)</td>
                  <td>Він / Вона має</td>
                </tr>
                <tr>
                  <td>On <span class="red">est</span> (Он Е)</td>
                  <td>Ми є</td>
                  <td>On <span class="red">a</span> (Он А)</td>
                  <td>Ми маємо</td>
                </tr>
                <tr>
                  <td>Nous <span class="red">sommes</span> (нУ сОм)</td>
                  <td>Ми є</td>
                  <td>Nous <span class="red">avons</span> (нУ завОн)</td>
                  <td>Ми маємо</td>
                </tr>
                <tr>
                  <td>Vous <span class="red">êtes</span> (вУ зЕт)</td>
                  <td>Ви є</td>
                  <td>Vous <span class="red">avez</span> (вУ завИ)</td>
                  <td>Ви маєте</td>
                </tr>
                <tr>
                  <td>Ils / Elles <span class="red">sont</span> (Іль / Ель сОн)</td>
                  <td>Вони є</td>
                  <td>Ils / Elles <span class="red">ont</span> (Іль / Ель зОн)</td>
                  <td>Вони мають</td>
                </tr>
              </tbody>

            </table>
          </div>
          <br/><br/>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/iPmaxRu843g"
              title="Урок 1 - Франц мова"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
          <br/>
          <div>
            <em>Примітка: Je (жО) і J'ai (жЕ) - це різні речі, тому будь уважний</em>
          </div>
          <div>
            <h3>Прикметники французькою</h3>
            <ul style={{ textAlign: "left" }}>
              <li><b>pauvre</b> (пОвр) — бідний</li>
              <li><b>riche</b> (рІш) — багатий</li>
              <li><b>heureux / heureuse</b> (ур'Ю / ур'Юз) — щасливий / щаслива</li>
              <li><b>triste</b> (трІст) — сумний</li>
              <li><b>joyeux / joyeuse</b> (жваЮ / жваЮз) — веселий / весела</li>
              <li><b>content / contente</b> (контОн / контОнт) — задоволений / задоволена</li>
              <li><b>fatigué / fatiguée</b> (фатіґИ / фатіґИ) — втомлений / втомлена</li>
              <li><b>en colère</b> (Он колЕр) — злий</li>
              <li><b>calme</b> (кАльм) — спокійний</li>
              <li><b>malheureux / malheureuse</b> (мальорУ / мальорУз) — нещасний / нещасна</li>
              <li><b>optimiste</b> (оптімІст) — оптимістичний</li>
              <li><b>pessimiste</b> (песімІст) — песимістичний</li>
            </ul>

            <p><b>Зауваження:</b></p>
            <p>
              Якщо ми вживаємо <b>nous</b>, <b>vous</b>, <b>ils</b>, <b>elles</b>,<br/>
              то прикметник у множині отримує закінчення:
            </p>
            <ul style={{ textAlign: "left" }}>
              <li><b>-s</b> → для чоловічого роду</li>
              <li><b>-es</b> → для жіночого роду</li>
            </ul>
            <p style={{ color: "white"}}>Але про це ми обов'язково будемо говорити пізніше, а поки що <i>Приклади:</i></p>
            <p style={{ color: "white"}}>
              Je suis <span className="red">pauvre</span>. — Я бідний 🤧.<br/>
              Tu es <span className="red">en colère</span>. — Ти злий 😡.<br/>
              Nous sommes <span className="red">heureux</span>. — Ми щасливі 😄.<br/>
              Elles sont <span className="red">heureuses</span>. — Вони щасливі.
            </p>
          </div>
          <br/>
          <StartTestButton lessonId="lesson2" />
          </div>
          )}
        </LessonWrapper>
      )}


      {hasAccess("lesson3") && (
        <LessonWrapper id="lesson3">
          <button
            onClick={() => setLesson3Open(!lesson3Open)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "16px",
            }}
          >
            {lesson3Open ? "▼" : "►"} Урок 3 - Перша група дієслів
          </button>
          {lesson3Open && (
          <div>
            <div className="table-scroll">
              <h2>Урок 3 — Перша група дієслів (-ER)</h2>
              <p>Цікаво знати: приблизно 90% французьких дієслів належать до першої групи і закінчуються на <b>-ER</b>.</p>
              <table style={{ textAlign: "left" }}>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>Особа</th>
                    <th>Закінчення</th>
                    <th>Приклад: parler</th>
                    <th>Вимова</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Je</td>
                    <td><span className="red">-e</span></td>
                    <td>je parl<span className="red">e</span></td>
                    <td>парль</td>
                  </tr>
                  <tr>
                    <td>Tu</td>
                    <td><span className="red">-es</span></td>
                    <td>tu parl<span className="red">es</span></td>
                    <td>парль</td>
                  </tr>
                  <tr>
                    <td>Il / Elle / On</td>
                    <td><span className="red">-e</span></td>
                    <td>il parl<span className="red">e</span></td>
                    <td>парль</td>
                  </tr>
                  <tr>
                    <td>Nous</td>
                    <td><span className="red">-ons</span></td>
                    <td>nous parl<span className="red">ons</span></td>
                    <td>парлОн</td>
                  </tr>
                  <tr>
                    <td>Vous</td>
                    <td><span className="red">-ez</span></td>
                    <td>vous parl<span className="red">ez</span></td>
                    <td>парлЕ</td>
                  </tr>
                  <tr>
                    <td>Ils / Elles</td>
                    <td><span className="red">-ent</span></td>
                    <td>ils parl<span className="red">ent</span></td>
                    <td>парль</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br/><br/>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/34PFFDjC6ec"
              title="Урок 1 - Франц мова"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
          <div>
            <h3>Важливі моменти:</h3>
            <ul style={{ textAlign: "left" }}>
              <li>✔️ Перша група — всі дієслова на <b>-ER</b></li>
              <li>❌ <b>aller</b> — виняток (це III група)</li>
              <li>🔇 Закінчення <b>-e, -es, -ent</b> <span className="red">не вимовляються</span></li>
              <li>👂 Реально чути тільки <b>nous</b> і <b>vous</b></li>
            </ul>
            <h3>Інші дієслова першої групи (-ER):</h3>
            <ul style={{ textAlign: "left" }}>
              <li>parler (парлИ) — говорити</li>
              <li>aimer (емИ) — любити</li>
              <li>écouter (екутИ) — слухати</li>
              <li>travailler (травайИ) — працювати</li>
              <li>jouer (жуИ) — грати</li>
              <li>regarder (регардИ) — дивитися</li>
              <li>chercher (шершИ) — шукати</li>
              <li>trouver (трувИ) — знаходити</li>
              <li>penser (пансИ) — думати</li>
              <li>donner (донИ) — давати</li>
              <li>marcher (маршИ) — ходити</li>
              <li>étudier (етюдИ) — вчитися</li>
              <li>habiter (абітИ) — жити (деякий час)</li>
              <li>téléphoner (телефонИ) — телефонувати</li>
              <li>demander (дьомандИ) — запитувати</li>
              <li>arriver (арівИ) — прибувати</li>
              <li>entrer (антрИ) — входити</li>
              <li>rester (рестИ) — залишатися</li>
              <li>quitter (кітИ) — залишати</li>
              <li>commencer (комонсИ) — починати</li>
              <li>continuer (контінюИ) — продовжувати</li>
              <li>terminer (термінИ) — закінчувати</li>
              <li>préparer (препарИ) — готувати</li>
              <li>expliquer (експлікИ) — пояснювати</li>
              <li>répéter (репетИ) — повторювати</li>
              <li>utiliser (ютілізИ) — використовувати</li>
              <li>organiser (організИ) — організовувати</li>
              <li>visiter (візітИ) — відвідувати</li>
              <li>voyager (вояжИ) — подорожувати</li>
              <li>habiller (абійИ) — одягати</li>
              <li>porter (портИ) — носити</li>
              <li>montrer (монтрИ) — показувати</li>
              <li>changer (шонжИ) — міняти</li>
              <li>payer (пейИ) — платити</li>
              <li>fermer (фермИ) — закривати</li>
              <li>commander (комондИ) — замовляти</li>
              <li>réserver (резервИ) — бронювати</li>
              <li>garder (ґардИ) — зберігати</li>
              <li>partager (партажИ) — ділитися</li>
              <li>rentrer (ронтрИ) — повертатися</li>
              <li>tourner (турнИ) — повертати</li>
              <li>tomber (томбИ) — падати</li>
              <li>passer (пасИ) — проходити / проводити час</li>
              <li>arrêter (аретИ) — зупиняти</li>
              <li>espérer (есперИ) — сподіватися</li>
              <li>oublier (убліИ) — забувати</li>
              <li>appeler (аполИ) — дзвонити / називати</li>
              <li>réaliser (реалізИ) — усвідомлювати / виконувати</li>
            </ul>
            <div className="rule-box">
              <h4>Правило для дієслів на <span className="red">-GER</span></h4>

              <p>
                Якщо дієслово <b>першої групи (-ER)</b> закінчується на
                <b> -ger</b>, то у формі <b>nous</b> в теперішньому часі <b>після літери g обовʼязково додається e</b>,
                а потім стандартне закінчення <b>-ons</b>.
              </p>

              <p className="example">
                manger → nous <span className="red">mangeons</span><br />
                voyager → nous <span className="red">voyageons</span>
              </p>

              <p className="note">
                ❗ Це потрібно, щоб вимова залишалась <b>[ж]</b>, а не <b>[г]</b>.
              </p>
            </div>
          </div>
          <br/>
          <StartTestButton lessonId="lesson3" />
          </div>
          )}
        </LessonWrapper>
      )}

      <button onClick={logout}>Вийти</button>

    </div>
  );
};

export default Dashboard;