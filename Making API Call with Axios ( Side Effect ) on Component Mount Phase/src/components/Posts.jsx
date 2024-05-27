import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true); // Set loading to true before fetching data

    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(response.data); // Update posts state with fetched data
      setLoading(false); // Set loading back to false after successful fetch
    } catch (error) {
      setError(true); // Set error state to true if there's an error
      setLoading(false); // Set loading back to false in case of error
    }
  }

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>

      {posts.map((post) => (
        <Post key={post.id} title={post.title}  body={post.body}/> // Pass post.title as the title prop
      ))}
    </div>
  );
}

export default Posts;
