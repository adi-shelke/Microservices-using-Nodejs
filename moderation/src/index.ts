import axios from "axios";
import express from "express";
const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("Pakistan") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation Service is running on port 4003");
});
