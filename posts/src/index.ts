import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface Post {
  postId: string;
  title: string;
}

const posts: Record<string, Post> = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const postId = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[postId] = {
    postId,
    title,
  };

  res.status(201).send(posts[postId]);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
