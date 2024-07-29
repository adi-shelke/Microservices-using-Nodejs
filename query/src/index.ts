import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

//Posts data structure
interface Comment {
  commentId: string;
  content: string;
}

interface Post {
  postId: string;
  title: string;
  comments: Comment[];
}

interface Posts {
  [key: string]: Post;
}

const posts: Posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
  const {type,data}= req.body;

  //when a post is created
  if(type==="PostCreated"){
    const {postId,title}=data;
    posts[postId]={postId,title,comments:[]};
  }

  //when a comment is created
  else if(type==="CommentCreated"){
    const {postId,commentId,content}=data;
    const post = posts[postId];
    post.comments.push({commentId,content});
  }
  console.log("posts",posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Query service listening on port 4002");
});
