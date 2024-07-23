"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPosts } from "@/lib/Features/posts/postSlice";
import axios from "axios";
import CreatePost from "./CreatePost";
import GenericCreateForm from "./GenericCreateForm";
import CreateComment from "./CreateComment";

interface Post {
  postId: string;
  title: string;
}

const PostList = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    dispatch(setPosts(res.data));
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const postArray = Object.values(posts);

  return (
    <div className="flex flex-wrap justify-around mx-auto">
      {postArray.map((post) => (
        <div
          className="shadow-lg shadow-cyan-500/50 p-4 m-2 flex flex-col w-[300px] h-[300px]"
          key={post.postId}
        >
          <div className="flex-grow">
            <h3 className="text-[20px]">{post.title}</h3>
            <CreateComment postId={post.postId}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
