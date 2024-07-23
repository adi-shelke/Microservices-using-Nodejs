import React, { useState } from "react";
import GenericCreateForm from "./GenericCreateForm";
import axios from "axios";

const CreateComment: React.FC<{ postId: string }> = ({ postId }) => {
  const [commentText, setcommentText] = useState("")
  const addComment = async (
    event: React.FormEvent,
    postId?: string,
    content?: string
  ) => {
    event.preventDefault();
    const url = `http://localhost:4001/posts/${postId}/comments`;
    await axios.post(url, {
      content,
    });
    setcommentText("");
  };
  return (
    <GenericCreateForm
      title=""
      state={commentText}
      setState={setcommentText}
      onSubmit={addComment}
      parentComponent="CreateComment"
      postId={postId}
    />
  );
};

export default CreateComment;
