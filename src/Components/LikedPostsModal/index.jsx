import React, { useEffect, useState } from "react";
import Card from "../Card";

export default function LikedPostsModal(props) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostsSize] = useState(localStorage.length);

  useEffect(() => {
    if (localStorage.length > 0) {
      Object.keys(localStorage).forEach(function(key) {
        const item = JSON.parse(localStorage.getItem(key));
        setSavedPosts(prevState => [...prevState, item]);
      });
    }
  }, [savedPostsSize])

  function removePost(title) {
    const item = savedPosts.find(post => post.title === title);
    localStorage.removeItem(item.title);
  }

  return (
    <div className="mt-8">
      <h1 className="mb-8 text-center font-semibold text-lg">Your Liked posts</h1>
      {savedPosts.map(post => (
        <Card
        key={post.title}
        avatar={post.url}
        post={post.hdurl}
        username={post.title}
        numOfLikes={Math.floor(Math.random() * 100000) + 1000}
        caption={post.explanation}
        isSavedPost={true}
        handleSavePost={() => removePost(post.title)}
      />
      ))}
    </div>
  );
}
