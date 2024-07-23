import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

interface comment {
  commentId: string;
  content: string;
}

interface CommentsByPost {
  [postId: string]: comment[];
}

const commentsByPostId: CommentsByPost = {};

// app.get("/posts/:id/comments", (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send({ postId, comments });
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Comments app listening on port 4001");
});
