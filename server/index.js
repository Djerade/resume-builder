const express = require("express");
const multer = require("multer");
const { apiKey } = require("openai");
const OpenAI = require("openai");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = 4000;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

let database = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

const GPTFunction = async (text) => {
  const reponse = await openai.completions.create({
    model: "text-babbage-001",
    prompt: text,
    temperature: 0.6,
    max_tokens: 250,
    top_p: 1,
    frequncy_penalty: 1,
    presence_penalty: 1
  });
  console.log("---", reponse.data.choices[0].text);

  // return reponse.data.choices[0].text;
};

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

  console.log(req.body);

  const newEntry = {
    id: generateID(),
    fullName,
    currentTechnologie,
    image_url: `http://localhost:4000/uploads/${req.body.image}`
  };

  const prompt = `I am  writing a resume, my details are \n name: ${fullName} \n  i write in technologies: ${currentTechnologie}. Can you write a 100 words  a description for a top of  the resume ? \n`;

  const description = await GPTFunction(prompt);

  const data = { ...newEntry, ...description };
  database.push(data);
  res.json({
    message: "Request successful!",
    data
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
