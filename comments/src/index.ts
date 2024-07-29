import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
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

app.get("/posts/:id/comments",(req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send({ postId, comments });
});

app.post("/posts/:id/comments",async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data:{
      commentId,
      content,
      postId: req.params.id
    }
  })
  res.status(201).send({ commentId, content });
});

app.post("/events",(req,res)=>{
  console.log("Received Event", req.body.type);
  res.send({ status: "OK" });
})
app.listen(4001, () => {
  console.log("Comments app listening on port 4001");
});
