import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

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

app.post("/posts", async (req, res) => {
  const postId = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[postId] = {
    postId,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      postId,
      title,
    },
  });

  res.status(201).send(posts[postId]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({ status: "OK" });
})

app.listen(4000, () => {
  console.log("Posts Server is running on port 4000");
});
