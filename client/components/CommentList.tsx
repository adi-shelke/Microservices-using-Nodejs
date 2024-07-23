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

  return (
    <div className="mt-2">
      <h3 className="mb-2 font-semibold">Comments</h3>
      {comments?.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId} className="">
              <p>{`* ${comment.content}`}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
