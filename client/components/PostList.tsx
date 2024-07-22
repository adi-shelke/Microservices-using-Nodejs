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
  // const [posts, setposts] = useState<Record<string, Post>>(initialPosts);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    dispatch(setPosts(res.data));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const postArray = Object.values(posts);

  return (
    <div className="mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {postArray.map((post) => (
          <div
            className=" shadow-lg shadow-cyan-500/50 p-4 h-[300px]"
            key={post.postId}
          >
            <div>
              <h3 className="text-[20px]">{post.title}</h3>
              <CreateComment />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostList;
