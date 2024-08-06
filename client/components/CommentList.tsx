"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "@/lib/Features/comments/commentSlice";
import { RootState } from "@/lib/store";
import axios from "axios";

interface Comment {
  commentId: string;
  content: string;
  status: string;
}
interface CommentListProps {
  postComments: Comment[];
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postComments, postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments[postId]??[]);

  useEffect(() => {
    dispatch(setComments({ postId, comments: postComments }));
  }, [postComments, postId, dispatch]);

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
