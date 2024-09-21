const express = require("express");
const multer = require("multer");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world"
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});

app.use("/uploads", express.static("uploads"));

app.post("/resume/create", upload.single("image"), async (req, res) => {
  const { fullName, image, currentTechnologie } = req.body;
  console.log(req.body, req.file);
  res.json({
    message: "Request successful!",
    data: {}
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
