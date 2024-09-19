const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
//middlewares
const app = express();
dotenv.config();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are given a prompt of customer response. You have to decide which department to notify among Technical, HR, and Customer Service. Give the name of department, reply to customer and suggest solution for backend employees to make their work easy in a json format",
});

const pretify = (resp) => {
  let cleanedString = resp.replace("```json", "");
  let secondclean = cleanedString.replace("```", "").trim();
  let jsondata = JSON.parse(secondclean);
  // let parsedJSON = JSON.parse(cleanedString);
  return jsondata;
};

const prompt =
  "The login functionality is not working for my account for 2 days it just keeps on buffering";
let resp = "";
const generateresponse = async (prompt) => {
  const result = await model.generateContent([prompt]);
  resp = result.response.text();
};

try {
  generateresponse(prompt);
} catch (e) {
  console.log(e.message);
}

app.get("/", (req, res) => {
  return res.send(pretify(resp));
});

app.get("/sample", (req, res) => {
  return res.send(resp);
});

app.listen(5000, () => {
  console.log("server listening on http://localhost:5000");
});
