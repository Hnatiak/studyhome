import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// Підключаємося до MongoDB
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/lessonsDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Схема уроку
const lessonSchema = new mongoose.Schema({
  _id: String,       // lesson1, lesson2
  title: String,
  isOpen: Boolean
});
const Lesson = mongoose.model("Lesson", lessonSchema);

// Отримати урок
app.get("/api/lessons/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Оновити доступ
app.patch("/api/lessons/:id", async (req, res) => {
  try {
    const { isOpen } = req.body;
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { isOpen },
      { new: true, upsert: true } // створює урок, якщо його немає
    );
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));