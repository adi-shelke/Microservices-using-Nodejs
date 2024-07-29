"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "@/lib/Features/comments/commentSlice";
import { RootState } from "@/lib/store";
import axios from "axios";

const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments[postId]);
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    dispatch(setComments({ postId, comments: res.data.comments }));
  };
  useEffect(() => {
    const loadComments = async () => {
      await fetchComments(); // Ensure fetchComments completes
    };
    loadComments();
  }, [postId, dispatch]);

  const renderedComments = comments?.map((comment) => {
    return <li key={comment.commentId}>{`• ${comment.content}`}</li>;
  });
  return (
    <div className="mt-2">
      <h3 className="mb-2 font-semibold">{`${comments?.length} Comments`}</h3>
      <ul className="ml-3">{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
